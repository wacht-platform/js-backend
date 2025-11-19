import { getClient } from '../client';
import {
    User,
    CreateUserRequest,
    UpdateUserRequest,
    UpdatePasswordRequest,
    InviteUserRequest,
    UserInvitation,
    UserEmail,
    UserPhone,
    UserListResponse,
    UserDetailsResponse,
    InvitationListResponse,
    WaitlistResponse,
    ListUsersOptions,
} from '../models/user';

/**
 * Fetch users
 */
export async function fetchUsers(options?: ListUsersOptions): Promise<UserListResponse> {
    const client = getClient();
    const response = await client.get<UserListResponse>('/users', { params: options });
    return response.data;
}

/**
 * Create user
 */
export async function createUser(request: CreateUserRequest): Promise<User> {
    const client = getClient();
    const FormData = require('form-data');
    const formData = new FormData();

    formData.append('first_name', request.first_name);
    formData.append('last_name', request.last_name);
    if (request.email_address) formData.append('email_address', request.email_address);
    if (request.phone_number) formData.append('phone_number', request.phone_number);
    if (request.username) formData.append('username', request.username);
    if (request.password) formData.append('password', request.password);

    const response = await client.post<User>('/users', formData, {
        headers: formData.getHeaders(),
    });
    return response.data;
}

/**
 * Fetch user details including organizations and workspaces
 */
export async function fetchUserDetails(userId: string): Promise<UserDetailsResponse> {
    const client = getClient();
    const response = await client.get<UserDetailsResponse>(`/users/${userId}/details`);
    return response.data;
}

/**
 * Update user
 */
export async function updateUser(userId: string, request: UpdateUserRequest): Promise<User> {
    const client = getClient();
    const FormData = require('form-data');
    const formData = new FormData();

    if (request.first_name) formData.append('first_name', request.first_name);
    if (request.last_name) formData.append('last_name', request.last_name);
    if (request.username) formData.append('username', request.username);
    if (request.public_metadata) {
        formData.append('public_metadata', JSON.stringify(request.public_metadata));
    }
    if (request.private_metadata) {
        formData.append('private_metadata', JSON.stringify(request.private_metadata));
    }

    const response = await client.patch<User>(`/users/${userId}`, formData, {
        headers: formData.getHeaders(),
    });
    return response.data;
}

/**
 * Update user password
 */
export async function updatePassword(userId: string, request: UpdatePasswordRequest): Promise<void> {
    const client = getClient();
    await client.patch(`/users/${userId}/password`, request);
}

/**
 * Add email to user
 */
export async function addEmail(userId: string, email: string): Promise<UserEmail> {
    const client = getClient();
    const response = await client.post<UserEmail>(`/users/${userId}/emails`, { email });
    return response.data;
}

/**
 * Update user email
 */
export async function updateEmail(
    userId: string,
    emailId: string,
    isPrimary: boolean,
    isVerified: boolean
): Promise<UserEmail> {
    const client = getClient();
    const response = await client.patch<UserEmail>(`/users/${userId}/emails/${emailId}`, {
        is_primary: isPrimary,
        is_verified: isVerified,
    });
    return response.data;
}

/**
 * Delete user email
 */
export async function deleteEmail(userId: string, emailId: string): Promise<void> {
    const client = getClient();
    await client.delete(`/users/${userId}/emails/${emailId}`);
}

/**
 * Add phone to user
 */
export async function addPhone(userId: string, phoneNumber: string): Promise<UserPhone> {
    const client = getClient();
    const response = await client.post<UserPhone>(`/users/${userId}/phones`, {
        phone_number: phoneNumber,
    });
    return response.data;
}

/**
 * Update user phone
 */
export async function updatePhone(
    userId: string,
    phoneId: string,
    isPrimary: boolean,
    isVerified: boolean
): Promise<UserPhone> {
    const client = getClient();
    const response = await client.patch<UserPhone>(`/users/${userId}/phones/${phoneId}`, {
        is_primary: isPrimary,
        is_verified: isVerified,
    });
    return response.data;
}

/**
 * Delete user phone
 */
export async function deletePhone(userId: string, phoneId: string): Promise<void> {
    const client = getClient();
    await client.delete(`/users/${userId}/phones/${phoneId}`);
}

/**
 * Delete user social connection
 */
export async function deleteSocialConnection(userId: string, connectionId: string): Promise<void> {
    const client = getClient();
    await client.delete(`/users/${userId}/social-connections/${connectionId}`);
}

/**
 * Fetch invited users
 */
export async function fetchInvitedUsers(): Promise<InvitationListResponse> {
    const client = getClient();
    const response = await client.get<InvitationListResponse>('/invited-users');
    return response.data;
}

/**
 * Invite user
 */
export async function inviteUser(request: InviteUserRequest): Promise<UserInvitation> {
    const client = getClient();
    const response = await client.post<UserInvitation>('/invited-users', request);
    return response.data;
}

/**
 * Fetch waitlist
 */
export async function fetchWaitlist(): Promise<WaitlistResponse> {
    const client = getClient();
    const response = await client.get<WaitlistResponse>('/user-waitlist');
    return response.data;
}

/**
 * Approve waitlist user
 */
export async function approveWaitlistUser(waitlistUserId: string): Promise<User> {
    const client = getClient();
    const response = await client.post<User>(`/user-waitlist/${waitlistUserId}/approve`);
    return response.data;
}
