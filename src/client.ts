import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { parseApiError, WachtError } from './error';

/**
 * Configuration options for the Wacht SDK client
 */
export interface WachtConfig {
  /** Base URL of the Wacht API (default: https://api.wacht.io) */
  baseUrl?: string;
  /** API key for authentication */
  apiKey: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Additional headers to include in all requests */
  headers?: Record<string, string>;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  /** The data items */
  data: T[];
  /** Whether there are more items available */
  has_more: boolean;
  /** The limit used for this page */
  limit?: number;
  /** The offset used for this page */
  offset?: number;
}

/**
 * List query options for pagination
 */
export interface ListOptions {
  /** Maximum number of items to return */
  limit?: number;
  /** Number of items to skip */
  offset?: number;
}

/**
 * Wacht SDK Client
 */
export class WachtClient {
  private readonly axiosInstance: AxiosInstance;
  private readonly baseUrl: string;

  constructor(config: WachtConfig) {
    this.baseUrl = config.baseUrl || 'https://api.wacht.io';

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const { status, data } = error.response;
          throw parseApiError(status, data);
        }
        if (error.request) {
          throw new WachtError('No response received from server');
        }
        throw new WachtError(error.message);
      }
    );
  }

  /**
   * Make a GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T, AxiosResponse<T>>(
      url,
      config
    );
    return response.data;
  }

  /**
   * Make a POST request
   */
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T, AxiosResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Make a PUT request
   */
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T, AxiosResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T, AxiosResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T, AxiosResponse<T>>(
      url,
      config
    );
    return response.data;
  }

  /**
   * Get the base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}

/**
 * Global client instance (lazy initialized)
 */
let globalClient: WachtClient | null = null;

/**
 * Initialize the global client
 */
export function initClient(config: WachtConfig): void {
  globalClient = new WachtClient(config);
}

/**
 * Get the global client instance
 * @throws {Error} If client has not been initialized
 */
export function getClient(): WachtClient {
  if (!globalClient) {
    throw new Error(
      'Wacht SDK client not initialized. Call initClient() first.'
    );
  }
  return globalClient;
}

/**
 * Check if the global client has been initialized
 */
export function isClientInitialized(): boolean {
  return globalClient !== null;
}
