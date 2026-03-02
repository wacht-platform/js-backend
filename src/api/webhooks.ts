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
  TriggerWebhookResponse,
  WebhookAnalytics,
  WebhookEndpoint,
  WebhookDelivery,
  WebhookDeliveryDetails,
  WebhookAppEvent,
  WebhookTimeseriesData,
  CreateWebhookEndpointRequest,
  UpdateWebhookEndpointRequest,
  ReplayWebhookDeliveryRequest,
  ReplayWebhookDeliveryResponse,
  ReactivateWebhookEndpointResponse,
  TestWebhookEndpointRequest,
  TestWebhookEndpointResponse,
} from "../models";

function withQuery(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): string {
  const params = new URLSearchParams();
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined) continue;
      params.append(key, String(value));
    }
  }
  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
}

/**
 * List webhook apps
 */
export async function listWebhookApps(
  options?: ListOptions & { include_inactive?: boolean },
  client?: WachtClient,
): Promise<PaginatedResponse<WebhookApp>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<WebhookApp>>(
    withQuery("/webhooks/apps", {
      limit: options?.limit,
      offset: options?.offset,
      include_inactive: options?.include_inactive,
    }),
  );
}

/**
 * Get a webhook app
 */
export async function getWebhookApp(
  appSlug: string,
  client?: WachtClient,
): Promise<WebhookApp> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookApp>(`/webhooks/apps/${appSlug}`);
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
  appSlug: string,
  request: UpdateWebhookAppRequest,
  client?: WachtClient,
): Promise<WebhookApp> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<WebhookApp>(`/webhooks/apps/${appSlug}`, request);
}

/**
 * Delete a webhook app
 */
export async function deleteWebhookApp(
  appSlug: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/webhooks/apps/${appSlug}`);
}

/**
 * Rotate a webhook app secret
 */
export async function rotateWebhookSecret(
  appSlug: string,
  client?: WachtClient,
): Promise<WebhookApp> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<WebhookApp>(`/webhooks/apps/${appSlug}/rotate-secret`);
}

/**
 * Trigger a webhook event
 */
export async function triggerWebhook(
  appSlug: string,
  request: TriggerWebhookRequest,
  client?: WachtClient,
): Promise<TriggerWebhookResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<TriggerWebhookResponse>(
    `/webhooks/apps/${appSlug}/trigger`,
    {
      app_slug: appSlug,
      event_name: request.event_name,
      payload: request.payload,
      filter_context: request.filter_context,
    },
  );
}

/**
 * List webhook events
 */
export async function listWebhookEvents(
  appSlug: string,
  client?: WachtClient,
): Promise<WebhookAppEvent[]> {
  const sdkClient = client ?? getClient();
  const response = await sdkClient.get<{ events: WebhookAppEvent[] }>(
    `/webhooks/apps/${appSlug}/events`,
  );
  return response.events;
}

/**
 * List webhook endpoints for an app
 */
export async function listWebhookEndpoints(
  appSlug: string,
  options?: ListOptions & { include_inactive?: boolean },
  client?: WachtClient,
): Promise<PaginatedResponse<WebhookEndpoint>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<WebhookEndpoint>>(
    withQuery(`/webhooks/apps/${appSlug}/endpoints`, {
      limit: options?.limit,
      offset: options?.offset,
      include_inactive: options?.include_inactive,
    }),
  );
}

/**
 * Create a webhook endpoint for an app
 */
export async function createWebhookEndpoint(
  appSlug: string,
  request: CreateWebhookEndpointRequest,
  client?: WachtClient,
): Promise<WebhookEndpoint> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<WebhookEndpoint>(
    `/webhooks/apps/${appSlug}/endpoints`,
    {
      ...request,
      app_slug: appSlug,
    },
  );
}

/**
 * Update a webhook endpoint
 */
export async function updateWebhookEndpoint(
  appSlug: string,
  endpointId: string,
  request: UpdateWebhookEndpointRequest,
  client?: WachtClient,
): Promise<WebhookEndpoint> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<WebhookEndpoint>(
    `/webhooks/apps/${appSlug}/endpoints/${endpointId}`,
    request,
  );
}

/**
 * Delete a webhook endpoint
 */
export async function deleteWebhookEndpoint(
  appSlug: string,
  endpointId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/webhooks/apps/${appSlug}/endpoints/${endpointId}`,
  );
}

