import { getClient, type PaginatedResponse, type ListOptions } from '../client';
import type {
  Notification,
  CreateNotificationRequest,
  NotificationStats,
} from '../models';

/**
 * List notifications
 */
export async function listNotifications(
  options?: ListOptions & {
    user_id?: string;
    organization_id?: string;
    workspace_id?: string;
  }
): Promise<PaginatedResponse<Notification>> {
  const client = getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', String(options.limit));
  if (options?.offset !== undefined)
    params.append('offset', String(options.offset));
  if (options?.user_id) params.append('user_id', options.user_id);
  if (options?.organization_id)
    params.append('organization_id', options.organization_id);
  if (options?.workspace_id)
    params.append('workspace_id', options.workspace_id);
  const queryString = params.toString();
  return client.get<PaginatedResponse<Notification>>(
    `/notifications${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Get a notification by ID
 */
export async function getNotification(
  notificationId: string
): Promise<Notification> {
  const client = getClient();
  return client.get<Notification>(`/notifications/${notificationId}`);
}

/**
 * Create a notification
 */
export async function createNotification(
  request: CreateNotificationRequest
): Promise<Notification> {
  const client = getClient();
  return client.post<Notification>('/notifications', request);
}

/**
 * Delete a notification
 */
export async function deleteNotification(
  notificationId: string
): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/notifications/${notificationId}`);
}

/**
 * Get notification stats
 */
export async function getNotificationStats(): Promise<NotificationStats> {
  const client = getClient();
  return client.get<NotificationStats>('/notifications/stats');
}
