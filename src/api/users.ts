import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
} from "../client";
import type {
  User,
  UserDetails,
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
  ListUsersOptions,
} from "../models";

/**
 * List users
 */
export async function listUsers(
  options?: ListUsersOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<User>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit !== undefined) params.append("limit", String(options.limit));
  if (options?.offset !== undefined) params.append("offset", String(options.offset));
  if (options?.sort_key) params.append("sort_key", options.sort_key);
  if (options?.sort_order) params.append("sort_order", options.sort_order);
  if (options?.search) params.append("search", options.search);
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<User>>(
    `/users${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Get a user by ID
 */
export async function getUser(
  userId: string,
  client?: WachtClient,
): Promise<UserDetails> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<UserDetails>(`/users/${userId}/details`);
}

/**
 * Create a user
 */
export async function createUser(
  request: CreateUserRequest,
  client?: WachtClient,
): Promise<User> {
  const sdkClient = client ?? getClient();
  const formData = new FormData();

  formData.append("first_name", request.first_name);
  formData.append("last_name", request.last_name);

  if (request.email_address !== undefined) {
    formData.append("email_address", request.email_address);
  }
  if (request.phone_number !== undefined) {
    formData.append("phone_number", request.phone_number);
  }
  if (request.username !== undefined) {
    formData.append("username", request.username);
  }
  if (request.password !== undefined) {
    formData.append("password", request.password);
  }
  if (request.skip_password_check !== undefined) {
    formData.append(
      "skip_password_check",
      request.skip_password_check ? "true" : "false",
    );
  }
  if (request.profile_image) {
    formData.append("profile_image", request.profile_image);
  }

  return sdkClient.post<User>("/users", formData);
}

/**
 * Update a user
 */
export async function updateUser(
  userId: string,
  request: UpdateUserRequest,
  client?: WachtClient,
): Promise<UserDetails> {
  const sdkClient = client ?? getClient();
  const formData = new FormData();

  if (request.first_name !== undefined) {
    formData.append("first_name", request.first_name);
  }
  if (request.last_name !== undefined) {
    formData.append("last_name", request.last_name);
  }
  if (request.username !== undefined) {
    formData.append("username", request.username);
  }
  if (request.public_metadata !== undefined) {
    formData.append("public_metadata", JSON.stringify(request.public_metadata));
  }
  if (request.private_metadata !== undefined) {
    formData.append("private_metadata", JSON.stringify(request.private_metadata));
  }
  if (request.disabled !== undefined) {
    formData.append("disabled", request.disabled ? "true" : "false");
  }
  if (request.remove_profile_image !== undefined) {
    formData.append(
      "remove_profile_image",
      request.remove_profile_image ? "true" : "false",
    );
  }
  if (request.profile_image) {
    formData.append("profile_image", request.profile_image);
  }

  return sdkClient.patch<UserDetails>(`/users/${userId}`, formData);
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
  return sdkClient.patch<void>(`/users/${userId}/password`, request);
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
