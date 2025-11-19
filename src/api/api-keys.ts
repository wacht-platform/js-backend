import { getClient } from '../client';
import {
    ApiKeyApp,
    ApiKey,
    ApiKeyWithSecret,
    CreateApiKeyAppRequest,
    UpdateApiKeyAppRequest,
    CreateApiKeyRequest,
    RevokeApiKeyRequest,
    RotateApiKeyRequest,
    ListApiKeyAppsResponse,
    ListApiKeysResponse,
} from '../models/api-key';

/**
 * Get a single API key app by name
 */
export async function getApiKeyApp(appName: string): Promise<ApiKeyApp> {
    const client = getClient();
    const response = await client.get<ApiKeyApp>(`/api-keys/apps/${appName}`);
    return response.data;
}

/**
 * List API key apps
 */
export async function listApiKeyApps(includeInactive?: boolean): Promise<ApiKeyApp[]> {
    const client = getClient();
    const response = await client.get<ListApiKeyAppsResponse>('/api-keys/apps', {
        params: { include_inactive: includeInactive },
    });
    return response.data.apps;
}

/**
 * Create an API key app
 */
export async function createApiKeyApp(request: CreateApiKeyAppRequest): Promise<ApiKeyApp> {
    const client = getClient();
    const response = await client.post<ApiKeyApp>('/api-keys/apps', request);
    return response.data;
}

/**
 * Update an API key app
 */
export async function updateApiKeyApp(
    appName: string,
    request: UpdateApiKeyAppRequest
): Promise<ApiKeyApp> {
    const client = getClient();
    const response = await client.patch<ApiKeyApp>(`/api-keys/apps/${appName}`, request);
    return response.data;
}

/**
 * Delete an API key app
 */
export async function deleteApiKeyApp(appName: string): Promise<void> {
    const client = getClient();
    await client.delete(`/api-keys/apps/${appName}`);
}

/**
 * List API keys for an app
 */
export async function listApiKeys(
    appName: string,
    includeInactive?: boolean
): Promise<ApiKey[]> {
    const client = getClient();
    const response = await client.get<ListApiKeysResponse>(`/api-keys/apps/${appName}/keys`, {
        params: { include_inactive: includeInactive },
    });
    return response.data.keys;
}

/**
 * Create an API key
 */
export async function createApiKey(
    appName: string,
    request: CreateApiKeyRequest
): Promise<ApiKeyWithSecret> {
    const client = getClient();
    const response = await client.post<ApiKeyWithSecret>(
        `/api-keys/apps/${appName}/keys`,
        request
    );
    return response.data;
}

/**
 * Revoke an API key
 */
export async function revokeApiKey(request: RevokeApiKeyRequest): Promise<void> {
    const client = getClient();
    await client.post('/api-keys/revoke', request);
}

/**
 * Rotate an API key
 */
export async function rotateApiKey(request: RotateApiKeyRequest): Promise<ApiKeyWithSecret> {
    const client = getClient();
    const response = await client.post<ApiKeyWithSecret>('/api-keys/rotate', request);
    return response.data;
}
