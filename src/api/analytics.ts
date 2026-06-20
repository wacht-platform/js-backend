import { getClient, type WachtClient } from "../client";
import type {
  AnalyticsStats,
  AnalyticsUsageOptions,
  GatewayUsageResponse,
  TokenUsageByModelResponse,
  TokenUsageResponse,
  WebhookUsageResponse,
} from "../models";

/**
 * Get analytics summary
 */
export async function getAnalyticsSummary(
  options: { from: string; to: string },
  client?: WachtClient,
): Promise<AnalyticsStats> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  params.append("from", options.from);
  params.append("to", options.to);
  const queryString = params.toString();
  return sdkClient.get<AnalyticsStats>(
    `/analytics${queryString ? `?${queryString}` : ""}`,
  );
}

function usageQuery(options: AnalyticsUsageOptions): string {
  const params = new URLSearchParams();
  params.append("from", options.from);
  params.append("to", options.to);
  if (options.granularity !== undefined)
    params.append("granularity", options.granularity);
  if (options.tz !== undefined) params.append("tz", options.tz);
  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Get token-usage time series for the deployment.
 */
export async function getTokenUsage(
  options: AnalyticsUsageOptions,
  client?: WachtClient,
): Promise<TokenUsageResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<TokenUsageResponse>(
    `/analytics/token-usage${usageQuery(options)}`,
  );
}

/**
 * Get token usage aggregated per model.
 */
export async function getTokenUsageByModel(
  options: AnalyticsUsageOptions,
  client?: WachtClient,
): Promise<TokenUsageByModelResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<TokenUsageByModelResponse>(
    `/analytics/token-usage-by-model${usageQuery(options)}`,
  );
}

/**
 * Get webhook-delivery usage time series for the deployment.
 */
export async function getWebhookUsage(
  options: AnalyticsUsageOptions,
  client?: WachtClient,
): Promise<WebhookUsageResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<WebhookUsageResponse>(
    `/analytics/webhook-usage${usageQuery(options)}`,
  );
}

/**
 * Get gateway-authorization usage time series for the deployment.
 */
export async function getGatewayUsage(
  options: AnalyticsUsageOptions,
  client?: WachtClient,
): Promise<GatewayUsageResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<GatewayUsageResponse>(
    `/analytics/gateway-usage${usageQuery(options)}`,
  );
}
