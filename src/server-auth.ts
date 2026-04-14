import { p256, p384, p521 } from "@noble/curves/nist.js";
import { createRemoteJWKSet, errors, jwtVerify } from "jose";

export interface WachtAuth {
  userId: string | null;
  sessionId: string | null;
  organizationId: string | null;
  workspaceId: string | null;
  organizationPermissions: string[];
  workspacePermissions: string[];
  protect: (options?: ProtectOptions) => Promise<void>;
  has: (permission: PermissionCheck) => boolean;
}

export interface SessionPrincipalIdentity {
  principal_type: "session_token";
  user_id: string;
  session_id: string | null;
  organization_id: string | null;
  workspace_id: string | null;
}

export interface SessionPrincipalMetadata {
  principal_type: "session_token";
  permissions_checked: string[];
  organization_permissions: string[];
  workspace_permissions: string[];
  scopes: string[];
  resource: string | null;
  expires_at: string | null;
}

export interface ProtectOptions {
  permission?: string | string[];
  organizationId?: string;
  workspaceId?: string;
  redirectUrl?: string;
}

export interface PermissionCheck {
  permission?: string | string[];
  organizationId?: string;
  workspaceId?: string;
}

export interface WachtServerOptions {
  signInUrl?: string;
  clockSkewInMs?: number;
  requiredIssuer?: string;
  publishableKey?: string;
  authCookieName?: string;
  sessionCookieName?: string;
  devSessionCookieName?: string;
}

export class WachtAuthError extends Error {
  status: number;
  code: "unauthenticated" | "forbidden";
  redirectUrl?: string;

  constructor(
    code: "unauthenticated" | "forbidden",
    status: number,
    message: string,
    options?: { redirectUrl?: string },
  ) {
    super(message);
    this.name = "WachtAuthError";
    this.code = code;
    this.status = status;
    this.redirectUrl = options?.redirectUrl;
  }
}

export interface JWTPayload {
  sub?: string;
  sid?: string;
  sess?: string;
  organization?: string;
  organization_permissions?: string[];
  workspace?: string;
  workspace_permissions?: string[];
  permissions?: {
    organization?: string[];
    workspace?: string[];
  };
  claims?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  custom_claims?: Record<string, unknown>;
  exp?: number;
  nbf?: number;
  iat?: number;
  iss?: string;
  aud?: string | string[];
}

interface JWTHeader {
  alg?: string;
  kid?: string;
}

interface JWKKey {
  kid?: string;
  kty?: string;
  alg?: string;
  crv?: string;
  use?: string;
  x?: string;
  y?: string;
}

interface JWKSResponse {
  keys?: JWKKey[];
}

type VerifyAuthTokenReason =
  | "missing_public_key"
  | "invalid_signature"
  | "invalid_time_claims"
  | "invalid_issuer"
  | "invalid_token_payload"
  | "unknown";

const AUTH_HEADER = "x-wacht-auth";
const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();
const rawJwksCache = new Map<
  string,
  { value: JWKSResponse; expiresAt: number }
>();
const RAW_JWKS_CACHE_TTL_MS = 5 * 60 * 1000;

function decodeBase64(input: string): string {
  if (typeof atob === "function") {
    return atob(input);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "base64").toString("utf-8");
  }

  throw new Error("No base64 decoder available in this runtime.");
}

function decodeBase64Url(input: string): string {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );
  return decodeBase64(padded);
}

function decodeBase64UrlToBytes(input: string): Uint8Array {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );
  const raw = decodeBase64(padded);
  return Uint8Array.from(raw, (char) => char.charCodeAt(0));
}

function decodeJwtPayload(token: string): JWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payloadText = decodeBase64Url(parts[1]);
    return JSON.parse(payloadText) as JWTPayload;
  } catch {
    return null;
  }
}

function decodeJwtHeader(token: string): JWTHeader | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(decodeBase64Url(parts[0])) as JWTHeader;
  } catch {
    return null;
  }
}

function getTokenFromAuthorizationHeader(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.substring(7).trim();
}

function getFrontendApiUrl(options: WachtServerOptions): string {
  const parsedFromPublishableKey = parseFrontendApiUrlFromPublishableKey(
    options.publishableKey || readPublishableKeyFromEnv(),
  );
  if (parsedFromPublishableKey) {
    return parsedFromPublishableKey;
  }

  throw new Error(
    "Unable to derive frontend API URL from publishable key. Set WACHT_PUBLISHABLE_KEY or NEXT_PUBLIC_WACHT_PUBLISHABLE_KEY.",
  );
}

