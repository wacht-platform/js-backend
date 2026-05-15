export type DeploymentMode = "production" | "staging";

export type EmailProvider = "postmark" | "custom_smtp";

export interface DnsRecord {
  name: string;
  record_type: string;
  value: string;
  verified: boolean;
  verification_attempted_at?: string;
  last_verified_at?: string;
}

export interface DomainVerificationRecords {
  cloudflare_verification: DnsRecord[];
  custom_hostname_verification: DnsRecord[];
  frontend_hostname_id?: string;
  backend_hostname_id?: string;
}

export interface EmailVerificationRecords {
  dkim_records: DnsRecord[];
  return_path_records: DnsRecord[];
  postmark_domain_id?: number;
}

export interface CustomSmtpConfig {
  host: string;
  port: number;
  username: string;
  from_email: string;
  use_tls: boolean;
  verified: boolean;
}

/**
 * Credentials minted for a deployment by `POST /credentials`. The `api_key.secret`
 * is shown once at creation — store it immediately, the SDK has no way to
 * recover it later.
 */
export interface DeploymentCredentialsApiKey {
  id: string;
  /** Full secret token; only returned at creation. */
  secret: string;
  prefix: string;
  suffix: string;
  /** API auth app the key belongs to. */
  app_slug: string;
}

export interface DeploymentCredentialsResponse {
  publishable_key: string;
  frontend_host: string;
  backend_host: string;
  api_key: DeploymentCredentialsApiKey;
}

export interface DeploymentWithSettings {
  id: string;
  created_at: string;
  updated_at: string;
  maintenance_mode: boolean;
  backend_host: string;
  frontend_host: string;
  mail_from_host: string;
  publishable_key: string;
  mode: DeploymentMode;
  auth_settings?: Record<string, unknown>;
  ui_settings?: Record<string, unknown>;
  b2b_settings?: Record<string, unknown>;
  restrictions?: Record<string, unknown>;
  domain_verification_records?: DomainVerificationRecords;
  email_verification_records?: EmailVerificationRecords;
  email_provider?: EmailProvider;
  custom_smtp_config?: CustomSmtpConfig;
}
