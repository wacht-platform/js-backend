export interface Organization {
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

export interface CreateOrganizationRequest {
    name: string;
    description?: string;
    image_url?: string;
    public_metadata?: any;
    private_metadata?: any;
}

export interface UpdateOrganizationRequest {
    name?: string;
    description?: string;
    image_url?: string;
    public_metadata?: any;
    private_metadata?: any;
}

export interface OrganizationMember {
    id: string;
    user_id: string;
    organization_id: string;
    roles: OrganizationRole[];
    joined_at: string;
    public_metadata?: any;
}

export interface OrganizationRole {
    id: string;
    name: string;
    permissions: string[];
}

export interface AddOrganizationMemberRequest {
    user_id: string;
    role_ids: string[];
}

export interface UpdateOrganizationMemberRequest {
    role_ids?: string[];
    public_metadata?: any;
}

export interface CreateOrganizationRoleRequest {
    name: string;
    permissions: string[];
}

export interface UpdateOrganizationRoleRequest {
    name?: string;
    permissions?: string[];
}

export interface OrganizationListResponse {
    data: Organization[];
    has_more: boolean;
}

export interface OrganizationMemberListResponse {
    data: OrganizationMember[];
    has_more: boolean;
}

export interface OrganizationRoleListResponse {
    data: OrganizationRole[];
}

export interface ListOrganizationsOptions {
    page?: number;
    per_page?: number;
    search?: string;
}
