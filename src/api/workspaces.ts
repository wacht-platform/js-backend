import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
} from "../client";
import type {
  Workspace,
  WorkspaceListItem,
  WorkspaceDetails,
  ListWorkspacesOptions,
  ListWorkspaceMembersOptions,
  UpdateWorkspaceRequest,
  WorkspaceMember,
  AddWorkspaceMemberRequest,
  UpdateWorkspaceMemberRequest,
  WorkspaceRole,
  CreateWorkspaceRoleRequest,
  UpdateWorkspaceRoleRequest,
} from "../models";

/**
 * List workspaces
 */
export async function listWorkspaces(
  options?: ListWorkspacesOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<WorkspaceListItem>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit !== undefined) params.append("limit", String(options.limit));
  if (options?.offset !== undefined) params.append("offset", String(options.offset));
  if (options?.sort_key !== undefined) params.append("sort_key", options.sort_key);
  if (options?.sort_order !== undefined) params.append("sort_order", options.sort_order);
  if (options?.search !== undefined) params.append("search", options.search);
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<WorkspaceListItem>>(
    `/workspaces${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Get a workspace by ID
 */
export async function getWorkspace(
  workspaceId: string,
  client?: WachtClient,
): Promise<WorkspaceDetails> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WorkspaceDetails>(`/workspaces/${workspaceId}`);
}

/**
 * Update a workspace
 */
export async function updateWorkspace(
  workspaceId: string,
  request: UpdateWorkspaceRequest,
  client?: WachtClient,
): Promise<Workspace> {
  const sdkClient = client ?? getClient();
  const formData = new FormData();
  if (request.name !== undefined) {
    formData.append("name", request.name);
  }
  if (request.description !== undefined) {
    formData.append("description", request.description);
  }
  if (request.public_metadata !== undefined) {
    formData.append("public_metadata", JSON.stringify(request.public_metadata));
  }
  if (request.private_metadata !== undefined) {
    formData.append("private_metadata", JSON.stringify(request.private_metadata));
  }
  if (request.remove_image !== undefined) {
    formData.append("remove_image", request.remove_image ? "true" : "false");
  }
  if (request.workspace_image) {
    formData.append("workspace_image", request.workspace_image);
  }

  return sdkClient.patch<Workspace>(`/workspaces/${workspaceId}`, formData);
}

/**
 * Delete a workspace
 */
export async function deleteWorkspace(
  workspaceId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/workspaces/${workspaceId}`);
}

/**
 * List workspace members
 */
export async function listWorkspaceMembers(
  workspaceId: string,
  options?: ListWorkspaceMembersOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<WorkspaceMember>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit !== undefined) params.append("limit", String(options.limit));
  if (options?.offset !== undefined) params.append("offset", String(options.offset));
  if (options?.search !== undefined) params.append("search", options.search);
  if (options?.sort_key !== undefined) params.append("sort_key", options.sort_key);
  if (options?.sort_order !== undefined) params.append("sort_order", options.sort_order);
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<WorkspaceMember>>(
    `/workspaces/${workspaceId}/members${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Add a member to a workspace
 */
export async function addWorkspaceMember(
  workspaceId: string,
  request: AddWorkspaceMemberRequest,
  client?: WachtClient,
): Promise<WorkspaceMember> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<WorkspaceMember>(
    `/workspaces/${workspaceId}/members`,
    request,
  );
}

/**
 * Update a workspace member
 */
export async function updateWorkspaceMember(
  workspaceId: string,
  memberId: string,
  request: UpdateWorkspaceMemberRequest,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<void>(
    `/workspaces/${workspaceId}/members/${memberId}`,
    request,
  );
}

/**
 * Remove a member from a workspace
 */
export async function removeWorkspaceMember(
  workspaceId: string,
  memberId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/workspaces/${workspaceId}/members/${memberId}`,
  );
}

/**
 * List workspace roles
 */
export async function listWorkspaceRoles(
  workspaceId: string,
  client?: WachtClient,
): Promise<PaginatedResponse<WorkspaceRole>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<WorkspaceRole>>(
    `/workspaces/${workspaceId}/roles`,
  );
}

/**
 * Create a workspace role
 */
export async function createWorkspaceRole(
  workspaceId: string,
  request: CreateWorkspaceRoleRequest,
  client?: WachtClient,
): Promise<WorkspaceRole> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<WorkspaceRole>(
    `/workspaces/${workspaceId}/roles`,
    request,
  );
}

/**
 * Update a workspace role
 */
export async function updateWorkspaceRole(
  workspaceId: string,
  roleId: string,
  request: UpdateWorkspaceRoleRequest,
  client?: WachtClient,
): Promise<WorkspaceRole> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<WorkspaceRole>(
    `/workspaces/${workspaceId}/roles/${roleId}`,
    request,
  );
}

/**
 * Delete a workspace role
 */
export async function deleteWorkspaceRole(
  workspaceId: string,
  roleId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/workspaces/${workspaceId}/roles/${roleId}`);
}

/**
 * Assign a role to a workspace member
 */
export async function assignWorkspaceMemberRole(
  workspaceId: string,
  membershipId: string,
  roleId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<void>(
    `/workspaces/${workspaceId}/members/${membershipId}/roles/${roleId}`,
  );
}

/**
 * Remove a role from a workspace member
 */
export async function removeWorkspaceMemberRole(
  workspaceId: string,
  membershipId: string,
  roleId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/workspaces/${workspaceId}/members/${membershipId}/roles/${roleId}`,
  );
}
