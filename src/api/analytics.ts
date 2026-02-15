import { getClient } from '../client';
import type { AnalyticsStats, RecentSignup, RecentSignupOrganization } from '../models';

/**
 * Get analytics summary
 */
export async function getAnalyticsSummary(): Promise<AnalyticsStats> {
  const client = getClient();
  return client.get<AnalyticsStats>('/analytics/summary');
}

/**
 * Get recent signups
 */
export async function getRecentSignups(
  options?: { limit?: number; offset?: number }
): Promise<RecentSignup[]> {
  const client = getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', String(options.limit));
  if (options?.offset !== undefined)
    params.append('offset', String(options.offset));
  const queryString = params.toString();
  return client.get<RecentSignup[]>(
    `/analytics/recent-signups${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Get recent signins
 */
export async function getRecentSignins(
  options?: { limit?: number; offset?: number }
): Promise<RecentSignup[]> {
  const client = getClient();
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', String(options.limit));
  if (options?.offset !== undefined)
    params.append('offset', String(options.offset));
  const queryString = params.toString();
  return client.get<RecentSignup[]>(
    `/analytics/recent-signins${queryString ? `?${queryString}` : ''}`
  );
}
