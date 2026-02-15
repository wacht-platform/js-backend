import { getClient, type PaginatedResponse, type ListOptions } from '../client';
import type {
  DeploymentInvitation,
  DeploymentWaitlistUser,
  InviteUserRequest,
  CreateSessionTicketRequest,
  SessionTicketResponse,
} from '../models/user';

/**
 * List invitations
 */
export async function listInvitations(
  options?: ListOptions & { sort_key?: string; sort_order?: string; search?: string }
): Promise<PaginatedResponse<DeploymentInvitation>> {
  const client = getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', String(options.limit));
  if (options?.offset !== undefined)
    params.append('offset', String(options.offset));
  if (options?.sort_key) params.append('sort_key', options.sort_key);
  if (options?.sort_order) params.append('sort_order', options.sort_order);
  if (options?.search) params.append('search', options.search);
  const queryString = params.toString();
  return client.get<PaginatedResponse<DeploymentInvitation>>(
    `/invitations${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Invite user
 */
export async function inviteUser(
  request: InviteUserRequest
): Promise<DeploymentInvitation> {
  const client = getClient();
  return client.post<DeploymentInvitation>('/invitations', request);
}

/**
 * Delete invitation
 */
export async function deleteInvitation(
  invitationId: string
): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/invitations/${invitationId}`);
}

/**
 * List waitlist users
 */
export async function listWaitlist(
  options?: ListOptions & { sort_key?: string; sort_order?: string; search?: string }
): Promise<PaginatedResponse<DeploymentWaitlistUser>> {
  const client = getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', String(options.limit));
  if (options?.offset !== undefined)
    params.append('offset', String(options.offset));
  if (options?.sort_key) params.append('sort_key', options.sort_key);
  if (options?.sort_order) params.append('sort_order', options.sort_order);
  if (options?.search) params.append('search', options.search);
  const queryString = params.toString();
  return client.get<PaginatedResponse<DeploymentWaitlistUser>>(
    `/waitlist${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Approve waitlist user
 */
export async function approveWaitlistUser(
  waitlistUserId: string
): Promise<DeploymentInvitation> {
  const client = getClient();
  return client.post<DeploymentInvitation>(
    `/waitlist/${waitlistUserId}/approve`
  );
}

/**
 * Create session ticket
 */
export async function createSessionTicket(
  request: CreateSessionTicketRequest
): Promise<SessionTicketResponse> {
  const client = getClient();
  return client.post<SessionTicketResponse>('/session/tickets', request);
}
