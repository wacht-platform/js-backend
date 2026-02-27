import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
  type ListOptions,
} from "../client";
import type {
  ApiAuthApp,
  CreateApiAuthAppRequest,
  UpdateApiAuthAppRequest,
  ApiKey,
  ApiKeyWithSecret,
  CreateApiKeyRequest,
  RevokeApiKeyRequest,
  RotateApiKeyRequest,
} from "../models";

/**
 * List API auth apps
 */
export async function listApiAuthApps(
  options?: ListOptions & { include_inactive?: boolean },
  client?: WachtClient,
): Promise<ApiAuthApp[]> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.include_inactive !== undefined)
    params.append("include_inactive", String(options.include_inactive));
  const queryString = params.toString();
  return sdkClient.get<ApiAuthApp[]>(
    `/api-auth/apps${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Get an API auth app by name
 */
export async function getApiAuthApp(
  appName: string,
  client?: WachtClient,
): Promise<ApiAuthApp> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ApiAuthApp>(`/api-auth/apps/${appName}`);
}

/**
 * Create an API auth app
 */
export async function createApiAuthApp(
  request: CreateApiAuthAppRequest,
  client?: WachtClient,
): Promise<ApiAuthApp> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ApiAuthApp>("/api-auth/apps", request);
}

/**
 * Update an API auth app
 */
export async function updateApiAuthApp(
  appName: string,
  request: UpdateApiAuthAppRequest,
  client?: WachtClient,
): Promise<ApiAuthApp> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<ApiAuthApp>(`/api-auth/apps/${appName}`, request);
}

/**
 * Delete an API auth app
 */
export async function deleteApiAuthApp(
  appName: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/api-auth/apps/${appName}`);
}

/**
 * List API keys for an app
 */
export async function listApiKeys(
  appName: string,
  options?: ListOptions & { include_inactive?: boolean },
  client?: WachtClient,
): Promise<ApiKey[]> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.include_inactive !== undefined)
    params.append("include_inactive", String(options.include_inactive));
  const queryString = params.toString();
  return sdkClient.get<ApiKey[]>(
    `/api-auth/apps/${appName}/keys${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Create an API key
 */
export async function createApiKey(
  appName: string,
  request: CreateApiKeyRequest,
  client?: WachtClient,
): Promise<ApiKeyWithSecret> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ApiKeyWithSecret>(
    `/api-auth/apps/${appName}/keys`,
    request,
  );
}

/**
 * Revoke an API key
 */
export async function revokeApiKey(
  request: RevokeApiKeyRequest,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<void>("/api-auth/keys/revoke", request);
}

/**
 * Rotate an API key
 */
export async function rotateApiKey(
  request: RotateApiKeyRequest,
  client?: WachtClient,
): Promise<ApiKeyWithSecret> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ApiKeyWithSecret>("/api-auth/keys/rotate", request);
}
