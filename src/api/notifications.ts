import { getClient, type WachtClient } from "../client";
import type {
  Notification,
  CreateNotificationRequest,
} from "../models";

/**
 * Create a notification
 */
export async function createNotification(
  request: CreateNotificationRequest,
  client?: WachtClient,
): Promise<Notification[]> {
  const sdkClient = client ?? getClient();
  const payload = await sdkClient.post<{ data?: Notification[] }>("/notifications", request);
  return Array.isArray(payload?.data) ? payload.data : [];
}
