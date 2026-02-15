/**
 * JWT template model
 */
export interface JwtTemplate {
  id: string;
  name: string;
  token_lifetime: number;
  allowed_clock_skew: number;
  custom_signing_key?: CustomSigningKey;
  template: Record<string, unknown>;
  deployment_id: string;
  created_at: string;
  updated_at: string;
}

/**
 * Custom signing key configuration
 */
export interface CustomSigningKey {
  /** Whether the custom signing key is enabled */
  enabled: boolean;
  /** The key value */
  key: string;
  /** The algorithm used for signing (e.g., "RS256", "HS256") */
  algorithm: string;
}

/**
 * Request to create a JWT template
 */
export interface CreateJwtTemplateRequest {
  name: string;
  /** Token lifetime in seconds */
  token_lifetime: number;
  /** Allowed clock skew in seconds (default: 0) */
  allowed_clock_skew?: number;
  custom_signing_key?: CustomSigningKey;
  /** JWT template configuration (claims) */
  template: Record<string, unknown>;
}

/**
 * Request to update a JWT template
 */
export interface UpdateJwtTemplateRequest {
  name?: string;
  token_lifetime?: number;
  allowed_clock_skew?: number;
  custom_signing_key?: CustomSigningKey;
  template?: Record<string, unknown>;
}
