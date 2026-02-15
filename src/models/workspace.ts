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

/**
 * Request to create a workspace
 */
export interface CreateWorkspaceRequest {
  name: string;
  description?: string;
  image_url?: string;
  public_metadata?: Record<string, unknown>;
  private_metadata?: Record<string, unknown>;
}

/**
 * Request to update a workspace
 */
export interface UpdateWorkspaceRequest {
  name?: string;
  description?: string;
  image_url?: string;
  public_metadata?: Record<string, unknown>;
  private_metadata?: Record<string, unknown>;
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
