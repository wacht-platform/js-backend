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