function readPublishableKeyFromEnv(): string | undefined {
  if (typeof process === "undefined" || !process.env) return undefined;
  return (
    process.env.NEXT_PUBLIC_WACHT_PUBLISHABLE_KEY ||
    process.env.WACHT_PUBLISHABLE_KEY
  );
}

export function parseFrontendApiUrlFromPublishableKey(
  publishableKey?: string,
): string | null {
  if (!publishableKey) return null;

  const value = publishableKey.trim();
  const prefixes = ["pk_test_", "pk_live_"];
  const prefix = prefixes.find((candidate) => value.startsWith(candidate));
  if (!prefix) return null;

  const encoded = value.slice(prefix.length);
  if (!encoded) return null;

  try {
    const decoded = decodeBase64(encoded);
    const url = new URL(decoded);
    return url.origin.replace(/\/$/, "");
  } catch {
    return null;
  }
}

function sanitizeErrorDetail(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}:${error.message}`
      .replace(/[\r\n\t]+/g, " ")
      .replace(/\s+/g, " ")
      .slice(0, 240);
  }

  return String(error)
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 240);
}

async function verifyJwtSignature(
  token: string,
  frontendApiUrl: string,
  options: WachtServerOptions,
): Promise<{
  payload: JWTPayload | null;
  detail: string | null;
  verifier: string | null;
  reason: VerifyAuthTokenReason | null;
}> {
  const header = decodeJwtHeader(token);
  if (!header?.alg) {
    return {
      payload: null,
      detail: "invalid jwt header or payload",
      verifier: null,
      reason: "invalid_token_payload",
    };
  }

  try {
    const expectedIssuer = options.requiredIssuer || frontendApiUrl;
    const jwks = getRemoteJwks(frontendApiUrl);
    const { payload } = await jwtVerify(token, jwks, {
      algorithms: [header.alg],
      issuer: expectedIssuer,
      clockTolerance: Math.floor((options.clockSkewInMs || 0) / 1000),
    });
    return { payload: payload as JWTPayload, detail: "jose", verifier: "jose", reason: null };
  } catch (error) {
    const fallback = await verifyEcJwtWithNoble(
      token,
      frontendApiUrl,
      header,
      options,
      sanitizeErrorDetail(error),
    );
    if (fallback) {
      return fallback;
    }

    return {
      payload: null,
      detail: sanitizeErrorDetail(error),
      verifier: "jose",
      reason: classifyVerifyError(error),
    };
  }
}

function getRemoteJwks(frontendApiUrl: string) {
  let jwks = jwksCache.get(frontendApiUrl);
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${frontendApiUrl}/.well-known/jwks.json`));
    jwksCache.set(frontendApiUrl, jwks);
  }
  return jwks;
}

async function fetchRawJwks(frontendApiUrl: string): Promise<JWKSResponse | null> {
  const cached = rawJwksCache.get(frontendApiUrl);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const response = await fetch(`${frontendApiUrl}/.well-known/jwks.json`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) return null;
  const jwks = (await response.json()) as JWKSResponse;
  if (!Array.isArray(jwks?.keys)) return null;

  rawJwksCache.set(frontendApiUrl, {
    value: jwks,
    expiresAt: Date.now() + RAW_JWKS_CACHE_TTL_MS,
  });
  return jwks;
}

function expectedCurveForAlgorithm(alg: string): string | null {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      return null;
  }
}

function selectEcJwkForToken(
  jwks: JWKSResponse,
  header: JWTHeader,
): JWKKey | null {
  const keys = Array.isArray(jwks.keys) ? jwks.keys : [];
  const expectedCurve = header.alg ? expectedCurveForAlgorithm(header.alg) : null;
  if (!expectedCurve) return null;

  const filtered = keys.filter((key) => {
    if (key.kty !== "EC") return false;
    if (key.use && key.use !== "sig") return false;
    if (header.kid && key.kid !== header.kid) return false;
    if (key.alg && header.alg && key.alg !== header.alg) return false;
    if (key.crv !== expectedCurve) return false;
    return !!key.x && !!key.y;
  });

  return filtered[0] || null;
}

