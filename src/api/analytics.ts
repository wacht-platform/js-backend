import { getClient, type WachtClient } from "../client";
import type {
  AnalyticsStats,
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
