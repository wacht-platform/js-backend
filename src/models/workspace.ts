export interface Workspace {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    image_url: string;
    description: string;
    member_count: number;
    public_metadata: any;
    private_metadata: any;
}

export interface WorkspaceWithOrganizationName extends Workspace {
    organization_name: string;
}

export interface CreateWorkspaceRequest {
    name: string;
    description?: string;
    image_url?: string;
    public_metadata?: any;
    private_metadata?: any;
    organization_id?: string; // Optional if creating in context of an org
}

export interface UpdateWorkspaceRequest {
    name?: string;
    description?: string;
    image_url?: string;
    public_metadata?: any;
    private_metadata?: any;
}

export interface WorkspaceMember {
    id: string;
    user_id: string;
    workspace_id: string;
    roles: WorkspaceRole[];
    joined_at: string;
    public_metadata?: any;
}

export interface WorkspaceRole {
    id: string;
    name: string;
    permissions: string[];
}

export interface AddWorkspaceMemberRequest {
    user_id: string;
    role_ids: string[];
}

export interface UpdateWorkspaceMemberRequest {
    role_ids?: string[];
    public_metadata?: any;
}

export interface CreateWorkspaceRoleRequest {
    name: string;
    permissions: string[];
}

export interface UpdateWorkspaceRoleRequest {
    name?: string;
    permissions?: string[];
}

export interface WorkspaceListResponse {
    data: Workspace[];
    has_more: boolean;
}

export interface WorkspaceMemberListResponse {
    data: WorkspaceMember[];
    has_more: boolean;
}

export interface WorkspaceRoleListResponse {
    data: WorkspaceRole[];
}

export interface ListWorkspacesOptions {
    page?: number;
    per_page?: number;
    search?: string;
    organization_id?: string;
}
