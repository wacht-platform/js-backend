import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
  type ListOptions,
} from "../client";
import type {
  Organization,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
  OrganizationMember,
  AddOrganizationMemberRequest,
  UpdateOrganizationMemberRequest,
  OrganizationRole,
  CreateOrganizationRoleRequest,
  UpdateOrganizationRoleRequest,
  Workspace,
  CreateWorkspaceRequest,
} from "../models";

/**
 * List organizations
 */
export async function listOrganizations(
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<Organization>> {
  const sdkClient = client ?? getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : "";
  return sdkClient.get<PaginatedResponse<Organization>>(
    `/organizations${params}`,
  );
}

/**
 * Get an organization by ID
 */
export async function getOrganization(
  organizationId: string,
  client?: WachtClient,
): Promise<Organization> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<Organization>(`/organizations/${organizationId}`);
}

/**
 * Create an organization
 */
export async function createOrganization(
  request: CreateOrganizationRequest,
  client?: WachtClient,
): Promise<Organization> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<Organization>("/organizations", request);
}

/**
 * Update an organization
 */
export async function updateOrganization(
  organizationId: string,
  request: UpdateOrganizationRequest,
  client?: WachtClient,
): Promise<Organization> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<Organization>(
    `/organizations/${organizationId}`,
    request,
  );
}

/**
 * Delete an organization
 */
export async function deleteOrganization(
  organizationId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/organizations/${organizationId}`);
}

/**
 * List organization members
 */
export async function listOrganizationMembers(
  organizationId: string,
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<OrganizationMember>> {
  const sdkClient = client ?? getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : "";
  return sdkClient.get<PaginatedResponse<OrganizationMember>>(
    `/organizations/${organizationId}/members${params}`,
  );
}

/**
 * Add a member to an organization
 */
export async function addOrganizationMember(
  organizationId: string,
  request: AddOrganizationMemberRequest,
  client?: WachtClient,
): Promise<OrganizationMember> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<OrganizationMember>(
    `/organizations/${organizationId}/members`,
    request,
  );
}

/**
 * Update an organization member
 */
export async function updateOrganizationMember(
  organizationId: string,
  memberId: string,
  request: UpdateOrganizationMemberRequest,
  client?: WachtClient,
): Promise<OrganizationMember> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<OrganizationMember>(
    `/organizations/${organizationId}/members/${memberId}`,
    request,
  );
}

/**
 * Remove a member from an organization
 */
export async function removeOrganizationMember(
  organizationId: string,
  memberId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/organizations/${organizationId}/members/${memberId}`,
  );
}

/**
 * List organization roles
 */
export async function listOrganizationRoles(
  organizationId: string,
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<OrganizationRole>> {
  const sdkClient = client ?? getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : "";
  return sdkClient.get<PaginatedResponse<OrganizationRole>>(
    `/organizations/${organizationId}/roles${params}`,
  );
}

/**
 * Create an organization role
 */
export async function createOrganizationRole(
  organizationId: string,
  request: CreateOrganizationRoleRequest,
  client?: WachtClient,
): Promise<OrganizationRole> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<OrganizationRole>(
    `/organizations/${organizationId}/roles`,
    request,
  );
}

/**
 * Update an organization role
 */
export async function updateOrganizationRole(
  organizationId: string,
  roleId: string,
  request: UpdateOrganizationRoleRequest,
  client?: WachtClient,
): Promise<OrganizationRole> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<OrganizationRole>(
    `/organizations/${organizationId}/roles/${roleId}`,
    request,
  );
}

/**
 * Delete an organization role
 */
export async function deleteOrganizationRole(
  organizationId: string,
  roleId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/organizations/${organizationId}/roles/${roleId}`,
  );
}

/**
 * Create a workspace for an organization
 */
export async function createWorkspaceForOrganization(
  organizationId: string,
  request: CreateWorkspaceRequest,
  client?: WachtClient,
): Promise<Workspace> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<Workspace>(
    `/organizations/${organizationId}/workspaces`,
    request,
  );
}
