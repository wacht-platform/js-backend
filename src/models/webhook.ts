export interface WebhookApp {
    deployment_id: string;
    name: string;
    description?: string;
    signing_secret: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface WebhookEventDefinition {
    name: string;
    description: string;
    schema?: any;
}

export interface WebhookAppEvent {
    deployment_id: string;
    app_name: string;
    event_name: string;
    description?: string;
    schema?: any;
    created_at: string;
}

export interface WebhookEndpoint {
    id: string;
    deployment_id: string;
    app_name: string;
    url: string;
    description?: string;
    headers?: any;
    is_active: boolean;
    signing_secret?: string;
    max_retries: number;
    timeout_seconds: number;
    failure_count: number;
    last_failure_at?: string;
    auto_disabled: boolean;
    auto_disabled_at?: string;
    created_at: string;
    updated_at: string;
    subscriptions?: WebhookEndpointSubscription[];
}

export interface WebhookEndpointSubscription {
    endpoint_id: string;
    deployment_id: string;
    app_name: string;
    event_name: string;
    filter_rules?: any;
    created_at: string;
}

export interface EventSubscription {
    event_name: string;
    filter_rules?: any;
}

export interface ListWebhookAppsQuery {
    include_inactive?: boolean;
}

export interface ListWebhookAppsResponse {
    apps: WebhookApp[];
    total: number;
}

export interface CreateWebhookAppRequest {
    name: string;
    description?: string;
    events: WebhookEventDefinition[];
}

export interface UpdateWebhookAppRequest {
    name?: string;
    description?: string;
    is_active?: boolean;
}

export interface GetAvailableEventsResponse {
    events: WebhookAppEvent[];
}

export interface ListWebhookEndpointsQuery {
    include_inactive?: boolean;
    limit?: number;
    offset?: number;
}

export interface ListWebhookEndpointsResponse {
    endpoints: WebhookEndpoint[];
    count: number;
    limit: number;
    offset: number;
    has_more: boolean;
}

export interface CreateWebhookEndpointRequest {
    app_name: string;
    url: string;
    description?: string;
    subscriptions: EventSubscription[];
    headers?: any;
    max_retries?: number;
    timeout_seconds?: number;
}

export interface UpdateWebhookEndpointRequest {
    url?: string;
    description?: string;
    headers?: any;
    max_retries?: number;
    timeout_seconds?: number;
    is_active?: boolean;
    subscriptions?: EventSubscription[];
}

export interface TriggerWebhookEventRequest {
    app_name: string;
    event_name: string;
    payload: any;
    filter_context?: any;
}

export interface TriggerWebhookEventResponse {
    delivery_ids: number[];
    filtered_count: number;
    delivered_count: number;
}

export interface WebhookEventTrigger {
    event_name: string;
    payload: any;
    filter_context?: any;
}

export interface BatchTriggerWebhookEventsRequest {
    app_name: string;
    events: WebhookEventTrigger[];
}

export type ReplayWebhookDeliveryRequest =
    | {
        delivery_ids: string[];
        include_successful?: boolean;
    }
    | {
        start_date: string;
        end_date?: string;
        include_successful?: boolean;
    };

export interface ReplayWebhookDeliveryResponse {
    status: string;
    message: string;
}

export interface ReactivateEndpointResponse {
    success: boolean;
    message: string;
}

export interface TestWebhookEndpointRequest {
    event_name: string;
    payload?: any;
}

export interface TestWebhookEndpointResponse {
    success: boolean;
    status_code: number;
    response_time_ms: number;
    response_body?: string;
    error?: string;
}

export interface WebhookAnalyticsQuery {
    app_id?: number;
    endpoint_id?: number;
    start_date?: string;
    end_date?: string;
}

export type TimeseriesInterval = 'minute' | 'hour' | 'day' | 'week' | 'month';

export interface WebhookTimeseriesQuery {
    app_id?: number;
    endpoint_id?: number;
    interval?: TimeseriesInterval;
    start_date?: string;
    end_date?: string;
}

export interface WebhookAnalyticsResult {
    total_events: number;
    total_deliveries: number;
    successful_deliveries: number;
    failed_deliveries: number;
    filtered_deliveries: number;
    avg_response_time_ms?: number;
    p50_response_time_ms?: number;
    p95_response_time_ms?: number;
    p99_response_time_ms?: number;
    success_rate: number;
    top_events: EventCount[];
    endpoint_performance: EndpointPerformance[];
    failure_reasons: FailureReason[];
}

export interface EventCount {
    event_name: string;
    count: number;
}

export interface EndpointPerformance {
    endpoint_id: number;
    endpoint_url: string;
    total_attempts: number;
    successful_attempts: number;
    failed_attempts: number;
    avg_response_time_ms?: number;
    success_rate: number;
}

export interface FailureReason {
    reason: string;
    count: number;
}

export interface WebhookTimeseriesResult {
    data: TimeseriesPoint[];
    interval: string;
}

export interface TimeseriesPoint {
    timestamp: string;
    total_events: number;
    total_deliveries: number;
    successful_deliveries: number;
    failed_deliveries: number;
    filtered_deliveries: number;
    avg_response_time_ms?: number;
    success_rate: number;
}

export interface GetAppWebhookDeliveriesQuery {
    endpoint_id?: number;
    event_name?: string;
    status?: string;
    limit?: number;
    offset?: number;
    since?: string;
    until?: string;
}

export interface WebhookDeliveryListResponse {
    delivery_id: string;
    deployment_id: string;
    app_name: string;
    endpoint_id: string;
    endpoint_url: string;
    event_name: string;
    status: string;
    http_status_code?: number;
    response_time_ms?: number;
    attempt_number: number;
    max_attempts: number;
    error_message?: string;
    filtered_reason?: string;
    timestamp: string;
}

export interface WebhookDeliveryDetails extends WebhookDeliveryListResponse {
    payload_s3_key: string;
    response_body?: string;
    response_headers?: any;
    payload?: any;
}
