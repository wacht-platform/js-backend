import { getClient, type PaginatedResponse, type ListOptions } from '../client';
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
} from '../models';

/**
 * List webhook apps
 */
export async function listWebhookApps(
  options?: ListOptions & { include_inactive?: boolean }
): Promise<PaginatedResponse<WebhookApp>> {
  const client = getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', String(options.limit));
  if (options?.offset !== undefined)
    params.append('offset', String(options.offset));
  if (options?.include_inactive !== undefined)
    params.append('include_inactive', String(options.include_inactive));
  const queryString = params.toString();
  return client.get<PaginatedResponse<WebhookApp>>(
    `/webhooks/apps${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Get a webhook app
 */
export async function getWebhookApp(appId: string): Promise<WebhookApp> {
  const client = getClient();
  return client.get<WebhookApp>(`/webhooks/apps/${appId}`);
}

/**
 * Create a webhook app
 */
export async function createWebhookApp(
  request: CreateWebhookAppRequest
): Promise<WebhookApp> {
  const client = getClient();
  return client.post<WebhookApp>('/webhooks/apps', request);
}

/**
 * Update a webhook app
 */
export async function updateWebhookApp(
  appId: string,
  request: UpdateWebhookAppRequest
): Promise<WebhookApp> {
  const client = getClient();
  return client.patch<WebhookApp>(`/webhooks/apps/${appId}`, request);
}

/**
 * Delete a webhook app
 */
export async function deleteWebhookApp(appId: string): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/webhooks/apps/${appId}`);
}

/**
 * Trigger a webhook
 */
export async function triggerWebhook(
  appName: string,
  request: TriggerWebhookRequest
): Promise<{ status: string }> {
  const client = getClient();
  return client.post<{ status: string }>(
    `/webhooks/apps/${appName}/trigger`,
    request
  );
}

/**
 * Get webhook analytics
 */
export async function getWebhookAnalytics(appId: string): Promise<WebhookAnalytics> {
  const client = getClient();
  return client.get<WebhookAnalytics>(`/webhooks/apps/${appId}/analytics`);
}

/**
 * List webhook delivery attempts
 */
export async function listDeliveryAttempts(
  webhookId: string,
  options?: ListOptions
): Promise<PaginatedResponse<WebhookDelivery>> {
  const client = getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', String(options.limit));
  if (options?.offset !== undefined)
    params.append('offset', String(options.offset));
  const queryString = params.toString();
  return client.get<PaginatedResponse<WebhookDelivery>>(
    `/webhooks/apps/${webhookId}/deliveries${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Get webhook stats
 */
export async function getWebhookStats(appId: string): Promise<WebhookStats> {
  const client = getClient();
  return client.get<WebhookStats>(`/webhooks/apps/${appId}/stats`);
}

/**
 * Get webhook timeseries data
 */
export async function getWebhookTimeseries(
  appId: string,
  options?: { interval?: 'hour' | 'day' | 'week' | 'month'; limit?: number }
): Promise<WebhookTimeseriesData[]> {
  const client = getClient();
  const params = new URLSearchParams();
  if (options?.interval) params.append('interval', options.interval);
  if (options?.limit) params.append('limit', String(options.limit));
  const queryString = params.toString();
  return client.get<WebhookTimeseriesData[]>(
    `/webhooks/apps/${appId}/timeseries${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * List webhook events
 */
export async function listWebhookEvents(
  appId: string
): Promise<WebhookEvent[]> {
  const client = getClient();
  return client.get<WebhookEvent[]>(`/webhooks/apps/${appId}/events`);
}

/**
 * List webhook endpoints
 */
export async function listWebhookEndpoints(
  appId: string
): Promise<WebhookEndpoint[]> {
  const client = getClient();
  return client.get<WebhookEndpoint[]>(`/webhooks/apps/${appId}/endpoints`);
}

/**
 * Create a webhook endpoint
 */
export async function createWebhookEndpoint(
  appId: string,
  request: CreateWebhookEndpointRequest
): Promise<WebhookEndpoint> {
  const client = getClient();
  return client.post<WebhookEndpoint>(
    `/webhooks/apps/${appId}/endpoints`,
    request
  );
}

/**
 * Get a webhook endpoint
 */
export async function getWebhookEndpoint(
  appId: string,
  endpointId: string
): Promise<WebhookEndpoint> {
  const client = getClient();
  return client.get<WebhookEndpoint>(
    `/webhooks/endpoints/${endpointId}`
  );
}

/**
 * Update a webhook endpoint
 */
export async function updateWebhookEndpoint(
  endpointId: string,
  request: UpdateWebhookEndpointRequest
): Promise<WebhookEndpoint> {
  const client = getClient();
  return client.patch<WebhookEndpoint>(
    `/webhooks/endpoints/${endpointId}`,
    request
  );
}

/**
 * Delete a webhook endpoint
 */
export async function deleteWebhookEndpoint(
  endpointId: string
): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/webhooks/endpoints/${endpointId}`);
}

/**
 * Test a webhook endpoint
 */
export async function testWebhookEndpoint(
  appId: string,
  endpointId: string
): Promise<{ success: boolean; message?: string }> {
  const client = getClient();
  return client.post<{ success: boolean; message?: string }>(
    `/webhooks/apps/${appId}/endpoints/${endpointId}/test`
  );
}

/**
 * Reactivate a webhook endpoint
 */
export async function reactivateWebhookEndpoint(
  endpointId: string
): Promise<WebhookEndpoint> {
  const client = getClient();
  return client.post<WebhookEndpoint>(
    `/webhooks/endpoints/${endpointId}/reactivate`
  );
}

/**
 * Replay a webhook delivery
 */
export async function replayWebhookDelivery(
  appId: string,
  deliveryId: string
): Promise<{ status: string }> {
  const client = getClient();
  return client.post<{ status: string }>(
    `/webhooks/apps/${appId}/deliveries/${deliveryId}/replay`
  );
}

/**
 * Get a webhook delivery
 */
export async function getWebhookDelivery(
  deliveryId: string
): Promise<WebhookDelivery> {
  const client = getClient();
  return client.get<WebhookDelivery>(`/webhooks/deliveries/${deliveryId}`);
}

/**
 * Rotate webhook app secret
 */
export async function rotateWebhookSecret(
  appId: string
): Promise<{ webhook_secret: string }> {
  const client = getClient();
  return client.post<{ webhook_secret: string }>(
    `/webhooks/apps/${appId}/rotate-secret`
  );
}

/**
 * Trigger webhook app (batch)
 */
export async function triggerWebhookBatch(
  appName: string,
  events: TriggerWebhookRequest[]
): Promise<{ status: string }> {
  const client = getClient();
  return client.post<{ status: string }>(
    `/webhooks/apps/${appName}/trigger-batch`,
    { events }
  );
}
