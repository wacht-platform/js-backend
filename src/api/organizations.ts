import { getClient, type PaginatedResponse, type ListOptions } from '../client';
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
} from '../models';

/**
 * List organizations
 */
export async function listOrganizations(
  options?: ListOptions
): Promise<PaginatedResponse<Organization>> {
  const client = getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : '';
  return client.get<PaginatedResponse<Organization>>(`/organizations${params}`);
}

/**
 * Get an organization by ID
 */
export async function getOrganization(organizationId: string): Promise<Organization> {
  const client = getClient();
  return client.get<Organization>(`/organizations/${organizationId}`);
}

/**
 * Create an organization
 */
export async function createOrganization(
  request: CreateOrganizationRequest
): Promise<Organization> {
  const client = getClient();
  return client.post<Organization>('/organizations', request);
}

/**
 * Update an organization
 */
export async function updateOrganization(
  organizationId: string,
  request: UpdateOrganizationRequest
): Promise<Organization> {
  const client = getClient();
  return client.patch<Organization>(`/organizations/${organizationId}`, request);
}

/**
 * Delete an organization
 */
export async function deleteOrganization(organizationId: string): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/organizations/${organizationId}`);
}

/**
 * List organization members
 */
export async function listOrganizationMembers(
  organizationId: string,
  options?: ListOptions
): Promise<PaginatedResponse<OrganizationMember>> {
  const client = getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : '';
  return client.get<PaginatedResponse<OrganizationMember>>(
    `/organizations/${organizationId}/members${params}`
  );
}

/**
 * Add a member to an organization
 */
export async function addOrganizationMember(
  organizationId: string,
  request: AddOrganizationMemberRequest
): Promise<OrganizationMember> {
  const client = getClient();
  return client.post<OrganizationMember>(
    `/organizations/${organizationId}/members`,
    request
  );
}

/**
 * Update an organization member
 */
export async function updateOrganizationMember(
  organizationId: string,
  memberId: string,
  request: UpdateOrganizationMemberRequest
): Promise<OrganizationMember> {
  const client = getClient();
  return client.patch<OrganizationMember>(
    `/organizations/${organizationId}/members/${memberId}`,
    request
  );
}

/**
 * Remove a member from an organization
 */
export async function removeOrganizationMember(
  organizationId: string,
  memberId: string
): Promise<void> {
  const client = getClient();
  return client.delete<void>(
    `/organizations/${organizationId}/members/${memberId}`
  );
}

/**
 * List organization roles
 */
export async function listOrganizationRoles(
  organizationId: string,
  options?: ListOptions
): Promise<PaginatedResponse<OrganizationRole>> {
  const client = getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : '';
  return client.get<PaginatedResponse<OrganizationRole>>(
    `/organizations/${organizationId}/roles${params}`
  );
}

/**
 * Create an organization role
 */
export async function createOrganizationRole(
  organizationId: string,
  request: CreateOrganizationRoleRequest
): Promise<OrganizationRole> {
  const client = getClient();
  return client.post<OrganizationRole>(
    `/organizations/${organizationId}/roles`,
    request
  );
}

/**
 * Update an organization role
 */
export async function updateOrganizationRole(
  organizationId: string,
  roleId: string,
  request: UpdateOrganizationRoleRequest
): Promise<OrganizationRole> {
  const client = getClient();
  return client.patch<OrganizationRole>(
    `/organizations/${organizationId}/roles/${roleId}`,
    request
  );
}

/**
 * Delete an organization role
 */
export async function deleteOrganizationRole(
  organizationId: string,
  roleId: string
): Promise<void> {
  const client = getClient();
  return client.delete<void>(
    `/organizations/${organizationId}/roles/${roleId}`
  );
}

/**
 * Create a workspace for an organization
 */
export async function createWorkspaceForOrganization(
  organizationId: string,
  request: CreateWorkspaceRequest
): Promise<Workspace> {
  const client = getClient();
  return client.post<Workspace>(
    `/organizations/${organizationId}/workspaces`,
    request
  );
}
