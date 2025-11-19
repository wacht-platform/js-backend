import { getClient } from '../client';
import { GenerateTokenRequest, GenerateTokenResponse } from '../models/deployment';

/**
 * Generate JWT Token
 */
export async function generateToken(
    request: GenerateTokenRequest
): Promise<GenerateTokenResponse> {
    const client = getClient();
    const response = await client.post<GenerateTokenResponse>('/token', request);
    return response.data;
}
