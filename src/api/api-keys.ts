import { getClient, type PaginatedResponse, type ListOptions } from '../client';
import type {
  ApiAuthApp,
  CreateApiAuthAppRequest,
  UpdateApiAuthAppRequest,
  ApiKey,
  ApiKeyWithSecret,
  CreateApiKeyRequest,
  RevokeApiKeyRequest,
  RotateApiKeyRequest,
  ApiKeyScopeInfo,
} from '../models';

/**
 * List API auth apps
 */
export async function listApiAuthApps(
  options?: ListOptions & { include_inactive?: boolean }
): Promise<ApiAuthApp[]> {
  const client = getClient();
  const params = new URLSearchParams();
  if (options?.include_inactive !== undefined)
    params.append('include_inactive', String(options.include_inactive));
  const queryString = params.toString();
  return client.get<ApiAuthApp[]>(
    `/api-auth/apps${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Get an API auth app by name
 */
export async function getApiAuthApp(appName: string): Promise<ApiAuthApp> {
  const client = getClient();
  return client.get<ApiAuthApp>(`/api-auth/apps/${appName}`);
}

/**
 * Create an API auth app
 */
export async function createApiAuthApp(
  request: CreateApiAuthAppRequest
): Promise<ApiAuthApp> {
  const client = getClient();
  return client.post<ApiAuthApp>('/api-auth/apps', request);
}

/**
 * Update an API auth app
 */
export async function updateApiAuthApp(
  appName: string,
  request: UpdateApiAuthAppRequest
): Promise<ApiAuthApp> {
  const client = getClient();
  return client.patch<ApiAuthApp>(
    `/api-auth/apps/${appName}`,
    request
  );
}

/**
 * Delete an API auth app
 */
export async function deleteApiAuthApp(appName: string): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/api-auth/apps/${appName}`);
}

/**
 * List API keys for an app
 */
export async function listApiKeys(
  appName: string,
  options?: ListOptions & { include_inactive?: boolean }
): Promise<ApiKey[]> {
  const client = getClient();
  const params = new URLSearchParams();
  if (options?.include_inactive !== undefined)
    params.append('include_inactive', String(options.include_inactive));
  const queryString = params.toString();
  return client.get<ApiKey[]>(
    `/api-auth/apps/${appName}/keys${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Create an API key
 */
export async function createApiKey(
  appName: string,
  request: CreateApiKeyRequest
): Promise<ApiKeyWithSecret> {
  const client = getClient();
  return client.post<ApiKeyWithSecret>(
    `/api-auth/apps/${appName}/keys`,
    request
  );
}

/**
 * Revoke an API key
 */
export async function revokeApiKey(request: RevokeApiKeyRequest): Promise<void> {
  const client = getClient();
  return client.post<void>('/api-auth/keys/revoke', request);
}

/**
 * Rotate an API key
 */
export async function rotateApiKey(
  request: RotateApiKeyRequest
): Promise<ApiKeyWithSecret> {
  const client = getClient();
  return client.post<ApiKeyWithSecret>('/api-auth/keys/rotate', request);
}

/**
 * Get available API key scopes
 */
export async function getAvailableScopes(): Promise<{
  scopes: ApiKeyScopeInfo[];
  presets: Array<{
    name: string;
    description: string;
    scopes: string[];
  }>;
}> {
  const client = getClient();
  return client.get('/api-auth/scopes');
}
