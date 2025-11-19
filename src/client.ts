import axios, { AxiosInstance } from 'axios';
import { WachtError, ApiError } from './error';

export interface WachtConfig {
    apiKey: string;
    baseUrl?: string;
    frontendApiUrl?: string;
    timeout?: number;
    userAgent?: string;
    publicSigningKey?: string;
}

interface PublicKeyResponse {
    data: {
        id: string;
        created_at: string;
        updated_at: string;
        deployment_id: number;
        public_key: string;
    };
}

let globalClient: AxiosInstance | null = null;
let globalConfig: WachtConfig | null = null;

/**
 * Fetch the public signing key from the frontend API URL.
 * @param frontendApiUrl The frontend API URL to fetch the key from
 * @returns The public key string
 */
export async function fetchPublicKey(frontendApiUrl: string): Promise<string> {
    try {
        const url = `${frontendApiUrl}/.well-known/jwk`;
        const response = await axios.get<PublicKeyResponse>(url);
        return response.data.data.public_key;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new WachtError(
                `Failed to fetch public key from ${frontendApiUrl}: ${error.message}`
            );
        }
        throw error;
    }
}

/**
 * Initialize the Wacht SDK with the provided configuration.
 * If frontendApiUrl is provided and publicSigningKey is not, the public key will be automatically fetched.
 * @param config Configuration object
 */
export async function init(config: WachtConfig): Promise<void> {
    globalConfig = {
        baseUrl: 'https://api.wacht.dev',
        timeout: 30000,
        userAgent: 'wacht-js/1.0.0',
        ...config,
    };

    // Auto-fetch public key if frontendApiUrl is provided but publicSigningKey is not
    if (globalConfig.frontendApiUrl && !globalConfig.publicSigningKey) {
        globalConfig.publicSigningKey = await fetchPublicKey(globalConfig.frontendApiUrl);
    }

    const client = axios.create({
        baseURL: globalConfig.baseUrl,
        timeout: globalConfig.timeout,
        headers: {
            'Authorization': `Bearer ${globalConfig.apiKey}`,
            'User-Agent': globalConfig.userAgent,
            'Content-Type': 'application/json',
        },
    });

    // Add response interceptor for error handling
    client.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                throw new ApiError(
                    error.response.status,
                    error.response.data?.message || error.message,
                    error.response.data
                );
            }
            throw new WachtError(error.message);
        }
    );

    globalClient = client;
}

/**
 * Initialize the Wacht SDK from environment variables.
 * Automatically fetches the public key if WACHT_FRONTEND_API_URL is set.
 */
export async function initFromEnv(): Promise<void> {
    const apiKey = process.env.WACHT_API_KEY;
    if (!apiKey) {
        throw new Error('WACHT_API_KEY environment variable is not set');
    }

    await init({
        apiKey,
        baseUrl: process.env.WACHT_API_URL,
        frontendApiUrl: process.env.WACHT_FRONTEND_API_URL,
    });
}

export function getClient(): AxiosInstance {
    if (!globalClient) {
        throw new Error('Wacht SDK not initialized. Call init() first');
    }
    return globalClient;
}

export function getConfig(): WachtConfig {
    if (!globalConfig) {
        throw new Error('Wacht SDK not initialized. Call init() first');
    }
    return { ...globalConfig };
}

/**
 * Get the cached public signing key.
 * @returns The public signing key or undefined if not set
 */
export function getPublicSigningKey(): string | undefined {
    return globalConfig?.publicSigningKey;
}

export function isInitialized(): boolean {
    return globalClient !== null;
}
