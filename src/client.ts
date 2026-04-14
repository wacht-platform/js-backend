import { parseApiError, WachtError } from './error';
import * as usersApi from './api/users';
import * as organizationsApi from './api/organizations';
import * as workspacesApi from './api/workspaces';
import * as apiKeysApi from './api/api-keys';
import * as settingsApi from './api/settings';
import * as notificationsApi from './api/notifications';
import * as webhooksApi from './api/webhooks';
import * as aiApi from './api/ai';
import * as oauthApi from './api/oauth';
import * as segmentsApi from './api/segments';
import * as invitationsApi from './api/invitations';
import * as analyticsApi from './api/analytics';
import * as utilityApi from './api/utility';
import * as healthApi from './api/health';
import * as gatewayApi from './api/gateway';

/**
 * Configuration options for the Wacht SDK client
 */
export interface WachtConfig {
  /** Optional logical name for this client */
  name?: string;
  /** Base URL of the Wacht API (default: https://api.wacht.io) */
  baseUrl?: string;
  /** API key for authentication */
  apiKey: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Additional headers to include in all requests */
  headers?: Record<string, string>;
  /** Optional fetch implementation (useful for Node 16 or custom runtimes) */
  fetch?: typeof fetch;
  /** Optional named store to register this client in */
  store?: WachtClientStore;
}

export interface RequestConfig extends Omit<RequestInit, 'body'> {
  /** Query params appended to URL */
  params?: Record<string, string | number | boolean | null | undefined>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Request body */
  body?: BodyInit | Record<string, unknown> | unknown;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  /** The data items */
  data: T[];
  /** Whether there are more items available */
  has_more: boolean;
  /** The limit used for this page */
  limit?: number;
  /** The offset used for this page */
  offset?: number;
}

/**
 * List query options for pagination
 */
export interface ListOptions {
  /** Maximum number of items to return */
  limit?: number;
  /** Number of items to skip */
  offset?: number;
}

export interface BinaryResponse {
  data: Uint8Array;
  contentType?: string;
  fileName?: string;
}

type AnyFn = (...args: any[]) => any;
type StripTrailingClientArg<F> = F extends (...args: infer A) => infer R
  ? A extends [...infer Rest, infer Last]
    ? Last extends WachtClient | undefined
      ? (...args: Rest) => R
      : (...args: A) => R
    : (...args: A) => R
  : never;
type BoundApi<T extends Record<string, AnyFn>> = {
  [K in keyof T]: StripTrailingClientArg<T[K]>;
};

/**
 * Wacht SDK Client
 */
export class WachtClient {
  private readonly baseUrl: string;
  private readonly defaultTimeout: number;
  private readonly defaultHeaders: Record<string, string>;
  private readonly fetchImpl?: typeof fetch;
  public readonly name?: string;

  readonly users: BoundApi<typeof usersApi>;
  readonly organizations: BoundApi<typeof organizationsApi>;
  readonly workspaces: BoundApi<typeof workspacesApi>;
  readonly apiKeys: BoundApi<typeof apiKeysApi>;
  readonly settings: BoundApi<typeof settingsApi>;
  readonly notifications: BoundApi<typeof notificationsApi>;
  readonly webhooks: BoundApi<typeof webhooksApi>;
  readonly ai: BoundApi<typeof aiApi>;
  readonly oauth: BoundApi<typeof oauthApi>;
  readonly segments: BoundApi<typeof segmentsApi>;
  readonly invitations: BoundApi<typeof invitationsApi>;
  readonly analytics: BoundApi<typeof analyticsApi>;
  readonly utility: BoundApi<typeof utilityApi>;
  readonly health: BoundApi<typeof healthApi>;
  readonly gateway: BoundApi<typeof gatewayApi>;

