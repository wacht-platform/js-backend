import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
  type ListOptions,
} from "../client";
import type {
  DeploymentInvitation,
  DeploymentWaitlistUser,
  InviteUserRequest,
  CreateSessionTicketRequest,
  SessionTicketResponse,
} from "../models/user";

/**
 * List invitations
 */
export async function listInvitations(
  options?: ListOptions & {
    sort_key?: string;
    sort_order?: string;
    search?: string;
  },
  client?: WachtClient,
): Promise<PaginatedResponse<DeploymentInvitation>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append("limit", String(options.limit));
  if (options?.offset !== undefined)
    params.append("offset", String(options.offset));
  if (options?.sort_key) params.append("sort_key", options.sort_key);
  if (options?.sort_order) params.append("sort_order", options.sort_order);
  if (options?.search) params.append("search", options.search);
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<DeploymentInvitation>>(
    `/invitations${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Invite user
 */
export async function inviteUser(
  request: InviteUserRequest,
  client?: WachtClient,
): Promise<DeploymentInvitation> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<DeploymentInvitation>("/invitations", request);
}

/**
 * Delete invitation
 */
export async function deleteInvitation(
  invitationId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/invitations/${invitationId}`);
}

/**
 * List waitlist users
 */
export async function listWaitlist(
  options?: ListOptions & {
    sort_key?: string;
    sort_order?: string;
    search?: string;
  },
  client?: WachtClient,
): Promise<PaginatedResponse<DeploymentWaitlistUser>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append("limit", String(options.limit));
  if (options?.offset !== undefined)
    params.append("offset", String(options.offset));
  if (options?.sort_key) params.append("sort_key", options.sort_key);
  if (options?.sort_order) params.append("sort_order", options.sort_order);
  if (options?.search) params.append("search", options.search);
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<DeploymentWaitlistUser>>(
    `/waitlist${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Approve waitlist user
 */
export async function approveWaitlistUser(
  waitlistUserId: string,
  client?: WachtClient,
): Promise<DeploymentInvitation> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<DeploymentInvitation>(
    `/waitlist/${waitlistUserId}/approve`,
  );
}

/**
 * Create session ticket
 */
export async function createSessionTicket(
  request: CreateSessionTicketRequest,
  client?: WachtClient,
): Promise<SessionTicketResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<SessionTicketResponse>("/session/tickets", request);
}
