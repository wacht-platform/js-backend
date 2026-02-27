import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
  type ListOptions,
} from "../client";
import type {
  Workspace,
  CreateWorkspaceRequest,
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
  options?: ListOptions & { organization_id?: string },
  client?: WachtClient,
): Promise<PaginatedResponse<Workspace>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append("limit", String(options.limit));
  if (options?.offset !== undefined)
    params.append("offset", String(options.offset));
  if (options?.organization_id)
    params.append("organization_id", options.organization_id);
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<Workspace>>(
    `/workspaces${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Get a workspace by ID
 */
export async function getWorkspace(
  workspaceId: string,
  client?: WachtClient,
): Promise<Workspace> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<Workspace>(`/workspaces/${workspaceId}`);
}

/**
 * Create a workspace
 */
export async function createWorkspace(
  request: CreateWorkspaceRequest,
  client?: WachtClient,
): Promise<Workspace> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<Workspace>("/workspaces", request);
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
  return sdkClient.patch<Workspace>(`/workspaces/${workspaceId}`, request);
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
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<WorkspaceMember>> {
  const sdkClient = client ?? getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : "";
  return sdkClient.get<PaginatedResponse<WorkspaceMember>>(
    `/workspaces/${workspaceId}/members${params}`,
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
): Promise<WorkspaceMember> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<WorkspaceMember>(
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
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<WorkspaceRole>> {
  const sdkClient = client ?? getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : "";
  return sdkClient.get<PaginatedResponse<WorkspaceRole>>(
    `/workspaces/${workspaceId}/roles${params}`,
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