/**
 * Test a webhook endpoint
 */
export async function testWebhookEndpoint(
  appSlug: string,
  endpointId: string,
  request: TestWebhookEndpointRequest,
  client?: WachtClient,
): Promise<TestWebhookEndpointResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<TestWebhookEndpointResponse>(
    `/webhooks/apps/${appSlug}/endpoints/${endpointId}/test`,
    request,
  );
}

/**
 * Reactivate a webhook endpoint
 */
export async function reactivateWebhookEndpoint(
  endpointId: string,
  client?: WachtClient,
): Promise<ReactivateWebhookEndpointResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ReactivateWebhookEndpointResponse>(
    `/webhooks/endpoints/${endpointId}/reactivate`,
  );
}

/**
 * List webhook deliveries
 */
export async function listWebhookDeliveries(
  appSlug: string,
  options?: ListOptions & {
    endpoint_id?: number;
    event_name?: string;
    status?: string;
    since?: string;
    until?: string;
  },
  client?: WachtClient,
): Promise<PaginatedResponse<WebhookDelivery>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<WebhookDelivery>>(
    withQuery(`/webhooks/apps/${appSlug}/deliveries`, {
      limit: options?.limit,
      offset: options?.offset,
      endpoint_id: options?.endpoint_id,
      event_name: options?.event_name,
      status: options?.status,
      since: options?.since,
      until: options?.until,
    }),
  );
}

/**
 * Get webhook delivery details
 */
export async function getWebhookDelivery(
  appSlug: string,
  deliveryId: string,
  client?: WachtClient,
): Promise<WebhookDeliveryDetails> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookDeliveryDetails>(
    `/webhooks/apps/${appSlug}/deliveries/${deliveryId}`,
  );
}

/**
 * Replay webhook deliveries (single delivery helper)
 */
export async function replayWebhookDelivery(
  appSlug: string,
  deliveryId: string,
  client?: WachtClient,
): Promise<ReplayWebhookDeliveryResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ReplayWebhookDeliveryResponse>(
    `/webhooks/apps/${appSlug}/deliveries/replay`,
    { delivery_ids: [deliveryId] },
  );
}

/**
 * Replay webhook deliveries
 */
export async function replayWebhookDeliveries(
  appSlug: string,
  request: ReplayWebhookDeliveryRequest,
  client?: WachtClient,
): Promise<ReplayWebhookDeliveryResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ReplayWebhookDeliveryResponse>(
    `/webhooks/apps/${appSlug}/deliveries/replay`,
    request,
  );
}

/**
 * Get webhook analytics
 */
export async function getWebhookAnalytics(
  appSlug: string,
  options?: {
    endpoint_id?: number;
    start_date?: string;
    end_date?: string;
  },
  client?: WachtClient,
): Promise<WebhookAnalytics> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookAnalytics>(
    withQuery(`/webhooks/apps/${appSlug}/analytics`, options),
  );
}

/**
 * Get webhook stats
 */
export async function getWebhookStats(
  appSlug: string,
  client?: WachtClient,
): Promise<WebhookAnalytics> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookAnalytics>(`/webhooks/apps/${appSlug}/stats`);
}

/**
 * Get webhook timeseries data
 */
export async function getWebhookTimeseries(
  appSlug: string,
  options: {
    interval: "minute" | "hour" | "day" | "week" | "month";
    endpoint_id?: number;
    start_date?: string;
    end_date?: string;
  },
  client?: WachtClient,
): Promise<WebhookTimeseriesData[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookTimeseriesData[]>(
    withQuery(`/webhooks/apps/${appSlug}/timeseries`, options),
  );
}
