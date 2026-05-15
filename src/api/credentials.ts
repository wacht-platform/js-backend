import { getClient, type WachtClient } from "../client";
import type { DeploymentCredentialsResponse } from "../models";

/**
 * Mint a fresh set of credentials for the current deployment — publishable key,
 * frontend/backend hosts, and a one-shot API key. The returned `api_key.secret`
 * is never retrievable again; persist it immediately on the caller side.
 *
 * Typically used by deployment bootstrap scripts and the `wacht` CLI; not
 * something an end-user backend should call on every request.
 */
export async function createDeploymentCredentials(
  client?: WachtClient,
): Promise<DeploymentCredentialsResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<DeploymentCredentialsResponse>("/credentials");
}
