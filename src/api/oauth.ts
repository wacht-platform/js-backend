import { getClient, type WachtClient } from "../client";
import type {
  CreateOAuthAppRequest,
  CreateOAuthClientRequest,
  OAuthApp,
  OAuthClient,
  OAuthDomainVerificationResponse,
  OAuthGrant,
  RotateOAuthClientSecretResponse,
  SetOAuthScopeMappingRequest,
  UpdateOAuthAppRequest,
  UpdateOAuthClientRequest,
  UpdateOAuthScopeRequest,
} from "../models/oauth";

function getNestedRecord(payload: unknown): Record<string, unknown> {
  if (!payload || typeof payload !== "object") return {};
  const top = payload as Record<string, unknown>;
  if (top.data && typeof top.data === "object") {
    return top.data as Record<string, unknown>;
  }
  return top;
}

function getArrayField<T>(payload: unknown, key: string): T[] {
  const record = getNestedRecord(payload);
  const value = record[key];
  return Array.isArray(value) ? (value as T[]) : [];
}

export async function listOAuthApps(
  deploymentId: string,
  client?: WachtClient,
): Promise<OAuthApp[]> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.get<unknown>(`/deployments/${deploymentId}/oauth/apps`);
  return getArrayField<OAuthApp>(payload, "apps");
}

export async function createOAuthApp(
  deploymentId: string,
  request: CreateOAuthAppRequest,
  client?: WachtClient,
): Promise<OAuthApp> {
  const sdkClient = client ?? getClient();
  const formData = new FormData();
  formData.append("slug", request.slug);
  formData.append("name", request.name);
  if (request.description) formData.append("description", request.description);
  if (request.fqdn) formData.append("fqdn", request.fqdn);
  if (request.logo_file) formData.append("logo", request.logo_file);
  if (request.supported_scopes?.length) {
    formData.append("supported_scopes", request.supported_scopes.join(","));
  }
  if (request.scope_definitions?.length) {
    formData.append("scope_definitions", JSON.stringify(request.scope_definitions));
  }
  if (typeof request.allow_dynamic_client_registration === "boolean") {
    formData.append(
      "allow_dynamic_client_registration",
      request.allow_dynamic_client_registration ? "true" : "false",
    );
  }

  const payload = await sdkClient.post<unknown>(
    `/deployments/${deploymentId}/oauth/apps`,
    formData,
  );

  return getNestedRecord(payload) as unknown as OAuthApp;
}

export async function updateOAuthApp(
  deploymentId: string,
  oauthAppSlug: string,
  request: UpdateOAuthAppRequest,
  client?: WachtClient,
): Promise<OAuthApp> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.patch<unknown>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}`,
    request,
  );
  return getNestedRecord(payload) as unknown as OAuthApp;
}

export async function verifyOAuthAppDomain(
  deploymentId: string,
  oauthAppSlug: string,
  client?: WachtClient,
): Promise<OAuthDomainVerificationResponse> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.post<unknown>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/verify-domain`,
  );
  return getNestedRecord(payload) as unknown as OAuthDomainVerificationResponse;
}

export async function updateOAuthScope(
  deploymentId: string,
  oauthAppSlug: string,
  scope: string,
  request: UpdateOAuthScopeRequest,
  client?: WachtClient,
): Promise<OAuthApp> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.patch<unknown>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/scopes/${encodeURIComponent(scope)}`,
    request,
  );
  return getNestedRecord(payload) as unknown as OAuthApp;
}

export async function archiveOAuthScope(
  deploymentId: string,
  oauthAppSlug: string,
  scope: string,
  client?: WachtClient,
): Promise<OAuthApp> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.post<unknown>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/scopes/${encodeURIComponent(scope)}/archive`,
  );
  return getNestedRecord(payload) as unknown as OAuthApp;
}

export async function unarchiveOAuthScope(
  deploymentId: string,
  oauthAppSlug: string,
  scope: string,
  client?: WachtClient,
): Promise<OAuthApp> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.post<unknown>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/scopes/${encodeURIComponent(scope)}/unarchive`,
  );
  return getNestedRecord(payload) as unknown as OAuthApp;
}

export async function setOAuthScopeMapping(
  deploymentId: string,
  oauthAppSlug: string,
  scope: string,
  request: SetOAuthScopeMappingRequest,
  client?: WachtClient,
): Promise<OAuthApp> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.post<unknown>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/scopes/${encodeURIComponent(scope)}/mapping`,
    request,
  );
  return getNestedRecord(payload) as unknown as OAuthApp;
}

export async function listOAuthClients(
  deploymentId: string,
  oauthAppSlug: string,
  client?: WachtClient,
): Promise<OAuthClient[]> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.get<unknown>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/clients`,
  );
  return getArrayField<OAuthClient>(payload, "clients");
}

export async function createOAuthClient(
  deploymentId: string,
  oauthAppSlug: string,
  request: CreateOAuthClientRequest,
  client?: WachtClient,
): Promise<OAuthClient> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.post<unknown>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/clients`,
    request,
  );
  return getNestedRecord(payload) as unknown as OAuthClient;
}

export async function updateOAuthClient(
  deploymentId: string,
  oauthAppSlug: string,
  oauthClientId: string,
  request: UpdateOAuthClientRequest,
  client?: WachtClient,
): Promise<OAuthClient> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.patch<unknown>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/clients/${oauthClientId}`,
    request,
  );
  return getNestedRecord(payload) as unknown as OAuthClient;
}

export async function deactivateOAuthClient(
  deploymentId: string,
  oauthAppSlug: string,
  oauthClientId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/clients/${oauthClientId}`,
  );
}

export async function rotateOAuthClientSecret(
  deploymentId: string,
  oauthAppSlug: string,
  oauthClientId: string,
  client?: WachtClient,
): Promise<RotateOAuthClientSecretResponse> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.post<unknown>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/clients/${oauthClientId}/rotate-secret`,
  );
  return getNestedRecord(payload) as unknown as RotateOAuthClientSecretResponse;
}

export async function listOAuthGrants(
  deploymentId: string,
  oauthAppSlug: string,
  oauthClientId: string,
  client?: WachtClient,
): Promise<OAuthGrant[]> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.get<unknown>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/clients/${oauthClientId}/grants`,
  );
  return getArrayField<OAuthGrant>(payload, "grants");
}

export async function revokeOAuthGrant(
  deploymentId: string,
  oauthAppSlug: string,
  oauthClientId: string,
  grantId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<void>(
    `/deployments/${deploymentId}/oauth/apps/${oauthAppSlug}/clients/${oauthClientId}/grants/${grantId}/revoke`,
  );
}
