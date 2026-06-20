/**
 * Analytics stats summary
 */
export interface AnalyticsStats {
  unique_signins: number;
  signups: number;
  organizations_created: number;
  workspaces_created: number;
  total_signups: number;
  unique_signins_change?: number;
  signups_change?: number;
  organizations_created_change?: number;
  workspaces_created_change?: number;
  daily_metrics: DailyAuthMetric[];
  recent_signups: RecentSignup[];
  recent_signins: RecentSignup[];
  methods: BreakdownItem[];
  top_countries: BreakdownItem[];
  devices: BreakdownItem[];
}

/**
 * Day-wise auth activity
 */
export interface DailyAuthMetric {
  day: string;
  signins: number;
  signups: number;
}

/**
 * Labelled count breakdown (auth method, country, device)
 */
export interface BreakdownItem {
  label: string;
  count: number;
}

/**
 * Recent signup
 */
export interface RecentSignup {
  name?: string;
  email?: string;
  method?: string;
  date: string;
}

/**
 * One time-series bucket of token usage.
 */
export interface TokenUsageBucket {
  bucket: string;
  input_tokens: number;
  cached_tokens: number;
  output_tokens: number;
  total_tokens: number;
  request_count: number;
}

export interface TokenUsageResponse {
  buckets: TokenUsageBucket[];
}

/**
 * Token usage aggregated per model.
 */
export interface TokenUsageByModel {
  model: string;
  input_tokens: number;
  cached_tokens: number;
  output_tokens: number;
  total_tokens: number;
  request_count: number;
}

export interface TokenUsageByModelResponse {
  models: TokenUsageByModel[];
}

/**
 * One time-series bucket of webhook delivery usage.
 */
export interface WebhookUsageBucket {
  bucket: string;
  total_deliveries: number;
  successful_deliveries: number;
  failed_deliveries: number;
  filtered_deliveries: number;
  success_rate: number;
}

export interface WebhookUsageResponse {
  buckets: WebhookUsageBucket[];
}

/**
 * One time-series bucket of gateway authorization usage.
 */
export interface GatewayUsageBucket {
  bucket: string;
  total_requests: number;
  allowed_requests: number;
  blocked_requests: number;
}

export interface GatewayUsageResponse {
  buckets: GatewayUsageBucket[];
}

/**
 * Common options for analytics breakdown endpoints.
 */
export interface AnalyticsUsageOptions {
  from: string;
  to: string;
  /** Bucket size: `minute` (default), `hour`, or `day`. */
  granularity?: string;
  /** IANA timezone for bucket boundaries. Defaults to UTC. */
  tz?: string;
}
