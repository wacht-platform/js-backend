import type { WachtClient } from "../client";
import type {
  AuthzApiKeyIdentity,
  AuthzMetadata,
  AuthzCheckRequest,
  AuthzCheckResponse,
  AuthzOauthAccessTokenIdentity,
  AuthzPrincipalType,
  ResolvedAuthzIdentity,
} from "../models/api-key";
import { parseApiError, WachtError } from "../error";

export interface GatewayCheckAuthzOptions {
  gatewayUrl?: string;
  timeout?: number;
  fetch?: typeof fetch;
}

export interface GatewayPrincipalAuthzRequest {
  principalType: AuthzPrincipalType;
  principalValue: string;
  resource: string;
  method: string;
  clientIp?: string;
  userAgent?: string;
  requiredPermissions?: string[];
}

export interface ResolvedGatewayPrincipalContext {
  tokenType: "api_key" | "oauth_token";
  identity: ResolvedAuthzIdentity;
  metadata: AuthzMetadata | null;
  ownerUserId: string | null;
  organizationId: string | null;
  workspaceId: string | null;
  permissions: string[];
}

const DEFAULT_GATEWAY_URL = "https://gateway.wacht.dev";

/**
 * Check authz against the gateway with principal-based contract.
 */
export async function checkAuthz(
  payload: AuthzCheckRequest,
  options?: GatewayCheckAuthzOptions,
  _client?: WachtClient,
): Promise<AuthzCheckResponse> {
  const base = (options?.gatewayUrl || DEFAULT_GATEWAY_URL).replace(/\/+$/, "");
  const url = `${base}/v1/authz/check`;
  const fetchImpl = options?.fetch ?? globalThis.fetch;

  if (typeof fetchImpl !== "function") {
    throw new WachtError(
      "No fetch implementation found. Provide one via options.fetch in this runtime.",
    );
  }

  const timeout = options?.timeout || 30000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetchImpl(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        try {
          data = { message: await response.text() };
        } catch {
          data = null;
        }
      }
      throw parseApiError(response.status, data);
    }

    return (await response.json()) as AuthzCheckResponse;
  } catch (error: unknown) {
    if (error instanceof WachtError) {
      throw error;
    }
    if (error instanceof Error && error.name === "AbortError") {
      throw new WachtError("Gateway request timed out");
    }
    if (error instanceof Error) {
      throw new WachtError(error.message);
    }
    throw new WachtError("Unexpected gateway error");
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Check authz for a specific gateway principal type (API key or OAuth access token).
 */
export async function checkPrincipalAuthz(
  payload: GatewayPrincipalAuthzRequest,
  options?: GatewayCheckAuthzOptions,
  client?: WachtClient,
): Promise<AuthzCheckResponse> {
  return checkAuthz(
    {
      principal: {
        type: payload.principalType,
        value: payload.principalValue,
      },
      resource: payload.resource,
      method: payload.method,
      client_ip: payload.clientIp,
      user_agent: payload.userAgent,
      required_permissions: payload.requiredPermissions,
    },
    options,
    client,
  );
}

/**
 * Convenience wrapper for API key gateway authz checks.
 */
export async function verifyApiKeyRequest(
  apiKey: string,
  method: string,
  resource: string,
  options?: GatewayCheckAuthzOptions & {
    clientIp?: string;
    userAgent?: string;
    requiredPermissions?: string[];
  },
  client?: WachtClient,
): Promise<AuthzCheckResponse> {
  return checkPrincipalAuthz(
    {
      principalType: "api_key",
      principalValue: apiKey,
      method,
      resource,
      clientIp: options?.clientIp,
      userAgent: options?.userAgent,
      requiredPermissions: options?.requiredPermissions,
    },
    options,
    client,
  );
}

/**
 * Convenience wrapper for OAuth access token gateway authz checks.
 */
export async function verifyOauthAccessTokenRequest(
  accessToken: string,
  method: string,
  resource: string,
  options?: GatewayCheckAuthzOptions & {
    clientIp?: string;
    userAgent?: string;
    requiredPermissions?: string[];
  },
  client?: WachtClient,
): Promise<AuthzCheckResponse> {
  return checkPrincipalAuthz(
    {
      principalType: "oauth_access_token",
      principalValue: accessToken,
      method,
      resource,
      clientIp: options?.clientIp,
      userAgent: options?.userAgent,
      requiredPermissions: options?.requiredPermissions,
    },
    options,
    client,
  );
}

/**
 * Backward-compatible alias for API key request verification.
 */
export async function verifyRequest(
  apiKey: string,
  method: string,
  resource: string,
  options?: GatewayCheckAuthzOptions & {
    clientIp?: string;
    userAgent?: string;
    requiredPermissions?: string[];
  },
  client?: WachtClient,
): Promise<AuthzCheckResponse> {
  return verifyApiKeyRequest(apiKey, method, resource, options, client);
}

/**
 * Resolve gateway identity into a discriminated principal identity shape.
 */
export function resolveAuthzIdentity(
  response: AuthzCheckResponse,
): ResolvedAuthzIdentity | undefined {
  if (!response.identity) return undefined;

  const principalType =
    response.metadata?.principal_type === "oauth_access_token"
      ? "oauth_access_token"
      : "api_key";

  if (principalType === "oauth_access_token") {
    return {
      ...response.identity,
      principal_type: "oauth_access_token",
    } as AuthzOauthAccessTokenIdentity;
  }

  return {
    ...response.identity,
    principal_type: "api_key",
  } as AuthzApiKeyIdentity;
}

/**
 * Resolve gateway authz response into a normalized principal context used by framework adapters.
 */
export function resolveGatewayPrincipalContext(
  response: AuthzCheckResponse,
): ResolvedGatewayPrincipalContext | undefined {
  const identity = resolveAuthzIdentity(response);
  if (!identity) return undefined;

  const tokenType =
    identity.principal_type === "api_key" ? "api_key" : "oauth_token";
  const permissions = response.permissions || [];
  const organizationPermissions = identity.organization_id
    ? permissions
    : [];
  const workspacePermissions = identity.workspace_id ? permissions : [];
  const rawMetadata = (response.metadata as AuthzMetadata | undefined) || {};
  const scopes = Array.isArray(rawMetadata.scopes)
    ? rawMetadata.scopes.filter(
        (value): value is string => typeof value === "string",
      )
    : [];
  const resource =
    typeof rawMetadata.resource === "string" ? rawMetadata.resource : null;
  const expiresAt =
    typeof rawMetadata.expires_at === "string"
      ? rawMetadata.expires_at
      : undefined;

  return {
    tokenType,
    identity,
    metadata: {
      ...rawMetadata,
      principal_type: tokenType,
      permissions_checked: permissions,
      organization_permissions: organizationPermissions,
      workspace_permissions: workspacePermissions,
      scopes,
      resource,
      expires_at: expiresAt,
    },
    ownerUserId: identity.owner_user_id || null,
    organizationId: identity.organization_id || null,
    workspaceId: identity.workspace_id || null,
    permissions,
  };
}
