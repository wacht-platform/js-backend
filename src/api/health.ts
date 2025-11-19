import { getClient } from '../client';
import { HealthStatus } from '../models/health';

/**
 * Check the health status of the API
 */
export async function checkHealth(): Promise<HealthStatus> {
    const client = getClient();
    const response = await client.get<HealthStatus>('/health');
    return response.data;
}

/**
 * Check if the API is alive (simple ping)
 */
export async function ping(): Promise<boolean> {
    const client = getClient();
    const response = await client.get('/health/ping');
    return response.status === 200;
}