function uncompressedEcPublicKeyFromJwk(key: JWKKey): Uint8Array {
  const x = decodeBase64UrlToBytes(key.x!);
  const y = decodeBase64UrlToBytes(key.y!);
  const publicKey = new Uint8Array(1 + x.length + y.length);
  publicKey[0] = 0x04;
  publicKey.set(x, 1);
  publicKey.set(y, 1 + x.length);
  return publicKey;
}

async function verifyEcJwtWithNoble(
  token: string,
  frontendApiUrl: string,
  header: JWTHeader,
  options: WachtServerOptions,
  joseDetail: string,
): Promise<{
  payload: JWTPayload | null;
  detail: string | null;
  verifier: string | null;
  reason: VerifyAuthTokenReason | null;
} | null> {
  const curveName = header.alg ? expectedCurveForAlgorithm(header.alg) : null;
  if (!curveName) return null;

  const parts = token.split(".");
  if (parts.length !== 3) {
    return {
      payload: null,
      detail: `${joseDetail}; noble:invalid token shape`,
      verifier: "jose+noble",
      reason: "invalid_token_payload",
    };
  }

  const jwks = await fetchRawJwks(frontendApiUrl);
  if (!jwks) {
    return {
      payload: null,
      detail: `${joseDetail}; noble:jwks unavailable`,
      verifier: "jose+noble",
      reason: "missing_public_key",
    };
  }

  const jwk = selectEcJwkForToken(jwks, header);
  if (!jwk) {
    return {
      payload: null,
      detail: `${joseDetail}; noble:no matching ec jwk`,
      verifier: "jose+noble",
      reason: "missing_public_key",
    };
  }

  const payload = decodeJwtPayload(token);
  if (!payload) {
    return {
      payload: null,
      detail: `${joseDetail}; noble:invalid payload`,
      verifier: "jose+noble",
      reason: "invalid_token_payload",
    };
  }

  try {
    const publicKey = uncompressedEcPublicKeyFromJwk(jwk);
    const signature = decodeBase64UrlToBytes(parts[2]);
    const signingInput = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);

    let verified = false;
    switch (header.alg) {
      case "ES256":
        verified = p256.verify(signature, signingInput, publicKey, { lowS: false });
        break;
      case "ES384":
        verified = p384.verify(signature, signingInput, publicKey, { lowS: false });
        break;
      case "ES512":
        verified = p521.verify(signature, signingInput, publicKey, { lowS: false });
        break;
      default:
        return null;
    }

    if (!verified) {
      return {
        payload: null,
        detail: `${joseDetail}; noble:verify returned false`,
        verifier: "jose+noble",
        reason: "invalid_signature",
      };
    }

    const expectedIssuer = options.requiredIssuer || frontendApiUrl;
    if (payload.iss !== expectedIssuer) {
      return {
        payload: null,
        detail: `${joseDetail}; noble:issuer mismatch`,
        verifier: "jose+noble",
        reason: "invalid_issuer",
      };
    }

    const now = Math.floor(Date.now() / 1000);
    const skewSeconds = Math.floor((options.clockSkewInMs || 0) / 1000);
    if (payload.exp && payload.exp < now - skewSeconds) {
      return {
        payload: null,
        detail: `${joseDetail}; noble:expired token`,
        verifier: "jose+noble",
        reason: "invalid_time_claims",
      };
    }
    if (payload.nbf && payload.nbf > now + skewSeconds) {
      return {
        payload: null,
        detail: `${joseDetail}; noble:not before in future`,
        verifier: "jose+noble",
        reason: "invalid_time_claims",
      };
    }

    return {
      payload,
      detail: `${joseDetail}; noble:fallback verified`,
      verifier: "noble",
      reason: null,
    };
  } catch (error) {
    return {
      payload: null,
      detail: `${joseDetail}; noble:${sanitizeErrorDetail(error)}`,
      verifier: "jose+noble",
      reason: "invalid_signature",
    };
  }
}

function classifyVerifyError(error: unknown): VerifyAuthTokenReason {
  if (error instanceof errors.JWTExpired || error instanceof errors.JWTClaimValidationFailed) {
    return "invalid_time_claims";
  }

  if (error instanceof errors.JWTInvalid) {
    if (error.code === "ERR_JWT_CLAIM_VALIDATION_FAILED") {
      return "invalid_issuer";
    }
    return "invalid_token_payload";
  }

  if (
    error instanceof errors.JWSSignatureVerificationFailed ||
    error instanceof errors.JOSENotSupported ||
    error instanceof errors.JWKInvalid ||
    error instanceof errors.JWKSInvalid
  ) {
    return "invalid_signature";
  }

  if (
    error instanceof errors.JWKSNoMatchingKey ||
    error instanceof errors.JWKSMultipleMatchingKeys
  ) {
    return "missing_public_key";
  }

  return "unknown";
}

