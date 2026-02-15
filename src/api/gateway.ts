import axios from 'axios';
import type { AuthzCheckRequest, AuthzCheckResponse } from '../models/api-key';
import { parseApiError, WachtError } from '../error';

export interface GatewayCheckAuthzOptions {
  gatewayUrl?: string;
  timeout?: number;
}

const DEFAULT_GATEWAY_URL = 'https://gateway.wacht.dev';

/**
 * Check authz against the gateway with principal-based contract.
 */
export async function checkAuthz(
  payload: AuthzCheckRequest,
  options?: GatewayCheckAuthzOptions
): Promise<AuthzCheckResponse> {
  const base = (options?.gatewayUrl || DEFAULT_GATEWAY_URL).replace(/\/+$/, '');
  const url = `${base}/v1/authz/check`;

  try {
    const response = await axios.post<AuthzCheckResponse>(url, payload, {
      timeout: options?.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { status, data } = error.response;
        throw parseApiError(status, data);
      }
      if (error.request) {
        throw new WachtError('No response received from gateway');
      }
      throw new WachtError(error.message);
    }
    throw new WachtError('Unexpected gateway error');
  }
}
