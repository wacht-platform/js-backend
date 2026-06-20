/**
 * Re-export all models
 */
export * from './deployment-restrictions';
export * from './b2b-settings';
export * from './jwt-template';
export * from './user';
export * from './organization';
export * from './workspace';
export * from './ai';
export * from './notification';
export * from './api-key';
export * from './oauth';
export * from './webhook';
export * from './segment';
export * from './analytics';
export * from './deployment';

// Additional types
export interface EmailTemplate {
  template_name: string;
  template_data: string;
  template_from: string;
  template_reply_to: string;
  template_subject: string;
}

export type SocialConnectionProvider =
  | "x_oauth"
  | "github_oauth"
  | "gitlab_oauth"
  | "google_oauth"
  | "facebook_oauth"
  | "microsoft_oauth"
  | "linkedin_oauth"
  | "discord_oauth"
  | "apple_oauth";

export interface SocialConnectionCredentials {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  scopes: string[];
}

export interface SocialConnection {
  id: string;
  created_at: string;
  updated_at: string;
  deployment_id?: string | null;
  provider?: SocialConnectionProvider;
  enabled: boolean;
  credentials?: SocialConnectionCredentials;
}

export interface UpsertSocialConnectionRequest {
  provider?: SocialConnectionProvider;
  enabled?: boolean;
  user_defined_scopes?: string[];
  credentials?: SocialConnectionCredentials;
}

export interface SmtpConfigRequest {
  host: string;
  port: number;
  username: string;
  password: string;
  from_email: string;
  use_tls?: boolean;
}

export interface SmtpConfigResponse {
  host: string;
  port: number;
  username: string;
  from_email: string;
  use_tls: boolean;
  verified: boolean;
}

export interface SmtpVerifyResponse {
  success: boolean;
  message?: string;
}

export interface DeploymentAuthEmailSettingsUpdates {
  enabled?: boolean;
  required?: boolean;
  verify_signup?: boolean;
  otp_verification_allowed?: boolean;
  magic_link_verification_allowed?: boolean;
}

export interface DeploymentAuthPhoneSettingsUpdates {
  enabled?: boolean;
  required?: boolean;
  verify_signup?: boolean;
  sms_verification_allowed?: boolean;
  whatsapp_verification_allowed?: boolean;
}

export interface DeploymentAuthUsernameSettingsUpdates {
  enabled?: boolean;
  required?: boolean;
  min_length?: number;
  max_length?: number;
}

export interface DeploymentAuthPasswordSettingsUpdates {
  enabled?: boolean;
  min_length?: number;
  require_lowercase?: boolean;
  require_uppercase?: boolean;
  require_number?: boolean;
  require_special?: boolean;
}

export interface DeploymentAuthNameSettingsUpdates {
  first_name_enabled?: boolean;
  first_name_required?: boolean;
  last_name_enabled?: boolean;
  last_name_required?: boolean;
}

export interface DeploymentAuthEmailLinkSettingsUpdates {
  enabled?: boolean;
  require_same_device?: boolean;
}

export interface DeploymentAuthPasskeySettingsUpdates {
  enabled?: boolean;
  prompt_registration_on_auth?: boolean;
  allow_autofill?: boolean;
}

export interface DeploymentAuthIndividualSettingsUpdates {
  enabled?: boolean;
  required?: boolean;
}

export interface DeploymentAuthFactorSettingsUpdates {
  email_password_enabled?: boolean;
  username_password_enabled?: boolean;
  sso_enabled?: boolean;
  web3_wallet_enabled?: boolean;
  email_otp_enabled?: boolean;
  phone_otp_enabled?: boolean;
  magic_link?: DeploymentAuthEmailLinkSettingsUpdates;
  passkey?: DeploymentAuthPasskeySettingsUpdates;
  second_factor_authenticator_enabled?: boolean;
  second_factor_backup_code_enabled?: boolean;
}

export interface DeploymentAuthSettingsUpdates {
  email?: DeploymentAuthEmailSettingsUpdates;
  phone?: DeploymentAuthPhoneSettingsUpdates;
  username?: DeploymentAuthUsernameSettingsUpdates;
  password?: DeploymentAuthPasswordSettingsUpdates;
  name?: DeploymentAuthNameSettingsUpdates;
  authentication_factors?: DeploymentAuthFactorSettingsUpdates;
  second_factor_policy?: string;
  first_factor?: string;
  backup_code?: DeploymentAuthIndividualSettingsUpdates;
  web3_wallet?: DeploymentAuthIndividualSettingsUpdates;
  multi_session_support?: {
    enabled: boolean;
    max_accounts_per_session: number;
    max_sessions_per_account: number;
  };
  session_token_lifetime?: number;
  session_validity_period?: number;
  session_inactive_timeout?: number;
}

/**
 * The 23 `--wa-*` SDK design tokens (plus the two optional font tokens), per
 * theme. Field names are snake_case and map to the kebab-case CSS custom
 * property suffix on the SDK side (e.g. `surface_subtle` -> `--wa-surface-subtle`).
 * Every token is optional; anything left unset falls back to the SDK default.
 */
export interface WaThemeTokens {
  surface?: string;
  surface_subtle?: string;
  background?: string;
  canvas?: string;
  text?: string;
  text_secondary?: string;
  text_muted?: string;
  text_faint?: string;
  border?: string;
  border_strong?: string;
  primary?: string;
  primary_soft?: string;
  primary_foreground?: string;
  success?: string;
  success_soft?: string;
  info?: string;
  info_soft?: string;
  warning?: string;
  warning_soft?: string;
  error?: string;
  error_soft?: string;
  radius?: string;
  radius_lg?: string;
  font_sans?: string;
  font_mono?: string;
}

/**
 * Per-deployment override of the SDK `--wa-*` token contract, split by mode.
 */
export interface ThemeTokens {
  light?: WaThemeTokens;
  dark?: WaThemeTokens;
}

export interface DeploymentDisplaySettingsUpdates {
  app_name?: string;
  tos_page_url?: string;
  sign_in_page_url?: string;
  sign_up_page_url?: string;
  after_sign_out_one_page_url?: string;
  after_sign_out_all_page_url?: string;
  favicon_image_url?: string;
  logo_image_url?: string;
  privacy_policy_url?: string;
  signup_terms_statement?: string;
  signup_terms_statement_shown?: boolean;
  theme_tokens?: ThemeTokens;
  after_logo_click_url?: string;
  organization_profile_url?: string;
  create_organization_url?: string;
  default_user_profile_image_url?: string;
  default_organization_profile_image_url?: string;
  default_workspace_profile_image_url?: string;
  use_initials_for_user_profile_image?: boolean;
  use_initials_for_organization_profile_image?: boolean;
  after_signup_redirect_url?: string;
  after_signin_redirect_url?: string;
  user_profile_url?: string;
  after_create_organization_redirect_url?: string;
  waitlist_page_url?: string;
  support_page_url?: string;
}