  constructor(config: WachtConfig) {
    this.baseUrl = config.baseUrl || 'https://api.wacht.io';
    this.defaultTimeout = config.timeout || 30000;
    this.defaultHeaders = {
      'Authorization': `Bearer ${config.apiKey}`,
      ...config.headers,
    };
    this.fetchImpl = config.fetch;
    this.name = config.name;

    this.users = this.bindApi(usersApi);
    this.organizations = this.bindApi(organizationsApi);
    this.workspaces = this.bindApi(workspacesApi);
    this.apiKeys = this.bindApi(apiKeysApi);
    this.settings = this.bindApi(settingsApi);
    this.notifications = this.bindApi(notificationsApi);
    this.webhooks = this.bindApi(webhooksApi);
    this.ai = this.bindApi(aiApi);
    this.oauth = this.bindApi(oauthApi);
    this.segments = this.bindApi(segmentsApi);
    this.invitations = this.bindApi(invitationsApi);
    this.analytics = this.bindApi(analyticsApi);
    this.utility = this.bindApi(utilityApi);
    this.health = this.bindApi(healthApi);
    this.gateway = this.bindApi(gatewayApi);

    if (config.store && config.name) {
      config.store.register(config.name, this);
    }
  }

  private bindApi<T extends Record<string, AnyFn>>(api: T): BoundApi<T> {
    const bound: Partial<Record<keyof T, AnyFn>> = {};

    for (const key of Object.keys(api) as Array<keyof T>) {
      const fn = api[key];
      bound[key] = (...args: unknown[]) => fn(...args, this);
    }

    return bound as BoundApi<T>;
  }

  private getFetch(): typeof fetch {
    if (this.fetchImpl) return this.fetchImpl;
    if (typeof globalThis.fetch === 'function') return globalThis.fetch.bind(globalThis);
    throw new WachtError(
      'No fetch implementation found. Provide one via initClient({ fetch }) in this runtime.'
    );
  }

