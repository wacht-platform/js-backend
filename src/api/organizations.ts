import { getClient } from '../client';
import {
    Organization,
    CreateOrganizationRequest,
    UpdateOrganizationRequest,
    OrganizationMember,
    AddOrganizationMemberRequest,
    UpdateOrganizationMemberRequest,
    OrganizationRole,
    CreateOrganizationRoleRequest,
    UpdateOrganizationRoleRequest,
    OrganizationListResponse,
    OrganizationMemberListResponse,
    OrganizationRoleListResponse,
    ListOrganizationsOptions,
} from '../models/organization';

/**
 * Fetch organizations
 */
export async function fetchOrganizations(
    options?: ListOrganizationsOptions
): Promise<OrganizationListResponse> {
    const client = getClient();
    const response = await client.get<OrganizationListResponse>('/organizations', {
        params: options,
    });
    return response.data;
}

/**
 * Create organization
 */
export async function createOrganization(
    request: CreateOrganizationRequest
): Promise<Organization> {
    const client = getClient();
    const FormData = require('form-data');
    const formData = new FormData();

    formData.append('name', request.name);
    if (request.description) formData.append('description', request.description);
    if (request.image_url) formData.append('image_url', request.image_url);
    if (request.public_metadata) {
        formData.append('public_metadata', JSON.stringify(request.public_metadata));
    }
    if (request.private_metadata) {
        formData.append('private_metadata', JSON.stringify(request.private_metadata));
    }

    const response = await client.post<Organization>('/organizations', formData, {
        headers: formData.getHeaders(),
    });
    return response.data;
}

/**
 * Fetch organization
 */
export async function fetchOrganization(organizationId: string): Promise<Organization> {
    const client = getClient();
    const response = await client.get<Organization>(`/organizations/${organizationId}`);
    return response.data;
}

/**
 * Update organization
 */
export async function updateOrganization(
    organizationId: string,
    request: UpdateOrganizationRequest
): Promise<Organization> {
    const client = getClient();
    const FormData = require('form-data');
    const formData = new FormData();

    if (request.name) formData.append('name', request.name);
    if (request.description) formData.append('description', request.description);
    if (request.image_url) formData.append('image_url', request.image_url);
    if (request.public_metadata) {
        formData.append('public_metadata', JSON.stringify(request.public_metadata));
    }
    if (request.private_metadata) {
        formData.append('private_metadata', JSON.stringify(request.private_metadata));
    }

    const response = await client.patch<Organization>(
        `/organizations/${organizationId}`,
        formData,
        {
            headers: formData.getHeaders(),
        }
    );
    return response.data;
}

/**
 * Delete organization
 */
export async function deleteOrganization(organizationId: string): Promise<void> {
    const client = getClient();
    await client.delete(`/organizations/${organizationId}`);
}

/**
 * Add organization member
 */
export async function addOrganizationMember(
    organizationId: string,
    request: AddOrganizationMemberRequest
): Promise<OrganizationMember> {
    const client = getClient();
    const response = await client.post<OrganizationMember>(
        `/organizations/${organizationId}/members`,
        request
    );
    return response.data;
}

/**
 * Update organization member
 */
export async function updateOrganizationMember(
    organizationId: string,
    membershipId: string,
    request: UpdateOrganizationMemberRequest
): Promise<OrganizationMember> {
    const client = getClient();
    const response = await client.patch<OrganizationMember>(
        `/organizations/${organizationId}/members/${membershipId}`,
        request
    );
    return response.data;
}

/**
 * Remove organization member
 */
export async function removeOrganizationMember(
    organizationId: string,
    membershipId: string
): Promise<void> {
    const client = getClient();
    await client.delete(`/organizations/${organizationId}/members/${membershipId}`);
}

/**
 * Fetch organization members
 */
export async function fetchOrganizationMembers(
    organizationId: string,
    options?: { limit?: number; offset?: number }
): Promise<OrganizationMemberListResponse> {
    const client = getClient();
    const response = await client.get<OrganizationMemberListResponse>(
        `/organizations/${organizationId}/members`,
        { params: options }
    );
    return response.data;
}

/**
 * Fetch organization roles
 */
export async function fetchOrganizationRoles(): Promise<OrganizationRoleListResponse> {
    const client = getClient();
    const response = await client.get<OrganizationRoleListResponse>('/organization-roles');
    return response.data;
}

/**
 * Create organization role
 */
export async function createOrganizationRole(
    organizationId: string,
    request: CreateOrganizationRoleRequest
): Promise<OrganizationRole> {
    const client = getClient();
    const response = await client.post<OrganizationRole>(
        `/organizations/${organizationId}/roles`,
        request
    );
    return response.data;
}

/**
 * Update organization role
 */
export async function updateOrganizationRole(
    organizationId: string,
    roleId: string,
    request: UpdateOrganizationRoleRequest
): Promise<OrganizationRole> {
    const client = getClient();
    const response = await client.patch<OrganizationRole>(
        `/organizations/${organizationId}/roles/${roleId}`,
        request
    );
    return response.data;
}

/**
 * Delete organization role
 */
export async function deleteOrganizationRole(
    organizationId: string,
    roleId: string
): Promise<void> {
    const client = getClient();
    await client.delete(`/organizations/${organizationId}/roles/${roleId}`);
}
