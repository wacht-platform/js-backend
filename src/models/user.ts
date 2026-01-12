export interface User {
    id: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    username?: string;
    profile_picture_url: string;
    primary_email_address?: string;
    primary_phone_number?: string;
}

export interface CreateUserRequest {
    first_name: string;
    last_name: string;
    email_address?: string;
    phone_number?: string;
    username?: string;
    password?: string;
    skip_password_check?: boolean;
}

export interface UpdateUserRequest {
    first_name?: string;
    last_name?: string;
    username?: string;
    public_metadata?: any;
    private_metadata?: any;
}

export interface UpdatePasswordRequest {
    new_password: string;
    skip_password_check?: boolean;
}

export interface InviteUserRequest {
    first_name: string;
    last_name: string;
    email_address: string;
    expiry_days?: number;
}

export interface UserInvitation {
    id: string;
    created_at: string;
    updated_at: string;
    deployment_id: string;
    first_name: string;
    last_name: string;
    email_address: string;
    token: string;
    expiry: string;
}

export interface WaitlistUser {
    id: string;
    created_at: string;
    updated_at: string;
    deployment_id: string;
    email_address: string;
    first_name?: string;
    last_name?: string;
}

export interface UserEmail {
    id: string;
    email: string;
    is_verified: boolean;
    is_primary: boolean;
}

export interface UserPhone {
    id: string;
    phone_number: string;
    is_verified: boolean;
    is_primary: boolean;
}

export interface UserListResponse {
    data: User[];
    has_more: boolean;
}

export interface UserDetailsResponse {
    user: User;
    organizations: any[];
    workspaces: any[];
}

export interface InvitationListResponse {
    data: UserInvitation[];
    has_more: boolean;
}

export interface WaitlistResponse {
    data: WaitlistUser[];
    has_more: boolean;
}

export interface ListUsersOptions {
    page?: number;
    per_page?: number;
    search?: string;
    is_active?: boolean;
}