function createAuth(
  payload: JWTPayload | null,
  options: WachtServerOptions,
): WachtAuth {
  const organizationPermissions =
    payload?.organization_permissions ||
    payload?.permissions?.organization ||
    [];
  const workspacePermissions =
    payload?.workspace_permissions || payload?.permissions?.workspace || [];

  return {
    userId: payload?.sub || null,
    sessionId: payload?.sid || payload?.sess || null,
    organizationId: payload?.organization || null,
    workspaceId: payload?.workspace || null,
    organizationPermissions,
    workspacePermissions,
    protect: async (protectOptions?: ProtectOptions) => {
      if (!payload?.sub) {
        throw new WachtAuthError(
          "unauthenticated",
          401,
          "Unauthorized",
          protectOptions?.redirectUrl
            ? { redirectUrl: protectOptions.redirectUrl }
            : undefined,
        );
      }

      if (
        protectOptions?.organizationId &&
        payload.organization !== protectOptions.organizationId
      ) {
        throw new WachtAuthError("forbidden", 403, "Forbidden");
      }

      if (
        protectOptions?.workspaceId &&
        payload.workspace !== protectOptions.workspaceId
      ) {
        throw new WachtAuthError("forbidden", 403, "Forbidden");
      }

      if (protectOptions?.permission) {
        const required = Array.isArray(protectOptions.permission)
          ? protectOptions.permission
          : [protectOptions.permission];

        const hasPermission = required.some((permission) => {
          if (organizationPermissions.includes(permission)) return true;
          if (workspacePermissions.includes(permission)) return true;
          return false;
        });

        if (!hasPermission) {
          throw new WachtAuthError("forbidden", 403, "Forbidden");
        }
      }
    },
    has: (check: PermissionCheck) => {
      if (!payload?.sub) return false;
      if (check.organizationId && payload.organization !== check.organizationId)
        return false;
      if (check.workspaceId && payload.workspace !== check.workspaceId)
        return false;
      if (!check.permission) return true;

      const required = Array.isArray(check.permission)
        ? check.permission
        : [check.permission];
      return required.some((permission) => {
        if (organizationPermissions.includes(permission)) return true;
        if (workspacePermissions.includes(permission)) return true;
        return false;
      });
    },
  };
}

export function toSessionPrincipalIdentity(
  auth: Pick<
    WachtAuth,
    "userId" | "sessionId" | "organizationId" | "workspaceId"
  >,
): SessionPrincipalIdentity | null {
  if (!auth.userId) return null;
  return {
    principal_type: "session_token",
    user_id: auth.userId,
    session_id: auth.sessionId,
    organization_id: auth.organizationId,
    workspace_id: auth.workspaceId,
  };
}

export function toSessionPrincipalMetadata(
  auth: Pick<
    WachtAuth,
    "userId" | "organizationPermissions" | "workspacePermissions"
  >,
): SessionPrincipalMetadata | null {
  if (!auth.userId) return null;
  const permissionsChecked = Array.from(
    new Set([...auth.organizationPermissions, ...auth.workspacePermissions]),
  );
  return {
    principal_type: "session_token",
    permissions_checked: permissionsChecked,
    organization_permissions: auth.organizationPermissions,
    workspace_permissions: auth.workspacePermissions,
    scopes: [],
    resource: null,
    expires_at: null,
  };
}

export async function exchangeSessionForAuthToken(
  sessionToken: string,
  options: WachtServerOptions = {},
  isDevSession = false,
): Promise<{
  authToken: string | null;
  nextDevSession: string | null;
  upstreamSessionSetCookie: string | null;
}> {
  const frontendApiUrl = getFrontendApiUrl(options);
  const endpoint = new URL(`${frontendApiUrl}/session/token`);
  const headers = new Headers({ Accept: "application/json" });

  if (isDevSession) {
    endpoint.searchParams.set("__dev_session__", sessionToken);
  } else {
    const sessionCookieName = options.sessionCookieName || "__session";
    headers.set("Cookie", `${sessionCookieName}=${sessionToken}`);
  }

  const response = await fetch(endpoint.toString(), {
    method: "GET",
    headers,
    credentials: "omit",
  });

  if (!response.ok) {
    return {
      authToken: null,
      nextDevSession: null,
      upstreamSessionSetCookie: response.headers.get("set-cookie"),
    };
  }

  const json = (await response.json()) as { data?: { token?: string } };
  return {
    authToken: json?.data?.token || null,
    nextDevSession: response.headers.get("x-development-session"),
    upstreamSessionSetCookie: response.headers.get("set-cookie"),
  };
}

