import { getClient } from '../client';
import {
    AnalyticsStats,
    AnalyticsStatsOptions,
    RecentSignupsResponse,
} from '../models/analytics';

/**
 * Fetch analytics statistics
 */
export async function fetchAnalyticsStats(
    options?: AnalyticsStatsOptions
): Promise<AnalyticsStats> {
    const client = getClient();
    const response = await client.get<AnalyticsStats>('/analytics/stats', {
        params: options,
    });
    return response.data;
}

/**
 * Fetch recent signups
 */
export async function fetchRecentSignups(limit?: number): Promise<RecentSignupsResponse> {
    const client = getClient();
    const response = await client.get<RecentSignupsResponse>('/analytics/recent-signups', {
        params: { limit },
    });
    return response.data;
}

/**
 * Fetch recent signins
 */
export async function fetchRecentSignins(limit?: number): Promise<RecentSignupsResponse> {
    const client = getClient();
    const response = await client.get<RecentSignupsResponse>('/analytics/recent-signins', {
        params: { limit },
    });
    return response.data;
}
