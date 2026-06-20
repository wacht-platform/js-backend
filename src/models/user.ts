import type { Segment } from "./segment";

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

export type ActiveUserListSortKey =
  | "created_at"
  | "username"
  | "email"
  | "phone_number";

export type ActiveUserListSortOrder = "asc" | "desc";

export interface ListUsersOptions {
  limit?: number;
  offset?: number;
  sort_key?: ActiveUserListSortKey;
  sort_order?: ActiveUserListSortOrder;
  search?: string;
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
  /** Optional profile image uploaded as multipart/form-data */
  profile_image?: File | Blob;
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
  /** "none" | "optional" | "enforced". Admin override of the user's MFA policy. */
  second_factor_policy?: "none" | "optional" | "enforced";
  /** Remove the stored profile image when true */
  remove_profile_image?: boolean;
  /** Optional profile image uploaded as multipart/form-data */
  profile_image?: File | Blob;
}

export interface UserDetails {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  username?: string;
  profile_picture_url: string;
  schema_version: string;
  disabled: boolean;
  second_factor_policy: string;
  availability: string;
  last_password_reset_at?: string;
  active_organization_membership_id?: string;
  active_workspace_membership_id?: string;
  deployment_id: string;
  public_metadata: Record<string, unknown>;
  private_metadata: Record<string, unknown>;
  primary_email_address_id?: string;
  primary_email_address?: string;
  primary_phone_number_id?: string;
  primary_phone_number?: string;
  email_addresses: UserEmail[];
  phone_numbers: UserPhone[];
  social_connections: UserSocialConnection[];
  segments: Segment[];
  has_password: boolean;
  has_backup_codes: boolean;
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
  verified?: boolean;
  is_primary?: boolean;
}

/**
 * Request to update an email
 */
export interface UpdateEmailRequest {
  email?: string;
  verified?: boolean;
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
  verified?: boolean;
  is_primary?: boolean;
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
  expiry_days?: number;
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
 * User's organization membership (admin view)
 */
export interface UserOrganizationMembership {
  id: string;
  created_at: string;
  updated_at: string;
  organization_id: string;
  user_id: string;
  public_metadata: Record<string, unknown>;
  roles: import("./organization").OrganizationRole[];
  organization: import("./organization").Organization;
}

/**
 * User's workspace membership (admin view)
 */
export interface UserWorkspaceMembership {
  id: string;
  created_at: string;
  updated_at: string;
  workspace_id: string;
  organization_id: string;
  organization_membership_id: string;
  user_id: string;
  public_metadata: Record<string, unknown>;
  roles: import("./workspace").WorkspaceRole[];
  workspace: import("./workspace").Workspace;
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
  access_token?: string;
  refresh_token?: string;
}

/**
 * Active sign-in for a user (admin view of `signins` table).
 */
export interface UserSignin {
  id: string;
  created_at: string;
  updated_at: string;
  session_id: string;
  user_id?: string;
  active_organization_membership_id?: string;
  active_workspace_membership_id?: string;
  expires_at: string;
  last_active_at: string;
  ip_address: string;
  browser: string;
  device: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_code: string;
}

export interface ListUserSigninsOptions {
  /** Include expired sign-ins in the result (defaults to false). */
  include_expired?: boolean;
}

export interface RevokeAllSigninsResponse {
  revoked: number;
}

/**
 * Admin-safe view of a user's passkey. Credential bytes are NOT returned.
 */
export interface UserPasskey {
  id: string;
  created_at?: string;
  updated_at?: string;
  user_id: string;
  name: string;
  sign_count: number;
  transports?: string[];
  last_used_at?: string;
  backed_up?: boolean;
  device_type?: string;
}

export interface RegeneratedBackupCodesResponse {
  backup_codes: string[];
}

/**
 * Admin-provided base32 TOTP secret + optional label for the authenticator
 * app. Whitespace and "-" separators in the secret are stripped before
 * validation; secret must decode to at least 16 bytes (128 bits).
 */
export interface CreateAuthenticatorRequest {
  secret: string;
  account_name?: string;
}

export interface CreateAuthenticatorResponse {
  id: string;
  /** otpauth:// URL with the secret embedded — render as a QR code or copy as-is. */
  otp_url: string;
}

/**
 * Session ticket response
 */
export interface SessionTicketResponse {
  ticket: string;
  expires_at: number;
  url: string;
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
