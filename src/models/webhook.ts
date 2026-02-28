export interface RateLimitConfig {
  duration_ms: number;
  max_requests: number;
}

export interface EventSubscription {
  event_name: string;
  filter_rules?: Record<string, unknown> | null;
}

export interface WebhookApp {
  deployment_id: string;
  app_slug: string;
  name: string;
  description?: string | null;
  signing_secret: string;
  failure_notification_emails?: string[];
  event_catalog_slug?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WebhookAppEvent {
  deployment_id: string;
  app_slug: string;
  event_name: string;
  description?: string | null;
  schema?: Record<string, unknown> | null;
  created_at: string;
}

export interface WebhookEndpoint {
  id: string;
  deployment_id: string;
  app_slug: string;
  url: string;
  description?: string | null;
  headers?: Record<string, string> | null;
  is_active: boolean;
  max_retries: number;
  timeout_seconds: number;
  failure_count: number;
  last_failure_at?: string | null;
  auto_disabled: boolean;
  auto_disabled_at?: string | null;
  rate_limit_config?: RateLimitConfig | null;
  created_at: string;
  updated_at: string;
  subscriptions: EventSubscription[];
}

export interface WebhookDelivery {
  delivery_id: string;
  deployment_id: string;
  app_slug: string;
  endpoint_id: string;
  event_name: string;
  status: string;
  http_status_code?: number | null;
  response_time_ms?: number | null;
  attempt_number: number;
  max_attempts: number;
  timestamp: string;
}

export interface WebhookDeliveryDetails {
  delivery_id: string;
  deployment_id: string;
  app_slug: string;
  endpoint_id: string;
  event_name: string;
  status: string;
  http_status_code?: number | null;
  response_time_ms?: number | null;
  attempt_number: number;
  max_attempts: number;
  payload?: unknown | null;
  response_body?: string | null;
  response_headers?: Record<string, unknown> | null;
  timestamp: string;
}

export interface CreateWebhookAppRequest {
  name: string;
  description?: string;
  failure_notification_emails?: string[];
  event_catalog_slug?: string;
}

export interface UpdateWebhookAppRequest {
  name?: string;
  description?: string;
  is_active?: boolean;
  failure_notification_emails?: string[];
  event_catalog_slug?: string;
}

export interface CreateWebhookEndpointRequest {
  url: string;
  description?: string;
  headers?: Record<string, string>;
  subscriptions: EventSubscription[];
  max_retries?: number;
  timeout_seconds?: number;
  rate_limit_config?: RateLimitConfig | null;
}

export interface UpdateWebhookEndpointRequest {
  url?: string;
  description?: string;
  headers?: Record<string, string>;
  is_active?: boolean;
  subscriptions?: EventSubscription[];
  max_retries?: number;
  timeout_seconds?: number;
  rate_limit_config?: RateLimitConfig | null;
}

export interface TriggerWebhookRequest {
  event_name: string;
  payload: Record<string, unknown>;
  filter_context?: Record<string, unknown>;
}

export interface TriggerWebhookResponse {
  delivery_ids: number[];
  filtered_count: number;
  delivered_count: number;
}

export interface ReplayWebhookDeliveryRequestByIds {
  delivery_ids: string[];
  idempotency_key?: string;
}

export interface ReplayWebhookDeliveryRequestByDateRange {
  start_date: string;
  end_date?: string;
  status?: string;
  event_name?: string;
  endpoint_id?: string;
  idempotency_key?: string;
}

export type ReplayWebhookDeliveryRequest =
  | ReplayWebhookDeliveryRequestByIds
  | ReplayWebhookDeliveryRequestByDateRange;

export interface ReplayWebhookDeliveryResponse {
  status: string;
  message: string;
  task_id?: string | null;
}

export interface ReactivateWebhookEndpointResponse {
  success: boolean;
  message: string;
}

export interface TestWebhookEndpointRequest {
  event_name: string;
  payload?: Record<string, unknown>;
}

export interface TestWebhookEndpointResponse {
  success: boolean;
  status_code: number;
  response_time_ms: number;
  response_body?: string | null;
  error?: string | null;
}

export interface WebhookAnalyticsEventCount {
  event_name: string;
  count: number;
}

export interface WebhookAnalyticsEndpointPerformance {
  endpoint_id: number;
  endpoint_url: string;
  total_attempts: number;
  successful_attempts: number;
  failed_attempts: number;
  avg_response_time_ms?: number | null;
  success_rate: number;
}

export interface WebhookAnalyticsFailureReason {
  reason: string;
  count: number;
}

export interface WebhookAnalytics {
  total_events: number;
  total_deliveries: number;
  successful_deliveries: number;
  failed_deliveries: number;
  filtered_deliveries: number;
  avg_response_time_ms?: number | null;
  p50_response_time_ms?: number | null;
  p95_response_time_ms?: number | null;
  p99_response_time_ms?: number | null;
  success_rate: number;
  top_events: WebhookAnalyticsEventCount[];
  endpoint_performance: WebhookAnalyticsEndpointPerformance[];
  failure_reasons: WebhookAnalyticsFailureReason[];
}

export interface WebhookTimeseriesData {
  timestamp: string;
  total_events: number;
  total_deliveries: number;
  successful_deliveries: number;
  failed_deliveries: number;
  filtered_deliveries: number;
  avg_response_time_ms?: number | null;
  success_rate: number;
}