async function verifyAuthTokenDetailed(
  token: string,
  options: WachtServerOptions = {},
): Promise<{
  payload: JWTPayload | null;
  reason: VerifyAuthTokenReason | null;
  detail: string | null;
  verifier: string | null;
  tokenIssuer: string | null;
  expectedIssuer: string | null;
  tokenAlgorithm: string | null;
  frontendApiUrl: string | null;
}> {
  const frontendApiUrl = getFrontendApiUrl(options);
  const header = decodeJwtHeader(token);
  const rawPayload = decodeJwtPayload(token);
  const tokenIssuer = rawPayload?.iss || null;
  const expectedIssuer = options.requiredIssuer || frontendApiUrl;
  const tokenAlgorithm = header?.alg || null;

  const signature = await verifyJwtSignature(token, frontendApiUrl, options);
  if (!signature.payload) {
    return {
      payload: null,
      reason: signature.reason || "invalid_signature",
      detail: signature.detail,
      verifier: signature.verifier,
      tokenIssuer,
      expectedIssuer,
      tokenAlgorithm,
      frontendApiUrl,
    };
  }

  return {
    payload: signature.payload,
    reason: null,
    detail: signature.detail,
    verifier: signature.verifier,
    tokenIssuer,
    expectedIssuer,
    tokenAlgorithm,
    frontendApiUrl,
  };
}

export async function verifyAuthToken(
  token: string,
  options: WachtServerOptions = {},
): Promise<JWTPayload | null> {
  const result = await verifyAuthTokenDetailed(token, options);
  return result.payload;
}

export async function getAuthFromToken(
  token: string | null | undefined,
  options: WachtServerOptions = {},
): Promise<WachtAuth> {
  if (!token) return createAuth(null, options);
  const payload = await verifyAuthToken(token, options);
  return createAuth(payload, options);
}

export async function getAuth(
  request: Request,
  options: WachtServerOptions = {},
): Promise<WachtAuth> {
  const token = getTokenFromAuthorizationHeader(request);
  const payload = token ? await verifyAuthToken(token, options) : null;
  return createAuth(payload, options);
}

export async function authenticateRequest(
  request: Request,
  options: WachtServerOptions = {},
): Promise<{ auth: WachtAuth; headers: Headers }> {
  const auth = await getAuth(request, options);
  const headers = new Headers();

  headers.set(
    AUTH_HEADER,
    JSON.stringify({
      userId: auth.userId,
      sessionId: auth.sessionId,
      organizationId: auth.organizationId,
      workspaceId: auth.workspaceId,
      organizationPermissions: auth.organizationPermissions,
      workspacePermissions: auth.workspacePermissions,
    }),
  );
  return { auth, headers };
}

export function authFromHeaders(headers: Headers): WachtAuth {
  const authHeader = headers.get(AUTH_HEADER);
  if (!authHeader) {
    return {
      userId: null,
      sessionId: null,
      organizationId: null,
      workspaceId: null,
      organizationPermissions: [],
      workspacePermissions: [],
      protect: async () => {
        throw new Error("Cannot use protect() in this context.");
      },
      has: () => false,
    };
  }

  const authData = JSON.parse(authHeader) as Omit<WachtAuth, "protect" | "has">;

  return {
    ...authData,
    protect: async () => {
      throw new Error("Cannot use protect() in this context.");
    },
    has: (check: PermissionCheck) => {
      if (!authData.userId) return false;
      if (
        check.organizationId &&
        authData.organizationId !== check.organizationId
      )
        return false;
      if (check.workspaceId && authData.workspaceId !== check.workspaceId)
        return false;
      if (!check.permission) return true;

      const requiredPermissions = Array.isArray(check.permission)
        ? check.permission
        : [check.permission];
      return requiredPermissions.some((permission) => {
        if (authData.organizationPermissions?.includes(permission)) return true;
        if (authData.workspacePermissions?.includes(permission)) return true;
        return false;
      });
    },
  };
}
