import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
  type ListOptions,
} from "../client";
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
} from "../models";

/**
 * List users
 */
export async function listUsers(
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<User>> {
  const sdkClient = client ?? getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : "";
  return sdkClient.get<PaginatedResponse<User>>(`/users${params}`);
}

/**
 * Get a user by ID
 */
export async function getUser(
  userId: string,
  client?: WachtClient,
): Promise<User> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<User>(`/users/${userId}`);
}

/**
 * Get a user by email
 */
export async function getUserByEmail(
  email: string,
  client?: WachtClient,
): Promise<User> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<User>(`/users/by-email/${encodeURIComponent(email)}`);
}

/**
 * Create a user
 */
export async function createUser(
  request: CreateUserRequest,
  client?: WachtClient,
): Promise<User> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<User>("/users", request);
}

/**
 * Update a user
 */
export async function updateUser(
  userId: string,
  request: UpdateUserRequest,
  client?: WachtClient,
): Promise<User> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<User>(`/users/${userId}`, request);
}

/**
 * Delete a user
 */
export async function deleteUser(
  userId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/users/${userId}`);
}

/**
 * Update user password
 */
export async function updatePassword(
  userId: string,
  request: UpdatePasswordRequest,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<void>(`/users/${userId}/password`, request);
}

/**
 * List user emails
 */
export async function listEmails(
  userId: string,
  client?: WachtClient,
): Promise<UserEmail[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<UserEmail[]>(`/users/${userId}/emails`);
}

/**
 * Add an email to a user
 */
export async function addEmail(
  userId: string,
  request: AddEmailRequest,
  client?: WachtClient,
): Promise<UserEmail> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<UserEmail>(`/users/${userId}/emails`, request);
}

/**
 * Update a user email
 */
export async function updateEmail(
  userId: string,
  emailId: string,
  request: UpdateEmailRequest,
  client?: WachtClient,
): Promise<UserEmail> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<UserEmail>(
    `/users/${userId}/emails/${emailId}`,
    request,
  );
}

/**
 * Delete a user email
 */
export async function deleteEmail(
  userId: string,
  emailId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/users/${userId}/emails/${emailId}`);
}

/**
 * List user phone numbers
 */
export async function listPhones(
  userId: string,
  client?: WachtClient,
): Promise<UserPhone[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<UserPhone[]>(`/users/${userId}/phones`);
}

/**
 * Add a phone number to a user
 */
export async function addPhone(
  userId: string,
  request: AddPhoneRequest,
  client?: WachtClient,
): Promise<UserPhone> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<UserPhone>(`/users/${userId}/phones`, request);
}

/**
 * Update a user phone number
 */
export async function updatePhone(
  userId: string,
  phoneId: string,
  request: UpdatePhoneRequest,
  client?: WachtClient,
): Promise<UserPhone> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<UserPhone>(
    `/users/${userId}/phones/${phoneId}`,
    request,
  );
}

/**
 * Delete a user phone number
 */
export async function deletePhone(
  userId: string,
  phoneId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/users/${userId}/phones/${phoneId}`);
}

/**
 * Delete a user social connection
 */
export async function deleteSocialConnection(
  userId: string,
  connectionId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/users/${userId}/social-connections/${connectionId}`,
  );
}
