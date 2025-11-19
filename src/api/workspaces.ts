import { getClient } from '../client';
import {
    Workspace,
    CreateWorkspaceRequest,
    UpdateWorkspaceRequest,
    WorkspaceRole,
    CreateWorkspaceRoleRequest,
    UpdateWorkspaceRoleRequest,
    WorkspaceListResponse,
    WorkspaceMemberListResponse,
    WorkspaceRoleListResponse,
    ListWorkspacesOptions,
} from '../models/workspace';

/**
 * Fetch workspaces
 */
export async function fetchWorkspaces(
    options?: ListWorkspacesOptions
): Promise<WorkspaceListResponse> {
    const client = getClient();
    const response = await client.get<WorkspaceListResponse>('/workspaces', {
        params: options,
    });
    return response.data;
}

/**
 * Fetch workspace
 */
export async function fetchWorkspace(workspaceId: string): Promise<Workspace> {
    const client = getClient();
    const response = await client.get<Workspace>(`/workspaces/${workspaceId}`);
    return response.data;
}

/**
 * Update workspace
 */
export async function updateWorkspace(
    workspaceId: string,
    request: UpdateWorkspaceRequest
): Promise<Workspace> {
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

    const response = await client.patch<Workspace>(
        `/workspaces/${workspaceId}`,
        formData,
        { headers: formData.getHeaders() }
    );
    return response.data;
}

/**
 * Delete workspace
 */
export async function deleteWorkspace(workspaceId: string): Promise<void> {
    const client = getClient();
    await client.delete(`/workspaces/${workspaceId}`);
}

/**
 * Create workspace in organization
 */
export async function createWorkspaceInOrganization(
    organizationId: string,
    request: CreateWorkspaceRequest
): Promise<Workspace> {
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

    const response = await client.post<Workspace>(
        `/organizations/${organizationId}/workspaces`,
        formData,
        { headers: formData.getHeaders() }
    );
    return response.data;
}

/**
 * Fetch workspace members
 */
export async function fetchWorkspaceMembers(
    workspaceId: string,
    options?: { limit?: number; offset?: number }
): Promise<WorkspaceMemberListResponse> {
    const client = getClient();
    const response = await client.get<WorkspaceMemberListResponse>(
        `/workspaces/${workspaceId}/members`,
        { params: options }
    );
    return response.data;
}

/**
 * Fetch workspace roles
 */
export async function fetchWorkspaceRoles(): Promise<WorkspaceRoleListResponse> {
    const client = getClient();
    const response = await client.get<WorkspaceRoleListResponse>('/workspace-roles');
    return response.data;
}

/**
 * Create workspace role
 */
export async function createWorkspaceRole(
    workspaceId: string,
    request: CreateWorkspaceRoleRequest
): Promise<WorkspaceRole> {
    const client = getClient();
    const response = await client.post<WorkspaceRole>(
        `/workspaces/${workspaceId}/roles`,
        request
    );
    return response.data;
}

/**
 * Update workspace role
 */
export async function updateWorkspaceRole(
    workspaceId: string,
    roleId: string,
    request: UpdateWorkspaceRoleRequest
): Promise<WorkspaceRole> {
    const client = getClient();
    const response = await client.patch<WorkspaceRole>(
        `/workspaces/${workspaceId}/roles/${roleId}`,
        request
    );
    return response.data;
}

/**
 * Delete workspace role
 */
export async function deleteWorkspaceRole(
    workspaceId: string,
    roleId: string
): Promise<void> {
    const client = getClient();
    await client.delete(`/workspaces/${workspaceId}/roles/${roleId}`);
}
