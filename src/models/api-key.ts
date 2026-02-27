/**
 * API Auth App model
 */
export interface ApiAuthApp {
  id: string;
  deployment_id: string;
  app_slug: string;
  name: string;
  key_prefix: string;
  description?: string;
  is_active: boolean;
  rate_limits?: RateLimit[];
  created_at: string;
  updated_at: string;
}

/**
 * Rate limit configuration
 */
export interface RateLimit {
  unit: "millisecond" | "second" | "minute" | "hour" | "day";
  duration: number;
  max_requests: number;
  mode?: "per_app" | "per_key" | "per_key_and_ip" | "per_app_and_ip";
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
  resource?: string | null;
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
  app_slug: string;
  name: string;
  key_prefix: string;
  description?: string;
  rate_limits?: RateLimit[];
}

/**
 * Request to update an API auth app
 */
export interface UpdateApiAuthAppRequest {
  name?: string;
  key_prefix?: string;
  description?: string;
  is_active?: boolean;
  rate_limits?: RateLimit[];
}

/**
 * Request to create an API key
 */
export interface CreateApiKeyRequest {
  name: string;
  permissions?: string[];
  organization_membership_id?: string;
  workspace_membership_id?: string;
  metadata?: Record<string, unknown>;
  expires_at?: string;
}

/**
 * Request to revoke an API key
 */
export interface RevokeApiKeyRequest {
  key_id: string;
  reason?: string;
}

/**
 * Request to rotate an API key
 */
export interface RotateApiKeyRequest {
  key_id: string;
}
