import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
} from "../client";
import type {
  Organization,
  OrganizationDetails,
  ListOrganizationsOptions,
  ListOrganizationMembersOptions,
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
  options?: ListOrganizationsOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<Organization>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit !== undefined) params.append("limit", String(options.limit));
  if (options?.offset !== undefined) params.append("offset", String(options.offset));
  if (options?.sort_key !== undefined) params.append("sort_key", options.sort_key);
  if (options?.sort_order !== undefined) params.append("sort_order", options.sort_order);
  if (options?.search !== undefined) params.append("search", options.search);
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<Organization>>(
    `/organizations${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Get an organization by ID
 */
export async function getOrganization(
  organizationId: string,
  client?: WachtClient,
): Promise<OrganizationDetails> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<OrganizationDetails>(`/organizations/${organizationId}`);
}

/**
 * Create an organization
 */
export async function createOrganization(
  request: CreateOrganizationRequest,
  client?: WachtClient,
): Promise<Organization> {
  const sdkClient = client ?? getClient();
  const formData = new FormData();
  formData.append("name", request.name);
  if (request.description !== undefined) {
    formData.append("description", request.description);
  }
  if (request.public_metadata !== undefined) {
    formData.append("public_metadata", JSON.stringify(request.public_metadata));
  }
  if (request.private_metadata !== undefined) {
    formData.append("private_metadata", JSON.stringify(request.private_metadata));
  }
  if (request.organization_image) {
    formData.append("organization_image", request.organization_image);
  }

  return sdkClient.post<Organization>("/organizations", formData);
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
  if (request.organization_image) {
    formData.append("organization_image", request.organization_image);
  }

  return sdkClient.patch<Organization>(
    `/organizations/${organizationId}`,
    formData,
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
  options?: ListOrganizationMembersOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<OrganizationMember>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit !== undefined) params.append("limit", String(options.limit));
  if (options?.offset !== undefined) params.append("offset", String(options.offset));
  if (options?.search !== undefined) params.append("search", options.search);
  if (options?.sort_key !== undefined) params.append("sort_key", options.sort_key);
  if (options?.sort_order !== undefined) params.append("sort_order", options.sort_order);
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<OrganizationMember>>(
    `/organizations/${organizationId}/members${queryString ? `?${queryString}` : ""}`,
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
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<void>(
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
  client?: WachtClient,
): Promise<PaginatedResponse<OrganizationRole>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<OrganizationRole>>(
    `/organizations/${organizationId}/roles`,
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
  const formData = new FormData();
  formData.append("name", request.name);
  if (request.description !== undefined) {
    formData.append("description", request.description);
  }
  if (request.public_metadata !== undefined) {
    formData.append("public_metadata", JSON.stringify(request.public_metadata));
  }
  if (request.private_metadata !== undefined) {
    formData.append("private_metadata", JSON.stringify(request.private_metadata));
  }
  if (request.workspace_image) {
    formData.append("workspace_image", request.workspace_image);
  }

  return sdkClient.post<Workspace>(
    `/organizations/${organizationId}/workspaces`,
    formData,
  );
}