  private buildUrl(url: string, params?: RequestConfig['params']): string {
    const absolute = new URL(url, this.baseUrl);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;
        absolute.searchParams.append(key, String(value));
      }
    }
    return absolute.toString();
  }

  private normalizeBody(
    body: RequestConfig['body'],
    headers: Headers
  ): BodyInit | undefined {
    if (body === undefined || body === null) return undefined;

    const hasFormData = typeof FormData !== 'undefined';
    const hasUrlSearchParams = typeof URLSearchParams !== 'undefined';
    const hasBlob = typeof Blob !== 'undefined';
    const hasReadableStream = typeof ReadableStream !== 'undefined';

    if (
      typeof body === 'string' ||
      (hasFormData && body instanceof FormData) ||
      (hasUrlSearchParams && body instanceof URLSearchParams) ||
      (hasBlob && body instanceof Blob) ||
      body instanceof ArrayBuffer ||
      ArrayBuffer.isView(body) ||
      (hasReadableStream && body instanceof ReadableStream)
    ) {
      return body as BodyInit;
    }

    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    return JSON.stringify(body);
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type')?.toLowerCase() || '';
    if (response.status === 204) {
      return undefined as T;
    }
    if (contentType.includes('application/json')) {
      return (await response.json()) as T;
    }
    return (await response.text()) as T;
  }

  private parseFileName(contentDisposition: string | null): string | undefined {
    if (!contentDisposition) return undefined;

    const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8Match?.[1]) {
      try {
        return decodeURIComponent(utf8Match[1]);
      } catch {
        return utf8Match[1];
      }
    }

    const quotedMatch = contentDisposition.match(/filename="([^"]+)"/i);
    if (quotedMatch?.[1]) {
      return quotedMatch[1];
    }

    const bareMatch = contentDisposition.match(/filename=([^;]+)/i);
    return bareMatch?.[1]?.trim();
  }

  private async request<T>(
    method: string,
    url: string,
    config?: RequestConfig
  ): Promise<T> {
    const fetchImpl = this.getFetch();
    const timeout = config?.timeout ?? this.defaultTimeout;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const headers = new Headers(this.defaultHeaders);
      if (config?.headers) {
        new Headers(config.headers).forEach((value, key) => headers.set(key, value));
      }

      const response = await fetchImpl(this.buildUrl(url, config?.params), {
        ...config,
        method,
        headers,
        body: this.normalizeBody(config?.body, headers),
        signal: config?.signal ?? controller.signal,
      });

      if (!response.ok) {
        let errorData: unknown = null;
        try {
          errorData = await response.json();
        } catch {
          try {
            const text = await response.text();
            errorData = { message: text };
          } catch {
            errorData = null;
          }
        }
        throw parseApiError(response.status, errorData);
      }

      return this.parseResponse<T>(response);
    } catch (error) {
      if (error instanceof WachtError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new WachtError('Request timed out');
      }

      if (error instanceof Error) {
        throw new WachtError(error.message);
      }

      throw new WachtError('Request failed');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Make a GET request
   */
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', url, config);
  }

  /**
   * Make a POST request
   */
  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', url, {
      ...config,
      body: data as RequestConfig['body'],
    });
  }

  /**
   * Make a PUT request
   */
  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', url, {
      ...config,
      body: data as RequestConfig['body'],
    });
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PATCH', url, {
      ...config,
      body: data as RequestConfig['body'],
    });
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, config);
  }

  /**
   * Make a GET request and return raw bytes
   */
  async getBinary(url: string, config?: RequestConfig): Promise<BinaryResponse> {
    const fetchImpl = this.getFetch();
    const timeout = config?.timeout ?? this.defaultTimeout;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const headers = new Headers(this.defaultHeaders);
      if (config?.headers) {
        new Headers(config.headers).forEach((value, key) => headers.set(key, value));
      }

      const response = await fetchImpl(this.buildUrl(url, config?.params), {
        method: 'GET',
        headers,
        signal: config?.signal ?? controller.signal,
      });

      if (!response.ok) {
        let errorData: unknown = null;
        try {
          errorData = await response.json();
        } catch {
          try {
            const text = await response.text();
            errorData = { message: text };
          } catch {
            errorData = null;
          }
        }
        throw parseApiError(response.status, errorData);
      }

      return {
        data: new Uint8Array(await response.arrayBuffer()),
        contentType: response.headers.get('content-type') || undefined,
        fileName: this.parseFileName(response.headers.get('content-disposition')),
      };
    } catch (error) {
      if (error instanceof WachtError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new WachtError('Request timed out');
      }

      if (error instanceof Error) {
        throw new WachtError(error.message);
      }

      throw new WachtError('Request failed');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Get the base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}

/**
 * Global client instance (lazy initialized)
 */
let globalClient: WachtClient | null = null;

export class WachtClientStore {
  private readonly clients = new Map<string, WachtClient>();

  register(name: string, client: WachtClient): void {
    this.clients.set(name, client);
  }

  get(name: string): WachtClient {
    const client = this.clients.get(name);
    if (!client) {
      throw new Error(`No Wacht client registered with name '${name}'.`);
    }
    return client;
  }

  has(name: string): boolean {
    return this.clients.has(name);
  }

  remove(name: string): boolean {
    return this.clients.delete(name);
  }

  list(): string[] {
    return Array.from(this.clients.keys());
  }

  clear(): void {
    this.clients.clear();
  }
}

export function createClientStore(): WachtClientStore {
  return new WachtClientStore();
}

/**
 * Initialize the global client
 */
export function initClient(config: WachtConfig): void {
  globalClient = new WachtClient(config);
}

/**
 * Get the global client instance
 * @throws {Error} If client has not been initialized
 */
export function getClient(): WachtClient {
  if (!globalClient) {
    throw new Error(
      'Wacht SDK client not initialized. Call initClient() first.'
    );
  }
  return globalClient;
}

/**
 * Check if the global client has been initialized
 */
export function isClientInitialized(): boolean {
  return globalClient !== null;
}
