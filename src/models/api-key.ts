export type RateLimitUnit = 'second' | 'minute' | 'hour' | 'day';
export type RateLimitMode = 'per_key' | 'per_ip' | 'per_key_and_ip';

export interface RateLimit {
    unit: RateLimitUnit;
    duration: number;
    max_requests: number;
    mode?: RateLimitMode;
}

export interface ApiKeyApp {
    id: string;
    deployment_id: string;
    name: string;
    description?: string;
    is_active: boolean;
    rate_limits: RateLimit[];
    created_at: string;
    updated_at: string;
}

export interface ApiKey {
    id: string;
    app_id: string;
    deployment_id: string;
    name: string;
    key_prefix: string;
    key_suffix: string;
    permissions: string[];
    metadata: any;
    expires_at?: string;
    last_used_at?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    revoked_at?: string;
    revoked_reason?: string;
}

export interface ApiKeyWithSecret {
    id: string;
    app_id: string;
    deployment_id: string;
    name: string;
    key_prefix: string;
    key_suffix: string;
    permissions: string[];
    metadata: any;
    expires_at?: string;
    last_used_at?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    revoked_at?: string;
    revoked_reason?: string;
    secret: string;
}

export interface CreateApiKeyAppRequest {
    name: string;
    description?: string;
    rate_limits?: RateLimit[];
}

export interface UpdateApiKeyAppRequest {
    name?: string;
    description?: string;
    is_active?: boolean;
    rate_limits?: RateLimit[];
}

export interface CreateApiKeyRequest {
    name: string;
    key_prefix: string;
    permissions?: string[];
    expires_at?: string;
    metadata?: any;
}

export interface RevokeApiKeyRequest {
    key_id: string;
    reason?: string;
}

export interface RotateApiKeyRequest {
    key_id: string;
}

export interface ListApiKeyAppsResponse {
    total: number;
    apps: ApiKeyApp[];
}

export interface ListApiKeysResponse {
    keys: ApiKey[];
}
