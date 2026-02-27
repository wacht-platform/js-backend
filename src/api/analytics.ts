import { getClient, type WachtClient } from "../client";
import type {
  AnalyticsStats,
  RecentSignup,
  RecentSignupOrganization,
} from "../models";

/**
 * Get analytics summary
 */
export async function getAnalyticsSummary(
  client?: WachtClient,
): Promise<AnalyticsStats> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AnalyticsStats>("/analytics/summary");
}

/**
 * Get recent signups
 */
export async function getRecentSignups(
  options?: { limit?: number; offset?: number },
  client?: WachtClient,
): Promise<RecentSignup[]> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append("limit", String(options.limit));
  if (options?.offset !== undefined)
    params.append("offset", String(options.offset));
  const queryString = params.toString();
  return sdkClient.get<RecentSignup[]>(
    `/analytics/recent-signups${queryString ? `?${queryString}` : ""}`,
  );
}

/**
 * Get recent signins
 */
export async function getRecentSignins(
  options?: { limit?: number; offset?: number },
  client?: WachtClient,
): Promise<RecentSignup[]> {
  const sdkClient = client ?? getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append("limit", String(options.limit));
  if (options?.offset !== undefined)
    params.append("offset", String(options.offset));
  const queryString = params.toString();
  return sdkClient.get<RecentSignup[]>(
    `/analytics/recent-signins${queryString ? `?${queryString}` : ""}`,
  );
}
