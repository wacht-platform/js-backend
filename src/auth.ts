import { getPublicSigningKey } from './client';
import * as jose from 'jose';

/**
 * Wacht JWT Claims interface.
 * Contains standard JWT claims and Wacht-specific claims.
 */
export interface WachtClaims extends jose.JWTPayload {
    iss?: string;
    sub?: string;
    aud?: string | string[];
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    sid?: string;
    organization?: string;
    workspace?: string;
    permissions?: {
        organization?: string[];
        workspace?: string[];
    };
    claims?: Record<string, any>;
    [key: string]: any;
}

/**
 * Verify and decode a Wacht JWT token.
 * If no public key is provided, uses the cached key from SDK initialization.
 *
 * @param token The JWT token string
 * @param publicKey The public key to verify against (optional, uses cached key if not provided)
 * @param options Optional verification options (issuer, audience, etc.)
 * @returns The decoded claims
 */
export async function verifyToken(
    token: string,
    options?: jose.JWTVerifyOptions
): Promise<WachtClaims> {
    // Use cached key if no explicit key provided
    let publicKey = getPublicSigningKey()!;

    try {
        let key: jose.KeyObject | jose.CryptoKey | Uint8Array;

        const header = jose.decodeProtectedHeader(token);
        const alg = header.alg;

        if (!alg) {
            throw new Error('Token header missing algorithm (alg)');
        }

        if (alg.startsWith('HS')) {
            key = new TextEncoder().encode(publicKey);
        } else {
            key = await jose.importSPKI(publicKey, alg);
        }


        const { payload } = await jose.jwtVerify(token, key, options);
        return payload as WachtClaims;
    } catch (error) {
        throw new Error(`Failed to verify token: ${error instanceof Error ? error.message : String(error)}`);
    }
}

/**
 * Decode a Wacht JWT token without verification.
 * Useful for inspecting claims before verification or on the client side (though this is a backend SDK).
 *
 * @param token The JWT token string
 * @returns The decoded claims
 */
export function decodeToken(token: string): WachtClaims {
    return jose.decodeJwt(token) as WachtClaims;
}
