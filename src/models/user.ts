export interface User {
    id: string;
    email?: string;
    phone_number?: string;
    first_name?: string;
    last_name?: string;
    profile_picture_url?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    last_sign_in_at?: string;
    // Add other fields as needed based on backend response
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
    email: string;
    role?: string;
    organization_id?: string;
    invited_at: string;
    expires_at: string;
}

export interface WaitlistUser {
    id: string;
    email: string;
    created_at: string;
    status: string;
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
