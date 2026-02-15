import { getClient, type PaginatedResponse, type ListOptions } from '../client';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UpdatePasswordRequest,
  UserEmail,
  AddEmailRequest,
  UpdateEmailRequest,
  UserPhone,
  AddPhoneRequest,
  UpdatePhoneRequest,
  UserSocialConnection,
} from '../models';

/**
 * List users
 */
export async function listUsers(
  options?: ListOptions
): Promise<PaginatedResponse<User>> {
  const client = getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : '';
  return client.get<PaginatedResponse<User>>(`/users${params}`);
}

/**
 * Get a user by ID
 */
export async function getUser(userId: string): Promise<User> {
  const client = getClient();
  return client.get<User>(`/users/${userId}`);
}

/**
 * Get a user by email
 */
export async function getUserByEmail(email: string): Promise<User> {
  const client = getClient();
  return client.get<User>(`/users/by-email/${encodeURIComponent(email)}`);
}

/**
 * Create a user
 */
export async function createUser(request: CreateUserRequest): Promise<User> {
  const client = getClient();
  return client.post<User>('/users', request);
}

/**
 * Update a user
 */
export async function updateUser(
  userId: string,
  request: UpdateUserRequest
): Promise<User> {
  const client = getClient();
  return client.patch<User>(`/users/${userId}`, request);
}

/**
 * Delete a user
 */
export async function deleteUser(userId: string): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/users/${userId}`);
}

/**
 * Update user password
 */
export async function updatePassword(
  userId: string,
  request: UpdatePasswordRequest
): Promise<void> {
  const client = getClient();
  return client.post<void>(`/users/${userId}/password`, request);
}

/**
 * List user emails
 */
export async function listEmails(
  userId: string
): Promise<UserEmail[]> {
  const client = getClient();
  return client.get<UserEmail[]>(`/users/${userId}/emails`);
}

/**
 * Add an email to a user
 */
export async function addEmail(
  userId: string,
  request: AddEmailRequest
): Promise<UserEmail> {
  const client = getClient();
  return client.post<UserEmail>(`/users/${userId}/emails`, request);
}

/**
 * Update a user email
 */
export async function updateEmail(
  userId: string,
  emailId: string,
  request: UpdateEmailRequest
): Promise<UserEmail> {
  const client = getClient();
  return client.patch<UserEmail>(
    `/users/${userId}/emails/${emailId}`,
    request
  );
}

/**
 * Delete a user email
 */
export async function deleteEmail(
  userId: string,
  emailId: string
): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/users/${userId}/emails/${emailId}`);
}

/**
 * List user phone numbers
 */
export async function listPhones(userId: string): Promise<UserPhone[]> {
  const client = getClient();
  return client.get<UserPhone[]>(`/users/${userId}/phones`);
}

/**
 * Add a phone number to a user
 */
export async function addPhone(
  userId: string,
  request: AddPhoneRequest
): Promise<UserPhone> {
  const client = getClient();
  return client.post<UserPhone>(`/users/${userId}/phones`, request);
}

/**
 * Update a user phone number
 */
export async function updatePhone(
  userId: string,
  phoneId: string,
  request: UpdatePhoneRequest
): Promise<UserPhone> {
  const client = getClient();
  return client.patch<UserPhone>(
    `/users/${userId}/phones/${phoneId}`,
    request
  );
}

/**
 * Delete a user phone number
 */
export async function deletePhone(
  userId: string,
  phoneId: string
): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/users/${userId}/phones/${phoneId}`);
}

/**
 * Delete a user social connection
 */
export async function deleteSocialConnection(
  userId: string,
  connectionId: string
): Promise<void> {
  const client = getClient();
  return client.delete<void>(
    `/users/${userId}/social-connections/${connectionId}`
  );
}
