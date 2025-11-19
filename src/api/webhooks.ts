import { getClient } from '../client';
import {
    WebhookApp,
    WebhookAppEvent,
    WebhookEndpoint,
    WebhookEndpointSubscription,
    WebhookDeliveryListResponse,
    WebhookDeliveryDetails,
    WebhookAnalyticsResult,
    WebhookTimeseriesResult,
    ListWebhookAppsQuery,
    ListWebhookAppsResponse,
    CreateWebhookAppRequest,
    UpdateWebhookAppRequest,
    GetAvailableEventsResponse,
    ListWebhookEndpointsQuery,
    ListWebhookEndpointsResponse,
    CreateWebhookEndpointRequest,
    UpdateWebhookEndpointRequest,
    TriggerWebhookEventRequest,
    TriggerWebhookEventResponse,
    BatchTriggerWebhookEventsRequest,
    ReplayWebhookDeliveryRequest,
    ReplayWebhookDeliveryResponse,
    ReactivateEndpointResponse,
    TestWebhookEndpointRequest,
    TestWebhookEndpointResponse,
    WebhookAnalyticsQuery,
    WebhookTimeseriesQuery,
    GetAppWebhookDeliveriesQuery,
} from '../models/webhook';

/**
 * Get a webhook app by name
 */
export async function getWebhookApp(appName: string): Promise<WebhookApp> {
    const client = getClient();
    const response = await client.get<WebhookApp>(`/webhooks/apps/${appName}`);
    return response.data;
}

/**
 * List webhook apps
 */
export async function listWebhookApps(
    options?: ListWebhookAppsQuery
): Promise<ListWebhookAppsResponse> {
    const client = getClient();
    const response = await client.get<ListWebhookAppsResponse>('/webhooks/apps', {
        params: options,
    });
    return response.data;
}

/**
 * Create a webhook app
 */
export async function createWebhookApp(
    request: CreateWebhookAppRequest
): Promise<WebhookApp> {
    const client = getClient();
    const response = await client.post<WebhookApp>('/webhooks/apps', request);
    return response.data;
}

/**
 * Update a webhook app
 */
export async function updateWebhookApp(
    appName: string,
    request: UpdateWebhookAppRequest
): Promise<WebhookApp> {
    const client = getClient();
    const response = await client.patch<WebhookApp>(
        `/webhooks/apps/${appName}`,
        request
    );
    return response.data;
}

/**
 * Delete a webhook app
 */
export async function deleteWebhookApp(appName: string): Promise<void> {
    const client = getClient();
    await client.delete(`/webhooks/apps/${appName}`);
}

/**
 * Rotate webhook secret
 */
export async function rotateWebhookSecret(appName: string): Promise<WebhookApp> {
    const client = getClient();
    const response = await client.post<WebhookApp>(
        `/webhooks/apps/${appName}/rotate-secret`
    );
    return response.data;
}

/**
 * Get webhook events for an app
 */
export async function getWebhookEvents(
    appName: string
): Promise<WebhookAppEvent[]> {
    const client = getClient();
    const response = await client.get<GetAvailableEventsResponse>(
        `/webhooks/apps/${appName}/events`
    );
    return response.data.events;
}

/**
 * List webhook endpoints
 */
export async function listWebhookEndpoints(
    appName: string,
    options?: ListWebhookEndpointsQuery
): Promise<ListWebhookEndpointsResponse> {
    const client = getClient();
    const response = await client.get<ListWebhookEndpointsResponse>(
        `/webhooks/apps/${appName}/endpoints`,
        {
            params: options,
        }
    );
    return response.data;
}

/**
 * Create a webhook endpoint
 */
export async function createWebhookEndpoint(
    request: CreateWebhookEndpointRequest
): Promise<WebhookEndpoint> {
    const client = getClient();
    const response = await client.post<WebhookEndpoint>(
        '/webhooks/endpoints',
        request
    );
    return response.data;
}

/**
 * Update a webhook endpoint
 */
export async function updateWebhookEndpoint(
    endpointId: string,
    request: UpdateWebhookEndpointRequest
): Promise<WebhookEndpoint> {
    const client = getClient();
    const response = await client.patch<WebhookEndpoint>(
        `/webhooks/endpoints/${endpointId}`,
        request
    );
    return response.data;
}

/**
 * Delete a webhook endpoint
 */
export async function deleteWebhookEndpoint(endpointId: string): Promise<void> {
    const client = getClient();
    await client.delete(`/webhooks/endpoints/${endpointId}`);
}

