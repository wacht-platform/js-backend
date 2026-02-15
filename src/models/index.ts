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
export * from './webhook';
export * from './segment';
export * from './analytics';

// Additional types
export interface EmailTemplate {
  template_name: string;
  template_data: string;
  template_from: string;
  template_reply_to?: string;
  template_subject: string;
}

export interface SocialConnection {
  provider?: 'google_oauth' | 'github_oauth' | 'microsoft_oauth' | 'slack_oauth';
  id?: string;
  client_id: string;
  client_secret: string;
  enabled?: boolean;
  user_defined_scopes?: string[];
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
