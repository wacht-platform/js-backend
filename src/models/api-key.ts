/**
 * API Auth App model
 */
export interface ApiAuthApp {
  deployment_id: string;
  user_id?: string;
  organization_id?: string;
  workspace_id?: string;
  app_slug: string;
  name: string;
  key_prefix: string;
  description?: string;
  is_active: boolean;
  permissions: string[];
  resources: string[];
  rate_limits: RateLimit[];
  rate_limit_scheme_slug?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

/**
 * Rate limit configuration
 */
export interface RateLimit {
  unit:
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "calendar_day"
    | "month"
    | "calendar_month";
  duration: number;
  max_requests: number;
  mode?: "per_app" | "per_key" | "per_key_and_ip" | "per_app_and_ip";
  endpoints?: string[];
  priority?: number;
}

export interface RateLimitScheme {
  id: string;
  deployment_id: string;
  slug: string;
  name: string;
  description?: string;
  rules: RateLimit[];
  created_at: string;
  updated_at: string;
}

export interface CreateRateLimitSchemeRequest {
  slug: string;
  name: string;
  description?: string;
  rules: RateLimit[];
}

export interface UpdateRateLimitSchemeRequest {
  name?: string;
  description?: string;
  rules?: RateLimit[];
}

export type AuthzPrincipalType = "api_key" | "oauth_access_token";
export type AuthzDenyReason = "permission_denied" | "rate_limited";

export interface AuthzPrincipal {
  type: AuthzPrincipalType;
  value: string;
}

export interface AuthzCheckRequest {
  principal: AuthzPrincipal;
  resource: string;
  method: string;
  client_ip?: string;
  user_agent?: string;
  required_permissions?: string[];
}

export interface AuthzIdentity {
  key_id: string;
  deployment_id: string;
  app_slug: string;
  key_name: string;
  owner_user_id?: string;
  organization_id?: string;
  workspace_id?: string;
  organization_membership_id?: string;
  workspace_membership_id?: string;
}

export interface AuthzMetadata {
  principal_type?: AuthzPrincipalType | string;
  permissions_checked?: string[];
  organization_permissions?: string[];
  workspace_permissions?: string[];
  scopes?: string[];
  oauth_resource?: string | null;
  granted_resource?: string | null;
  expires_at?: string;
  [key: string]: unknown;
}

export interface AuthzApiKeyIdentity extends AuthzIdentity {
  principal_type: "api_key";
}

export interface AuthzOauthAccessTokenIdentity extends AuthzIdentity {
  principal_type: "oauth_access_token";
}

export type ResolvedAuthzIdentity =
  | AuthzApiKeyIdentity
  | AuthzOauthAccessTokenIdentity;

export interface AuthzRateLimitState {
  rule: string;
  remaining: number;
  limit: number;
}

export interface AuthzCheckResponse {
  request_id: string;
  allowed: boolean;
  reason?: AuthzDenyReason;
  blocked_rule?: string;
  identity?: AuthzIdentity;
  permissions: string[];
  metadata?: AuthzMetadata;
  rate_limits: AuthzRateLimitState[];
  retry_after?: number;
  headers: Record<string, string>;
}

export interface ApiAuditLog {
  request_id: string;
  deployment_id: string;
  app_slug: string;
  key_id: string;
  key_name: string;
  outcome: string;
  blocked_by_rule?: string;
  client_ip: string;
  path: string;
  user_agent?: string;
  rate_limits?: Record<string, unknown> | null;
  timestamp: string;
}

export interface ApiAuditLogsResponse {
  data: ApiAuditLog[];
  limit: number;
  has_more: boolean;
  next_cursor?: string;
}

export interface ApiAuditTopKey {
  key_id: string;
  key_name: string;
  total_requests: number;
}

export interface ApiAuditTopPath {
  path: string;
  total_requests: number;
}

export interface ApiAuditBlockedReason {
  blocked_by_rule: string;
  count: number;
  percentage: number;
}

export interface ApiAuditRateLimitRule {
  rule: string;
  hit_count: number;
  percentage: number;
}

export interface ApiAuditRateLimitBreakdown {
  total_hits: number;
  percentage_of_blocked: number;
  top_rules: ApiAuditRateLimitRule[];
}

export interface ApiAuditAnalyticsResponse {
  total_requests: number;
  allowed_requests: number;
  blocked_requests: number;
  success_rate: number;
  keys_used_24h: number;
  top_keys?: ApiAuditTopKey[];
  top_paths?: ApiAuditTopPath[];
  blocked_reasons?: ApiAuditBlockedReason[];
  rate_limit_stats?: ApiAuditRateLimitBreakdown;
}

export interface ApiAuditTimeseriesPoint {
  timestamp: string;
  total_requests: number;
  allowed_requests: number;
  blocked_requests: number;
  success_rate: number;
}

export interface ApiAuditTimeseriesResponse {
  data: ApiAuditTimeseriesPoint[];
  interval: string;
}

export interface ListApiAuditLogsOptions {
  limit?: number;
  offset?: number;
  outcome?: string;
  key_id?: string | number;
  start_date?: string;
  end_date?: string;
  cursor?: string;
  cursor_ts?: string;
  cursor_id?: string;
}

export interface GetApiAuditAnalyticsOptions {
  start_date?: string;
  end_date?: string;
  key_id?: string | number;
  include_top_keys?: boolean;
  include_top_paths?: boolean;
  include_blocked_reasons?: boolean;
  include_rate_limits?: boolean;
  top_limit?: number;
}

export interface GetApiAuditTimeseriesOptions {
  start_date?: string;
  end_date?: string;
  interval?: string;
  key_id?: string | number;
}

/**
 * API Key model
 */
export interface ApiKey {
  id: string;
  deployment_id: string;
  app_slug: string;
  name: string;
  key_prefix: string;
  key_suffix: string;
  permissions: string[];
  org_role_permissions: string[];
  workspace_role_permissions: string[];
  metadata?: Record<string, unknown>;
  organization_id?: string;
  workspace_id?: string;
  organization_membership_id?: string;
  workspace_membership_id?: string;
  expires_at?: string;
  last_used_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  revoked_at?: string;
  revoked_reason?: string;
}

/**
 * API Key with secret (returned on creation/rotation)
 */
export interface ApiKeyWithSecret {
  key: ApiKey;
  secret: string;
}

/**
 * Request to create an API auth app
 */
export interface CreateApiAuthAppRequest {
  user_id?: string | number;
  organization_id?: string | number;
  workspace_id?: string | number;
  app_slug: string;
  name: string;
  key_prefix: string;
  description?: string;
  rate_limit_scheme_slug?: string;
  permissions?: string[];
  resources?: string[];
}

/**
 * Request to update an API auth app
 */
export interface UpdateApiAuthAppRequest {
  organization_id?: string | number;
  workspace_id?: string | number;
  name?: string;
  key_prefix?: string;
  description?: string;
  is_active?: boolean;
  rate_limit_scheme_slug?: string;
  permissions?: string[];
  resources?: string[];
}

/**
 * Request to create an API key
 */
export interface CreateApiKeyRequest {
  name: string;
  permissions?: string[];
  metadata?: Record<string, unknown>;
  expires_at?: string;
}

/**
 * Options to revoke an API key
 */
export interface RevokeApiKeyOptions {
  reason?: string;
}

/**
 * @deprecated Use `RevokeApiKeyOptions` with `revokeApiKey(appName, keyId, options)` instead.
 */
export interface RevokeApiKeyRequest {
  key_id: string;
  reason?: string;
}

/**
 * @deprecated Use `rotateApiKey(appName, keyId)` instead.
 */
export interface RotateApiKeyRequest {
  key_id: string;
}
