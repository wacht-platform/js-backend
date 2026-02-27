import { getClient, type WachtClient } from "../client";
import type {
  DeploymentRestrictionsUpdates,
  DeploymentB2bSettingsUpdates,
  CreateJwtTemplateRequest,
  UpdateJwtTemplateRequest,
  JwtTemplate,
  EmailTemplate,
  SocialConnection,
  SmtpConfigRequest,
  SmtpConfigResponse,
  SmtpVerifyResponse,
} from "../models";

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
): Promise<JwtTemplate[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<JwtTemplate[]>("/jwt-templates");
}

/**
 * Get a JWT template
 */
export async function getJwtTemplate(
  templateId: string,
  client?: WachtClient,
): Promise<JwtTemplate> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<JwtTemplate>(`/jwt-templates/${templateId}`);
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
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<void>(
    `/settings/email-templates/${templateName}`,
    template,
  );
}

/**
 * Get social connections
 */
export async function getSocialConnections(
  client?: WachtClient,
): Promise<SocialConnection[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<SocialConnection[]>("/settings/social-connections");
}

/**
 * Upsert a social connection
 */
export async function upsertSocialConnection(
  connection: SocialConnection,
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
  request: {
    display_name?: string;
    primary_color?: string;
    logo_url?: string;
    favicon_url?: string;
    custom_css?: string;
    theme?: "light" | "dark" | "auto";
    locale?: string;
    timezone?: string;
  },
  client?: WachtClient,
): Promise<{
  display_name?: string;
  primary_color?: string;
  logo_url?: string;
  favicon_url?: string;
  custom_css?: string;
  theme?: string;
}> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<{
    display_name?: string;
    primary_color?: string;
    logo_url?: string;
    favicon_url?: string;
    custom_css?: string;
    theme?: string;
  }>("/settings/display", request);
}

/**
 * Update auth settings
 */
export async function updateAuthSettings(
  request: {
    allowed_domains?: string[];
    password_min_length?: number;
    password_require_uppercase?: boolean;
    password_require_lowercase?: boolean;
    password_require_numbers?: boolean;
    password_require_special_chars?: boolean;
    mfa_enabled?: boolean;
    mfa_methods?: Array<"totp" | "sms" | "email">;
    session_timeout?: number;
    refresh_token_expiration?: number;
  },
  client?: WachtClient,
): Promise<{
  allowed_domains?: string[];
  password_min_length?: number;
  mfa_enabled?: boolean;
}> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<{
    allowed_domains?: string[];
    password_min_length?: number;
    mfa_enabled?: boolean;
  }>("/settings/auth", request);
}