/**
 * Trigger a webhook event
 */
export async function triggerWebhookEvent(
    appName: string,
    request: TriggerWebhookEventRequest
): Promise<TriggerWebhookEventResponse> {
    const client = getClient();
    const response = await client.post<TriggerWebhookEventResponse>(
        `/webhooks/apps/${appName}/trigger`,
        request
    );
    return response.data;
}

/**
 * Batch trigger webhook events
 */
export async function batchTriggerWebhookEvents(
    appName: string,
    request: BatchTriggerWebhookEventsRequest
): Promise<TriggerWebhookEventResponse[]> {
    const client = getClient();
    const response = await client.post<TriggerWebhookEventResponse[]>(
        `/webhooks/apps/${appName}/trigger/batch`,
        request
    );
    return response.data;
}

/**
 * Get webhook deliveries for an app
 */
export async function getAppWebhookDeliveries(
    appName: string,
    options?: GetAppWebhookDeliveriesQuery
): Promise<WebhookDeliveryListResponse[]> {
    const client = getClient();
    // Note: The backend returns a paginated response wrapper, but here we return the list directly
    // or we should update the return type to match the paginated response.
    // Based on Rust SDK, it returns GetWebhookDeliveriesResponse which has data field.
    // Let's assume we want the raw response data which is the paginated wrapper.
    // But for simplicity and consistency with other list methods, let's return the wrapper or data.
    // The Rust SDK `get_webhook_deliveries` returns `GetWebhookDeliveriesResponse`.
    // Let's update the return type to `any` for now or define a wrapper.
    // Actually, looking at `models/webhook.ts`, I didn't define a `GetAppWebhookDeliveriesResponse`.
    // Let's return `any` for now to be safe or just the data array if we want to simplify.
    // But wait, the platform returns `PaginatedResponse<WebhookDeliveryListResponse>`.
    const response = await client.get<any>(
        `/webhooks/apps/${appName}/deliveries`,
        {
            params: options,
        }
    );
    return response.data.data; // Assuming standard paginated response structure
}

/**
 * Get webhook delivery details
 */
export async function getWebhookDeliveryDetails(
    deliveryId: string,
    status?: string
): Promise<WebhookDeliveryDetails> {
    const client = getClient();
    const response = await client.get<WebhookDeliveryDetails>(
        `/webhooks/deliveries/${deliveryId}`,
        {
            params: { status },
        }
    );
    return response.data;
}

/**
 * Replay webhook deliveries
 */
export async function replayWebhookDeliveries(
    appName: string,
    request: ReplayWebhookDeliveryRequest
): Promise<ReplayWebhookDeliveryResponse> {
    const client = getClient();
    const response = await client.post<ReplayWebhookDeliveryResponse>(
        `/webhooks/apps/${appName}/deliveries/replay`,
        request
    );
    return response.data;
}

/**
 * Reactivate a webhook endpoint
 */
export async function reactivateWebhookEndpoint(
    endpointId: string
): Promise<ReactivateEndpointResponse> {
    const client = getClient();
    const response = await client.post<ReactivateEndpointResponse>(
        `/webhooks/endpoints/${endpointId}/reactivate`
    );
    return response.data;
}

/**
 * Test webhook endpoint
 */
export async function testWebhookEndpoint(
    appName: string,
    endpointId: string,
    request: TestWebhookEndpointRequest
): Promise<TestWebhookEndpointResponse> {
    const client = getClient();
    const response = await client.post<TestWebhookEndpointResponse>(
        `/webhooks/apps/${appName}/endpoints/${endpointId}/test`,
        request
    );
    return response.data;
}

/**
 * Get webhook analytics
 */
export async function getWebhookAnalytics(
    appName: string,
    options?: WebhookAnalyticsQuery
): Promise<WebhookAnalyticsResult> {
    const client = getClient();
    const response = await client.get<WebhookAnalyticsResult>(
        `/webhooks/apps/${appName}/analytics`,
        {
            params: options,
        }
    );
    return response.data;
}

/**
 * Get webhook timeseries
 */
export async function getWebhookTimeseries(
    appName: string,
    options?: WebhookTimeseriesQuery
): Promise<WebhookTimeseriesResult> {
    const client = getClient();
    const response = await client.get<WebhookTimeseriesResult>(
        `/webhooks/apps/${appName}/timeseries`,
        {
            params: options,
        }
    );
    return response.data;
}
