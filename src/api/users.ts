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
  UserOrganizationMembership,
  UserWorkspaceMembership,
  UserSignin,
  ListUserSigninsOptions,
  RevokeAllSigninsResponse,
  UserPasskey,
  RegeneratedBackupCodesResponse,
  CreateAuthenticatorRequest,
  CreateAuthenticatorResponse,
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
  if (request.second_factor_policy !== undefined) {
    formData.append("second_factor_policy", request.second_factor_policy);
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

/**
 * List a user's organization memberships
 */
export async function listOrganizationMemberships(
  userId: string,
  client?: WachtClient,
): Promise<UserOrganizationMembership[]> {
  const sdkClient = client ?? getClient();
  const res = await sdkClient.get<PaginatedResponse<UserOrganizationMembership>>(
    `/users/${userId}/organization-memberships`,
  );
  return res.data;
}

/**
 * List a user's workspace memberships
 */
export async function listWorkspaceMemberships(
  userId: string,
  client?: WachtClient,
): Promise<UserWorkspaceMembership[]> {
  const sdkClient = client ?? getClient();
  const res = await sdkClient.get<PaginatedResponse<UserWorkspaceMembership>>(
    `/users/${userId}/workspace-memberships`,
  );
  return res.data;
}

/**
 * List a user's active sign-ins
 */
export async function listSignins(
  userId: string,
  options?: ListUserSigninsOptions,
  client?: WachtClient,
): Promise<UserSignin[]> {
  const sdkClient = client ?? getClient();
  const qs = options?.include_expired ? "?include_expired=true" : "";
  const res = await sdkClient.get<PaginatedResponse<UserSignin>>(
    `/users/${userId}/sessions${qs}`,
  );
  return res.data;
}

/**
 * Revoke a single sign-in by id
 */
export async function revokeSignin(
  userId: string,
  signinId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<void>(
    `/users/${userId}/sessions/${signinId}/revoke`,
    undefined,
  );
}

/**
 * Revoke every active sign-in for the user
 */
export async function revokeAllSignins(
  userId: string,
  client?: WachtClient,
): Promise<RevokeAllSigninsResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<RevokeAllSigninsResponse>(
    `/users/${userId}/sessions/revoke-all`,
    undefined,
  );
}

/**
 * List a user's registered passkeys
 */
export async function listPasskeys(
  userId: string,
  client?: WachtClient,
): Promise<UserPasskey[]> {
  const sdkClient = client ?? getClient();
  const res = await sdkClient.get<PaginatedResponse<UserPasskey>>(
    `/users/${userId}/passkeys`,
  );
  return res.data;
}

/**
 * Rename a passkey
 */
export async function renamePasskey(
  userId: string,
  passkeyId: string,
  name: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<void>(`/users/${userId}/passkeys/${passkeyId}`, {
    name,
  });
}

/**
 * Delete a passkey
 */
export async function deletePasskey(
  userId: string,
  passkeyId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/users/${userId}/passkeys/${passkeyId}`);
}

/**
 * Set up a TOTP authenticator on behalf of the user with an admin-provided
 * base32 secret. Returns the otpauth:// URL so the admin can render the QR
 * code (or copy the URL) and relay it to the user out-of-band.
 *
 * Fails with 409 if the user already has an active authenticator — call
 * `deleteAuthenticator` first to re-enroll.
 */
export async function createAuthenticator(
  userId: string,
  request: CreateAuthenticatorRequest,
  client?: WachtClient,
): Promise<CreateAuthenticatorResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<CreateAuthenticatorResponse>(
    `/users/${userId}/authenticators`,
    request,
  );
}

/**
 * Delete the user's TOTP authenticator
 */
export async function deleteAuthenticator(
  userId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/users/${userId}/authenticators`);
}

/**
 * Regenerate the user's backup codes. The new codes are returned once.
 */
export async function regenerateBackupCodes(
  userId: string,
  client?: WachtClient,
): Promise<RegeneratedBackupCodesResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<RegeneratedBackupCodesResponse>(
    `/users/${userId}/backup-codes/regenerate`,
    undefined,
  );
}

/**
 * Mark an email address as primary. The email must be verified.
 */
export async function makeEmailPrimary(
  userId: string,
  emailId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<void>(
    `/users/${userId}/emails/${emailId}/make-primary`,
    undefined,
  );
}

/**
 * Mark a phone number as primary. The phone must be verified.
 */
export async function makePhonePrimary(
  userId: string,
  phoneId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<void>(
    `/users/${userId}/phones/${phoneId}/make-primary`,
    undefined,
  );
}

/**
 * Remove the user's password (force passwordless).
 */
export async function removePassword(
  userId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/users/${userId}/password`);
}

/**
 * List the user's social connections
 */
export async function listSocialConnections(
  userId: string,
  client?: WachtClient,
): Promise<UserSocialConnection[]> {
  const sdkClient = client ?? getClient();
  const res = await sdkClient.get<PaginatedResponse<UserSocialConnection>>(
    `/users/${userId}/social-connections`,
  );
  return res.data;
}
