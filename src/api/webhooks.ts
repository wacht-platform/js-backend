import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
  type ListOptions,
} from "../client";
import type {
  WebhookApp,
  CreateWebhookAppRequest,
  UpdateWebhookAppRequest,
  TriggerWebhookRequest,
  WebhookDeliveryAttempt,
  WebhookAnalytics,
  WebhookEndpoint,
  WebhookDelivery,
  WebhookEvent,
  WebhookStats,
  WebhookTimeseriesData,
  CreateWebhookEndpointRequest,
  UpdateWebhookEndpointRequest,
} from "../models";

/**
 * List webhook apps
 */
export async function listWebhookApps(
  options?: ListOptions & { include_inactive?: boolean },
  client?: WachtClient,
): Promise<PaginatedResponse<WebhookApp>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append("limit", String(options.limit));
  if (options?.offset !== undefined)
    params.append("offset", String(options.offset));
  if (options?.include_inactive !== undefined)
    params.append("include_inactive", String(options.include_inactive));
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<WebhookApp>>(
    `/webhooks/apps${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Get a webhook app
 */
export async function getWebhookApp(
  appId: string,
  client?: WachtClient,
): Promise<WebhookApp> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookApp>(`/webhooks/apps/${appId}`);
}

/**
 * Create a webhook app
 */
export async function createWebhookApp(
  request: CreateWebhookAppRequest,
  client?: WachtClient,
): Promise<WebhookApp> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<WebhookApp>("/webhooks/apps", request);
}

/**
 * Update a webhook app
 */
export async function updateWebhookApp(
  appId: string,
  request: UpdateWebhookAppRequest,
  client?: WachtClient,
): Promise<WebhookApp> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<WebhookApp>(`/webhooks/apps/${appId}`, request);
}

/**
 * Delete a webhook app
 */
export async function deleteWebhookApp(
  appId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/webhooks/apps/${appId}`);
}

/**
 * Trigger a webhook
 */
export async function triggerWebhook(
  appName: string,
  request: TriggerWebhookRequest,
  client?: WachtClient,
): Promise<{ status: string }> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<{ status: string }>(
    `/webhooks/apps/${appName}/trigger`,
    request,
  );
}

/**
 * Get webhook analytics
 */
export async function getWebhookAnalytics(
  appId: string,
  client?: WachtClient,
): Promise<WebhookAnalytics> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookAnalytics>(`/webhooks/apps/${appId}/analytics`);
}

/**
 * List webhook delivery attempts
 */
export async function listDeliveryAttempts(
  webhookId: string,
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<WebhookDelivery>> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append("limit", String(options.limit));
  if (options?.offset !== undefined)
    params.append("offset", String(options.offset));
  const queryString = params.toString();
  return sdkClient.get<PaginatedResponse<WebhookDelivery>>(
    `/webhooks/apps/${webhookId}/deliveries${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Get webhook stats
 */
export async function getWebhookStats(
  appId: string,
  client?: WachtClient,
): Promise<WebhookStats> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookStats>(`/webhooks/apps/${appId}/stats`);
}

/**
 * Get webhook timeseries data
 */
export async function getWebhookTimeseries(
  appId: string,
  options?: { interval?: "hour" | "day" | "week" | "month"; limit?: number },
  client?: WachtClient,
): Promise<WebhookTimeseriesData[]> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.interval) params.append("interval", options.interval);
  if (options?.limit) params.append("limit", String(options.limit));
  const queryString = params.toString();
  return sdkClient.get<WebhookTimeseriesData[]>(
    `/webhooks/apps/${appId}/timeseries${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * List webhook events
 */
export async function listWebhookEvents(
  appId: string,
  client?: WachtClient,
): Promise<WebhookEvent[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookEvent[]>(`/webhooks/apps/${appId}/events`);
}

/**
 * List webhook endpoints
 */
export async function listWebhookEndpoints(
  appId: string,
  client?: WachtClient,
): Promise<WebhookEndpoint[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookEndpoint[]>(`/webhooks/apps/${appId}/endpoints`);
}

/**
 * Create a webhook endpoint
 */
export async function createWebhookEndpoint(
  appId: string,
  request: CreateWebhookEndpointRequest,
  client?: WachtClient,
): Promise<WebhookEndpoint> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<WebhookEndpoint>(
    `/webhooks/apps/${appId}/endpoints`,
    request,
  );
}

/**
 * Get a webhook endpoint
 */
export async function getWebhookEndpoint(
  appId: string,
  endpointId: string,
  client?: WachtClient,
): Promise<WebhookEndpoint> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookEndpoint>(`/webhooks/endpoints/${endpointId}`);
}

/**
 * Update a webhook endpoint
 */
export async function updateWebhookEndpoint(
  endpointId: string,
  request: UpdateWebhookEndpointRequest,
  client?: WachtClient,
): Promise<WebhookEndpoint> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<WebhookEndpoint>(
    `/webhooks/endpoints/${endpointId}`,
    request,
  );
}

/**
 * Delete a webhook endpoint
 */
export async function deleteWebhookEndpoint(
  endpointId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/webhooks/endpoints/${endpointId}`);
}

/**
 * Test a webhook endpoint
 */
export async function testWebhookEndpoint(
  appId: string,
  endpointId: string,
  client?: WachtClient,
): Promise<{ success: boolean; message?: string }> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<{ success: boolean; message?: string }>(
    `/webhooks/apps/${appId}/endpoints/${endpointId}/test`,
  );
}

/**
 * Reactivate a webhook endpoint
 */
export async function reactivateWebhookEndpoint(
  endpointId: string,
  client?: WachtClient,
): Promise<WebhookEndpoint> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<WebhookEndpoint>(
    `/webhooks/endpoints/${endpointId}/reactivate`,
  );
}

/**
 * Replay a webhook delivery
 */
export async function replayWebhookDelivery(
  appId: string,
  deliveryId: string,
  client?: WachtClient,
): Promise<{ status: string }> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<{ status: string }>(
    `/webhooks/apps/${appId}/deliveries/${deliveryId}/replay`,
  );
}

/**
 * Get a webhook delivery
 */
export async function getWebhookDelivery(
  deliveryId: string,
  client?: WachtClient,
): Promise<WebhookDelivery> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookDelivery>(`/webhooks/deliveries/${deliveryId}`);
}

/**
 * Rotate webhook app secret
 */
export async function rotateWebhookSecret(
  appId: string,
  client?: WachtClient,
): Promise<{ webhook_secret: string }> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<{ webhook_secret: string }>(
    `/webhooks/apps/${appId}/rotate-secret`,
  );
}

/**
 * Trigger webhook app (batch)
 */
export async function triggerWebhookBatch(
  appName: string,
  events: TriggerWebhookRequest[],
  client?: WachtClient,
): Promise<{ status: string }> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<{ status: string }>(
    `/webhooks/apps/${appName}/trigger-batch`,
    { events },
  );
}
