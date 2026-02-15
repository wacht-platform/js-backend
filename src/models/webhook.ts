/**
 * Webhook App model
 */
export interface WebhookApp {
  id: string;
  deployment_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  events: WebhookEventDefinition[];
  webhook_url: string;
  webhook_secret?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Webhook event definition
 */
export interface WebhookEventDefinition {
  id: string;
  event_name: string;
  event_type: string;
  filters?: WebhookEventFilter[];
}

/**
 * Webhook event filter
 */
export interface WebhookEventFilter {
  field: string;
  operator: 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'regex';
  value: string;
}

/**
 * HTTP method for webhook triggers
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Request to create a webhook app
 */
export interface CreateWebhookAppRequest {
  name: string;
  description?: string;
  is_active?: boolean;
  /** Events for this webhook (required, use [] if none) */
  events: WebhookEventDefinition[];
  webhook_url: string;
  webhook_secret?: string;
}

/**
 * Request to update a webhook app
 */
export interface UpdateWebhookAppRequest {
  name?: string;
  description?: string;
  is_active?: boolean;
  events?: WebhookEventDefinition[];
  webhook_url?: string;
  webhook_secret?: string;
}

/**
 * Request to trigger a webhook
 */
export interface TriggerWebhookRequest {
  event_name: string;
  event_type: string;
  entity_id: string;
  data: Record<string, unknown>;
}

/**
 * Webhook delivery attempt
 */
export interface WebhookDeliveryAttempt {
  id: string;
  webhook_app_id: string;
  event_id: string;
  status: 'pending' | 'success' | 'failed';
  http_status_code?: number;
  response_body?: string;
  attempted_at: string;
}

/**
 * Webhook analytics
 */
export interface WebhookAnalytics {
  total_deliveries: number;
  successful_deliveries: number;
  failed_deliveries: number;
  avg_response_time_ms: number;
}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  duration_ms: number;
  max_requests: number;
}

/**
 * Webhook endpoint
 */
export interface WebhookEndpoint {
  id: string;
  webhook_app_id: string;
  url: string;
  description?: string;
  event_types: string[];
  is_active: boolean;
  rate_limit_config?: RateLimitConfig | null;
  created_at: string;
  updated_at: string;
}

/**
 * Webhook delivery
 */
export interface WebhookDelivery {
  id: string;
  webhook_app_id: string;
  endpoint_id: string;
  event_id: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  http_status_code?: number;
  response_body?: string;
  error_message?: string;
  attempted_at: string;
  completed_at?: string;
}

/**
 * Webhook event
 */
export interface WebhookEvent {
  id: string;
  event_name: string;
  event_type: string;
  entity_id: string;
  data: Record<string, unknown>;
  created_at: string;
}

/**
 * Webhook stats
 */
export interface WebhookStats {
  total_events: number;
  total_deliveries: number;
  successful_deliveries: number;
  failed_deliveries: number;
  last_delivery_at?: string;
}

/**
 * Webhook timeseries data
 */
export interface WebhookTimeseriesData {
  timestamp: string;
  count: number;
  success_count: number;
  failure_count: number;
}

/**
 * Request to create a webhook endpoint
 */
export interface CreateWebhookEndpointRequest {
  url: string;
  description?: string;
  event_types: string[];
  rate_limit_config?: RateLimitConfig | null;
}

/**
 * Request to update a webhook endpoint
 */
export interface UpdateWebhookEndpointRequest {
  url?: string;
  description?: string;
  event_types?: string[];
  is_active?: boolean;
  rate_limit_config?: RateLimitConfig | null;
}
