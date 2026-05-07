import type { Segment } from "./segment";

/**
 * Workspace model
 * Generated from OpenAPI spec - matches backend API exactly
 */
export interface Workspace {
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

export interface WorkspaceListItem {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  image_url: string;
  description: string;
  member_count: number;
  organization_name: string;
}

export type WorkspaceListSortOrder = "asc" | "desc";
export type WorkspaceMemberListSortOrder = "asc" | "desc";

export interface ListWorkspacesOptions {
  limit?: number;
  offset?: number;
  sort_key?: string;
  sort_order?: WorkspaceListSortOrder;
  search?: string;
}

export interface ListWorkspaceMembersOptions {
  limit?: number;
  offset?: number;
  search?: string;
  sort_key?: string;
  sort_order?: WorkspaceMemberListSortOrder;
}

export interface WorkspaceDetails extends Workspace {
  organization_id: string;
  organization_name: string;
  roles: WorkspaceRole[];
  segments: Segment[];
}

/**
 * Request to create a workspace
 */
export interface CreateWorkspaceRequest {
  name: string;
  description?: string;
  public_metadata?: Record<string, unknown>;
  private_metadata?: Record<string, unknown>;
  /** Optional workspace image uploaded as multipart/form-data */
  workspace_image?: File | Blob;
}

/**
 * Request to update a workspace
 */
export interface UpdateWorkspaceRequest {
  name?: string;
  description?: string;
  public_metadata?: Record<string, unknown>;
  private_metadata?: Record<string, unknown>;
  /** Remove the stored workspace image when true */
  remove_image?: boolean;
  /** Optional workspace image uploaded as multipart/form-data */
  workspace_image?: File | Blob;
}

/**
 * Workspace member details
 */
export interface WorkspaceMember {
  id: string;
  created_at: string;
  updated_at: string;
  workspace_id: string;
  user_id: string;
  roles: WorkspaceRole[];
  public_metadata: Record<string, unknown>;
  first_name: string;
  last_name: string;
  username?: string;
  primary_email_address?: string;
  primary_phone_number?: string;
  user_created_at: string;
}

/**
 * Workspace role
 */
export interface WorkspaceRole {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  permissions: string[];
  is_deployment_level: boolean;
}

export interface DeploymentWorkspaceRole {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  permissions: string[];
  organization_id?: string;
  deployment_id: string;
  workspace_id?: string;
}

/**
 * Request to add a member to a workspace
 */
export interface AddWorkspaceMemberRequest {
  user_id: string;
  role_ids: string[];
}

/**
 * Request to update a workspace member
 */
export interface UpdateWorkspaceMemberRequest {
  role_ids?: string[];
  public_metadata?: Record<string, unknown>;
}

/**
 * Request to create a workspace role
 */
export interface CreateWorkspaceRoleRequest {
  name: string;
  permissions: string[];
}

/**
 * Request to update a workspace role
 */
export interface UpdateWorkspaceRoleRequest {
  name?: string;
  permissions?: string[];
}
