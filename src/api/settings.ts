import { getClient, type WachtClient, type PaginatedResponse } from "../client";
import type {
  DeploymentWithSettings,
  DeploymentRestrictionsUpdates,
  DeploymentB2bSettingsUpdates,
  CreateJwtTemplateRequest,
  UpdateJwtTemplateRequest,
  JwtTemplate,
  EmailTemplate,
  SocialConnection,
  UpsertSocialConnectionRequest,
  SmtpConfigRequest,
  SmtpConfigResponse,
  SmtpVerifyResponse,
  DeploymentAuthSettingsUpdates,
  DeploymentDisplaySettingsUpdates,
} from "../models";

/**
 * Get current deployment with effective settings.
 */
export async function getDeploymentSettings(
  client?: WachtClient,
): Promise<DeploymentWithSettings> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<DeploymentWithSettings>("/");
}

/**
 * Update deployment restrictions
 */
export async function updateDeploymentRestrictions(
  request: DeploymentRestrictionsUpdates,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<void>("/settings/restrictions", request);
}

/**
 * Update B2B settings
 */
export async function updateB2BSettings(
  request: DeploymentB2bSettingsUpdates,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<void>("/settings/b2b", request);
}

/**
 * List JWT templates
 */
export async function listJwtTemplates(
  client?: WachtClient,
): Promise<PaginatedResponse<JwtTemplate>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<JwtTemplate>>("/jwt-templates");
}

/**
 * Create a JWT template
 */
export async function createJwtTemplate(
  request: CreateJwtTemplateRequest,
  client?: WachtClient,
): Promise<JwtTemplate> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<JwtTemplate>("/jwt-templates", request);
}

/**
 * Update a JWT template
 */
export async function updateJwtTemplate(
  templateId: string,
  request: UpdateJwtTemplateRequest,
  client?: WachtClient,
): Promise<JwtTemplate> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<JwtTemplate>(`/jwt-templates/${templateId}`, request);
}

/**
 * Delete a JWT template
 */
export async function deleteJwtTemplate(
  templateId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/jwt-templates/${templateId}`);
}

/**
 * Get an email template
 */
export async function getEmailTemplate(
  templateName: string,
  client?: WachtClient,
): Promise<EmailTemplate> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<EmailTemplate>(
    `/settings/email-templates/${templateName}`,
  );
}

/**
 * Update an email template
 */
export async function updateEmailTemplate(
  templateName: string,
  template: EmailTemplate,
  client?: WachtClient,
): Promise<EmailTemplate> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<EmailTemplate>(
    `/settings/email-templates/${templateName}`,
    template,
  );
}

/**
 * Get social connections
 */
export async function getSocialConnections(
  client?: WachtClient,
): Promise<PaginatedResponse<SocialConnection>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<SocialConnection>>("/settings/social-connections");
}

/**
 * Upsert a social connection
 */
export async function upsertSocialConnection(
  connection: UpsertSocialConnectionRequest,
  client?: WachtClient,
): Promise<SocialConnection> {
  const sdkClient = client ?? getClient();
  return sdkClient.put<SocialConnection>(
    "/settings/social-connections",
    connection,
  );
}

/**
 * Update SMTP configuration
 */
export async function updateSmtpConfig(
  request: SmtpConfigRequest,
  client?: WachtClient,
): Promise<SmtpConfigResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<SmtpConfigResponse>("/settings/email/smtp", request);
}

/**
 * Remove SMTP configuration
 */
export async function removeSmtpConfig(client?: WachtClient): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>("/settings/email/smtp");
}

/**
 * Verify SMTP connection
 */
export async function verifySmtpConnection(
  request: SmtpConfigRequest,
  client?: WachtClient,
): Promise<SmtpVerifyResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<SmtpVerifyResponse>(
    "/settings/email/smtp/verify",
    request,
  );
}

/**
 * Update display settings
 */
export async function updateDisplaySettings(
  request: DeploymentDisplaySettingsUpdates,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<void>("/settings/display", request);
}

/**
 * Update auth settings
 */
export async function updateAuthSettings(
  request: DeploymentAuthSettingsUpdates,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<void>("/settings/auth", request);
}
