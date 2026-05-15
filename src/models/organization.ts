import type { Segment } from "./segment";
import type { Workspace } from "./workspace";

/**
 * Organization model
 * Generated from OpenAPI spec - matches backend API exactly
 */
export interface Organization {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  image_url: string;
  member_count: number;
  public_metadata: Record<string, unknown>;
  private_metadata: Record<string, unknown>;
}

export type OrganizationListSortOrder = "asc" | "desc";
export type OrganizationMemberListSortOrder = "asc" | "desc";

export interface ListOrganizationsOptions {
  limit?: number;
  offset?: number;
  sort_key?: string;
  sort_order?: OrganizationListSortOrder;
  search?: string;
}

export interface ListOrganizationMembersOptions {
  limit?: number;
  offset?: number;
  search?: string;
  sort_key?: string;
  sort_order?: OrganizationMemberListSortOrder;
}

export interface OrganizationDetails extends Organization {
  roles: OrganizationRole[];
  workspaces: Workspace[];
  segments: Segment[];
}

/**
 * Organization member details
 */
export interface OrganizationMember {
  id: string;
  created_at: string;
  updated_at: string;
  organization_id: string;
  user_id: string;
  roles: OrganizationRole[];
  public_metadata: Record<string, unknown>;
  first_name: string;
  last_name: string;
  username?: string;
  primary_email_address?: string;
  primary_phone_number?: string;
  user_created_at: string;
}

/**
 * Organization role
 */
export interface OrganizationRole {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  permissions: string[];
  is_deployment_level: boolean;
}

export interface DeploymentOrganizationRole {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  permissions: string[];
  deployment_id: string;
  organization_id?: string;
}

/**
 * Request to create an organization
 */
export interface CreateOrganizationRequest {
  name: string;
  description?: string;
  public_metadata?: Record<string, unknown>;
  private_metadata?: Record<string, unknown>;
  /** Optional organization image uploaded as multipart/form-data */
  organization_image?: File | Blob;
}

/**
 * Request to update an organization
 */
export interface UpdateOrganizationRequest {
  name?: string;
  description?: string;
  public_metadata?: Record<string, unknown>;
  private_metadata?: Record<string, unknown>;
  /** Remove the stored organization image when true */
  remove_image?: boolean;
  /** Optional organization image uploaded as multipart/form-data */
  organization_image?: File | Blob;
}

/**
 * Request to add a member to an organization
 */
export interface AddOrganizationMemberRequest {
  user_id: string;
  role_ids: string[];
}

/**
 * Request to update an organization member
 */
export interface UpdateOrganizationMemberRequest {
  role_ids?: string[];
  public_metadata?: Record<string, unknown>;
}

/**
 * Request to create an organization role
 */
export interface CreateOrganizationRoleRequest {
  name: string;
  permissions: string[];
}

/**
 * Request to update an organization role
 */
export interface UpdateOrganizationRoleRequest {
  name?: string;
  permissions?: string[];
}

/**
 * Pending invitation to an organization. Soft-deleted rows (either accepted
 * by the user or discarded by an admin) are excluded unless `include_deleted`
 * is set when listing.
 */
export interface OrganizationInvitation {
  id: string;
  created_at: string;
  updated_at: string;
  organization_id: string;
  email: string;
  initial_organization_role_id?: string;
  initial_organization_role_name?: string;
  inviter_id?: string;
  workspace_id?: string;
  workspace_name?: string;
  initial_workspace_role_id?: string;
  initial_workspace_role_name?: string;
  expired: boolean;
  expiry?: string;
  /**
   * Random token used to construct the accept-invitation URL. Surface this
   * to admin tooling when out-of-band sharing is needed; treat it like a
   * secret otherwise.
   */
  token: string;
}

/**
 * Slim shape returned by the create endpoint — full row is exposed via the
 * list endpoint.
 */
export interface OrganizationInvitationSummary {
  id: string;
  token: string;
  email: string;
  organization_id: string;
  organization_name: string;
  workspace_id?: string;
}

/**
 * Options for listing organization invitations.
 */
export interface ListOrganizationInvitationsOptions {
  /** Filter to invitations for a specific workspace within the org. */
  workspace_id?: string;
  /**
   * Include soft-deleted rows (rows are soft-deleted on either accept or
   * admin discard — the data doesn't distinguish). Defaults to false.
   */
  include_deleted?: boolean;
}

/**
 * Request to create a new organization invitation.
 */
export interface CreateOrganizationInvitationRequest {
  email: string;
  role_id?: string;
  workspace_id?: string;
  workspace_role_id?: string;
  /** Days before the invitation token expires. Defaults to 10 when omitted. */
  expiry_days?: number;
}
