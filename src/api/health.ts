import { getClient, type WachtClient } from "../client";

/**
 * Health check
 */
export async function healthCheck(
  client?: WachtClient,
): Promise<{ status: string }> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<{ status: string }>("/health");
}
