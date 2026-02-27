import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
  type ListOptions,
} from "../client";
import type {
  Notification,
  CreateNotificationRequest,
  NotificationStats,
} from "../models";

/**
 * List notifications
 */
export async function listNotifications(
  options?: ListOptions & {
    user_id?: string;
    organization_id?: string;
    workspace_id?: string;
  },
  client?: WachtClient,
): Promise<PaginatedResponse<Notification>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append("limit", String(options.limit));
  if (options?.offset !== undefined)
    params.append("offset", String(options.offset));
  if (options?.user_id) params.append("user_id", options.user_id);
  if (options?.organization_id)
    params.append("organization_id", options.organization_id);
  if (options?.workspace_id)
    params.append("workspace_id", options.workspace_id);
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<Notification>>(
    `/notifications${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Get a notification by ID
 */
export async function getNotification(
  notificationId: string,
  client?: WachtClient,
): Promise<Notification> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<Notification>(`/notifications/${notificationId}`);
}

/**
 * Create a notification
 */
export async function createNotification(
  request: CreateNotificationRequest,
  client?: WachtClient,
): Promise<Notification> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<Notification>("/notifications", request);
}

/**
 * Delete a notification
 */
export async function deleteNotification(
  notificationId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/notifications/${notificationId}`);
}

/**
 * Get notification stats
 */
export async function getNotificationStats(
  client?: WachtClient,
): Promise<NotificationStats> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<NotificationStats>("/notifications/stats");
}
