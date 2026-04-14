import { compactVerify, importSPKI } from "jose";

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
}

const AUTH_HEADER = "x-wacht-auth";
const PUBLIC_KEY_CACHE_TTL_MS = 5 * 60 * 1000;
const publicKeyCache = new Map<string, { value: string; expiresAt: number }>();

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

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;
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

function pemToSpkiArrayBuffer(publicKeyPem: string): ArrayBuffer {
  const pemBody = publicKeyPem
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "")
    .replace(/\s+/g, "");
  const decoded = decodeBase64(pemBody);
  const bytes = Uint8Array.from(decoded, (char) => char.charCodeAt(0));
  return toArrayBuffer(bytes);
}

function trimLeadingZeros(bytes: Uint8Array): Uint8Array {
  let index = 0;
  while (index < bytes.length - 1 && bytes[index] === 0) {
    index += 1;
  }
  return bytes.subarray(index);
}

function joseToDerEcdsaSignature(signature: Uint8Array): Uint8Array {
  const half = Math.floor(signature.length / 2);
  const r = trimLeadingZeros(signature.subarray(0, half));
  const s = trimLeadingZeros(signature.subarray(half));

  const rNeedsPad = (r[0] & 0x80) !== 0;
  const sNeedsPad = (s[0] & 0x80) !== 0;

  const rLength = r.length + (rNeedsPad ? 1 : 0);
  const sLength = s.length + (sNeedsPad ? 1 : 0);
  const totalLength = 2 + rLength + 2 + sLength;

  const der = new Uint8Array(2 + totalLength);
  let offset = 0;
  der[offset++] = 0x30;
  der[offset++] = totalLength;
  der[offset++] = 0x02;
  der[offset++] = rLength;
  if (rNeedsPad) der[offset++] = 0x00;
  der.set(r, offset);
  offset += r.length;
  der[offset++] = 0x02;
  der[offset++] = sLength;
  if (sNeedsPad) der[offset++] = 0x00;
  der.set(s, offset);
  return der;
}

function resolveHashAlgorithm(alg: string): string {
  if (alg.endsWith("256")) return "SHA-256";
  if (alg.endsWith("384")) return "SHA-384";
  if (alg.endsWith("512")) return "SHA-512";
  return "SHA-256";
}

function getSubtleCrypto(): SubtleCrypto | null {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj?.subtle) {
    return cryptoObj.subtle;
  }
  return null;
}

async function verifyJwtSignature(
  token: string,
  publicKeyPem: string,
): Promise<JWTPayload | null> {
  const header = decodeJwtHeader(token);
  const payload = decodeJwtPayload(token);
  if (!header?.alg || !payload) return null;
  try {
    const key = await importSPKI(publicKeyPem, header.alg);
    await compactVerify(token, key, { algorithms: [header.alg] });
    return payload;
  } catch {
    return null;
  }
}

async function fetchPublicKeyPem(
  frontendApiUrl: string,
): Promise<string | null> {
  const cached = publicKeyCache.get(frontendApiUrl);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const response = await fetch(`${frontendApiUrl}/.well-known/jwk`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) return null;
  const body = (await response.json()) as { data?: { public_key?: string } };
  const publicKey = body?.data?.public_key;
  if (!publicKey) return null;

  publicKeyCache.set(frontendApiUrl, {
    value: publicKey,
    expiresAt: Date.now() + PUBLIC_KEY_CACHE_TTL_MS,
  });
  return publicKey;
}

function hasValidTimeClaims(
  payload: JWTPayload,
  options: WachtServerOptions,
): boolean {
  const now = Math.floor(Date.now() / 1000);
  const skewSeconds = Math.floor((options.clockSkewInMs || 0) / 1000);

  if (payload.exp && payload.exp < now - skewSeconds) {
    return false;
  }
  if (payload.nbf && payload.nbf > now + skewSeconds) {
    return false;
  }
  return true;
}

function hasValidIssuerClaim(
  payload: JWTPayload,
  frontendApiUrl: string,
  options: WachtServerOptions,
): boolean {
  const requiredIssuer = options.requiredIssuer || frontendApiUrl;
  if (!requiredIssuer) return true;
  if (!payload.iss) return false;
  return payload.iss === requiredIssuer;
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
    headers.set("Cookie", `${sessionCookieName}=${encodeURIComponent(sessionToken)}`);
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

export async function verifyAuthToken(
  token: string,
  options: WachtServerOptions = {},
): Promise<JWTPayload | null> {
  const frontendApiUrl = getFrontendApiUrl(options);

  const publicKeyPem = await fetchPublicKeyPem(frontendApiUrl);
  if (!publicKeyPem) {
    return null;
  }

  const payload = await verifyJwtSignature(token, publicKeyPem);
  if (!payload) {
    return null;
  }

  const timeValid = hasValidTimeClaims(payload, options);
  if (!timeValid) {
    return null;
  }

  const issuerValid = hasValidIssuerClaim(payload, frontendApiUrl, options);
  if (!issuerValid) {
    return null;
  }

  return payload;
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
