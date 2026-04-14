/**
 * User model
 * Generated from OpenAPI spec - matches backend API exactly
 */
export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  username?: string;
  profile_picture_url: string;
  primary_email_address?: string;
  primary_phone_number?: string;
}

/**
 * Request to create a user
 */
export interface CreateUserRequest {
  first_name: string;
  last_name: string;
  email_address?: string;
  phone_number?: string;
  username?: string;
  password?: string;
  /** Skip password validation check (defaults to false) */
  skip_password_check?: boolean;
  /** Note: profile_image is multipart/form-data only */
}

/**
 * Request to update a user
 */
export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  username?: string;
  public_metadata?: Record<string, unknown>;
  private_metadata?: Record<string, unknown>;
  disabled?: boolean;
  /** Note: profile_image is multipart/form-data only */
}

/**
 * Request to update password
 */
export interface UpdatePasswordRequest {
  new_password: string;
  skip_password_check?: boolean;
}

/**
 * Email address model
 * Matches OpenAPI UserEmailAddress schema
 */
export interface UserEmail {
  id: string;
  created_at: string;
  updated_at: string;
  deployment_id: string;
  user_id: string;
  email: string;
  is_primary: boolean;
  verified: boolean;  // Note: "verified" not "is_verified" in OpenAPI
  verified_at: string;
  verification_strategy: VerificationStrategy;
}

/**
 * Verification strategy enum
 */
export type VerificationStrategy =
  | 'otp'
  | 'oauth_google'
  | 'oauth_github'
  | 'oauth_microsoft'
  | 'oauth_facebook'
  | 'oauth_linkedin'
  | 'oauth_discord'
  | 'oauth_apple';

/**
 * Request to add an email
 */
export interface AddEmailRequest {
  email: string;
  verification_strategy?: VerificationStrategy;
}

/**
 * Request to update an email
 */
export interface UpdateEmailRequest {
  email?: string;
  is_primary?: boolean;
}

/**
 * Phone number model
 * Matches OpenAPI UserPhoneNumber schema
 */
export interface UserPhone {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  phone_number: string;
  country_code: string;
  verified: boolean;  // Note: "verified" not "is_verified" in OpenAPI
  verified_at: string;
}

/**
 * Request to add a phone number
 */
export interface AddPhoneRequest {
  phone_number: string;
  country_code: string;
}

/**
 * Request to update a phone number
 */
export interface UpdatePhoneRequest {
  phone_number?: string;
  country_code?: string;
  verified?: boolean;
  is_primary?: boolean;
}

/**
 * Deployment invitation model
 */
export interface DeploymentInvitation {
  id: string;
  created_at: string;
  updated_at: string;
  deployment_id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  token: string;
  expiry: string;
}

/**
 * Request to invite a user
 */
export interface InviteUserRequest {
  first_name: string;
  last_name: string;
  email_address: string;
}

/**
 * Deployment waitlist user model
 */
export interface DeploymentWaitlistUser {
  id: string;
  created_at: string;
  updated_at: string;
  deployment_id: string;
  email_address: string;
  first_name?: string;
  last_name?: string;
}

/**
 * User social connection model
 */
export interface UserSocialConnection {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user_email_address_id: string;
  provider: string;
  email_address: string;
}

/**
 * Session ticket response
 */
export interface SessionTicketResponse {
  ticket: string;
  expires_at: number;
}

/**
 * Session ticket request
 */
export interface CreateSessionTicketRequest {
  ticket_type:
    | 'impersonation'
    | 'agent_access'
    | 'webhook_app_access'
    | 'api_auth_access';
  user_id?: string;
  agent_ids?: string[];
  agent_session_identifier?: 'static' | 'signin';
  actor_id?: string;
  webhook_app_slug?: string;
  api_auth_app_slug?: string;
  expires_in?: number;
}
