const GATEWAY_URL = 'https://gateway.wacht.dev';

export interface RateLimitInfo {
  windowSeconds: number;
  limit: number;
  remaining: number;
  reset?: number;
}

export interface GatewayCheckResponse {
  allowed: boolean;
  keyId: string;
  deploymentId: string;
  appId: string;
  appName: string;
  keyName: string;
  permissions: string[];
  metadata: Record<string, any>;
  rateLimits: RateLimitInfo[];
  retryAfter?: number;
}

export async function verifyRequest(
  apiKey: string,
  identifier: string
): Promise<GatewayCheckResponse> {
  const url = `${GATEWAY_URL}/check/${identifier}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-Key': apiKey,
    },
  });

  const headers = response.headers;

  if (response.ok || response.status === 429) {
    const allowed = response.ok;

    const keyId = headers.get('x-wacht-key-id')!;
    const deploymentId = headers.get('x-wacht-deployment-id')!;
    const appId = headers.get('x-wacht-app-id')!;
    const appName = headers.get('x-wacht-app-name')!;
    const keyName = headers.get('x-wacht-key-name')!;
    const permissions = JSON.parse(headers.get('x-wacht-permissions')!);
    const metadata = JSON.parse(headers.get('x-wacht-metadata')!);

    const rateLimits = parseRateLimitHeaders(headers);

    const retryAfter = headers.get('retry-after')
      ? parseInt(headers.get('retry-after')!)
      : undefined;

    return {
      allowed,
      keyId,
      deploymentId,
      appId,
      appName,
      keyName,
      permissions,
      metadata,
      rateLimits,
      retryAfter,
    };
  }

  const errorBody = await response.text();
  throw new Error(`Gateway request failed: ${errorBody}`);
}

function parseRateLimitHeaders(headers: Headers): RateLimitInfo[] {
  const limitsMap = new Map<number, RateLimitInfo>();

  headers.forEach((value, key) => {
    if (key.startsWith('x-ratelimit-') && key.endsWith('s-limit')) {
      const windowMatch = key.match(/x-ratelimit-(\d+)s-limit/);
      if (windowMatch) {
        const window = parseInt(windowMatch[1]);
        const limit = parseInt(value);

        const remainingKey = `x-ratelimit-${window}s-remaining`;
        const resetKey = `x-ratelimit-${window}s-reset`;

        const remaining = headers.get(remainingKey)
          ? parseInt(headers.get(remainingKey)!)
          : 0;

        const reset = headers.get(resetKey)
          ? parseInt(headers.get(resetKey)!)
          : undefined;

        limitsMap.set(window, {
          windowSeconds: window,
          limit,
          remaining,
          reset,
        });
      }
    }
  });

  return Array.from(limitsMap.values()).sort(
    (a, b) => a.windowSeconds - b.windowSeconds
  );
}
