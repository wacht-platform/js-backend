import { getClient } from '../client';

/**
 * Health check
 */
export async function healthCheck(): Promise<{ status: string }> {
  const client = getClient();
  return client.get<{ status: string }>('/health');
}
