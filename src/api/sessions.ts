import {
    getClient,
    type WachtClient,
} from "../client";
import type {
    CreateSessionTicketRequest,
    SessionTicketResponse,
} from "../models/user";

/**
 * Create a session ticket for access to varied apps and components.
 */
export async function createSessionTicket(
    request: CreateSessionTicketRequest,
    client?: WachtClient,
): Promise<SessionTicketResponse> {
    const sdkClient = client ?? getClient();
    return sdkClient.post<SessionTicketResponse>("/session/tickets", request);
}
