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
  RevokeApiKeyOptions,
  RateLimitScheme,
  CreateRateLimitSchemeRequest,
  UpdateRateLimitSchemeRequest,
  ApiAuditLogsResponse,
  ApiAuditAnalyticsResponse,
  ApiAuditTimeseriesResponse,
  ListApiAuditLogsOptions,
  GetApiAuditAnalyticsOptions,
  GetApiAuditTimeseriesOptions,
} from "../models";

interface ListApiAuthAppsResponse {
  apps: ApiAuthApp[];
  total: number;
}

interface ListApiKeysResponse {
  keys: ApiKey[];
}

interface ListRateLimitSchemesResponse {
  schemes: RateLimitScheme[];
  total: number;
}

function withQuery(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): string {
  const params = new URLSearchParams();
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) continue;
      params.append(key, String(value));
    }
  }
  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
}

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
  const response = await sdkClient.get<ListApiAuthAppsResponse>(
    `/api-auth/apps${queryString ? `?${queryString}` : ""}`,
  );
  return response.apps;
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
  const response = await sdkClient.get<ListApiKeysResponse>(
    `/api-auth/apps/${appName}/keys${queryString ? `?${queryString}` : ""}`,
  );
  return response.keys;
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
  appName: string,
  keyId: string,
  options?: RevokeApiKeyOptions,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<void>(
    `/api-auth/apps/${encodeURIComponent(appName)}/keys/${encodeURIComponent(keyId)}/revoke`,
    options ?? {},
  );
}

/**
 * Rotate an API key
 */
export async function rotateApiKey(
  appName: string,
  keyId: string,
  client?: WachtClient,
): Promise<ApiKeyWithSecret> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ApiKeyWithSecret>(
    `/api-auth/apps/${encodeURIComponent(appName)}/keys/${encodeURIComponent(keyId)}/rotate`,
    {},
  );
}

/**
 * List API auth rate limit schemes.
 */
export async function listRateLimitSchemes(
  client?: WachtClient,
): Promise<RateLimitScheme[]> {
  const sdkClient = client ?? getClient();
  const response = await sdkClient.get<ListRateLimitSchemesResponse>(
    "/api-auth/rate-limit-schemes",
  );
  return response.schemes;
}

/**
 * Get an API auth rate limit scheme by slug.
 */
export async function getRateLimitScheme(
  slug: string,
  client?: WachtClient,
): Promise<RateLimitScheme> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<RateLimitScheme>(
    `/api-auth/rate-limit-schemes/${encodeURIComponent(slug)}`,
  );
}

/**
 * Create an API auth rate limit scheme.
 */
export async function createRateLimitScheme(
  request: CreateRateLimitSchemeRequest,
  client?: WachtClient,
): Promise<RateLimitScheme> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<RateLimitScheme>(
    "/api-auth/rate-limit-schemes",
    request,
  );
}

/**
 * Update an API auth rate limit scheme by slug.
 */
export async function updateRateLimitScheme(
  slug: string,
  request: UpdateRateLimitSchemeRequest,
  client?: WachtClient,
): Promise<RateLimitScheme> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<RateLimitScheme>(
    `/api-auth/rate-limit-schemes/${encodeURIComponent(slug)}`,
    request,
  );
}

/**
 * Delete an API auth rate limit scheme by slug.
 */
export async function deleteRateLimitScheme(
  slug: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/api-auth/rate-limit-schemes/${encodeURIComponent(slug)}`,
  );
}

/**
 * List API audit logs for an API auth app.
 */
export async function getApiAuditLogs(
  appSlug: string,
  options?: ListApiAuditLogsOptions,
  client?: WachtClient,
): Promise<ApiAuditLogsResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ApiAuditLogsResponse>(
    withQuery(`/api-auth/apps/${encodeURIComponent(appSlug)}/audit/logs`, {
      limit: options?.limit,
      offset: options?.offset,
      outcome: options?.outcome,
      key_id: options?.key_id,
      start_date: options?.start_date,
      end_date: options?.end_date,
      cursor: options?.cursor,
      cursor_ts: options?.cursor_ts,
      cursor_id: options?.cursor_id,
    }),
  );
}

/**
 * Get API audit analytics for an API auth app.
 */
export async function getApiAuditAnalytics(
  appSlug: string,
  options?: GetApiAuditAnalyticsOptions,
  client?: WachtClient,
): Promise<ApiAuditAnalyticsResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ApiAuditAnalyticsResponse>(
    withQuery(`/api-auth/apps/${encodeURIComponent(appSlug)}/audit/analytics`, {
      start_date: options?.start_date,
      end_date: options?.end_date,
      key_id: options?.key_id,
      include_top_keys: options?.include_top_keys,
      include_top_paths: options?.include_top_paths,
      include_blocked_reasons: options?.include_blocked_reasons,
      include_rate_limits: options?.include_rate_limits,
      top_limit: options?.top_limit,
    }),
  );
}

/**
 * Get API audit timeseries for an API auth app.
 */
export async function getApiAuditTimeseries(
  appSlug: string,
  options?: GetApiAuditTimeseriesOptions,
  client?: WachtClient,
): Promise<ApiAuditTimeseriesResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ApiAuditTimeseriesResponse>(
    withQuery(`/api-auth/apps/${encodeURIComponent(appSlug)}/audit/timeseries`, {
      start_date: options?.start_date,
      end_date: options?.end_date,
      interval: options?.interval,
      key_id: options?.key_id,
    }),
  );
}
