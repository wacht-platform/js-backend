/**
 * Deployment restrictions settings
 */
export interface DeploymentRestrictionsUpdates {
  /** Enable allowlist mode */
  allowlist_enabled?: boolean;
  /** Enable blocklist mode */
  blocklist_enabled?: boolean;
  /** Block user+tag@gmail.com style email subaddresses */
  block_subaddresses?: boolean;
  /** Block disposable email services (guerrillamail, etc.) */
  block_disposable_emails?: boolean;
  /** Block VOIP phones (Google Voice, Skype, etc.) */
  block_voip_numbers?: boolean;
  /** Country restrictions (nested object) */
  country_restrictions?: CountryRestrictions;
  /** Keywords to block in emails */
  banned_keywords?: string[];
  /** Email addresses to allow (NOT domains!) */
  allowlisted_resources?: string[];
  /** Email addresses to block (NOT domains!) */
  blocklisted_resources?: string[];
  /** Sign up mode: public, restricted, or waitlist */
  sign_up_mode?: DeploymentRestrictionsSignUpMode;
  /** Collect names on waitlist signup */
  waitlist_collect_names?: boolean;
  /** Multi-session support configuration */
  multi_session_support?: MultiSessionSupport;
  /** Session token lifetime in seconds */
  session_token_lifetime?: number;
  /** Session validity period in seconds */
  session_validity_period?: number;
  /** Session inactive timeout in seconds */
  session_inactive_timeout?: number;
}

/**
 * Country restrictions nested object
 */
export interface CountryRestrictions {
  /** Enable country filtering */
  enabled: boolean;
  /** List of country codes (e.g., ["US", "CA", "GB"]) */
  country_codes: string[];
}

/**
 * Multi-session support configuration
 */
export interface MultiSessionSupport {
  /** Enable multi-session support */
  enabled: boolean;
  /** Maximum accounts per session */
  max_accounts_per_session: number;
  /** Maximum sessions per account */
  max_sessions_per_account: number;
}

/**
 * Sign up mode enum
 */
export type DeploymentRestrictionsSignUpMode =
  | 'public'
  | 'restricted'
  | 'waitlist';
