import { getClient, getConfig } from '../client';
import {
    AiAgent,
    CreateAiAgentRequest,
    UpdateAiAgentRequest,
    GenerateAgentContextTokenRequest,
    AgentListResponse,
    ListAgentsOptions,
} from '../models/agent';
import { GenerateTokenResponse } from '../models/deployment';

/**
 * List all AI agents with optional filtering
 */
export async function fetchAgents(options?: ListAgentsOptions): Promise<AgentListResponse> {
    const client = getClient();
    const response = await client.get<AgentListResponse>('/ai-agents', {
        params: options,
    });
    return response.data;
}

/**
 * Get a specific AI agent by ID
 */
export async function fetchAgent(agentId: string): Promise<AiAgent> {
    const client = getClient();
    const response = await client.get<AiAgent>(`/ai-agents/${agentId}`);
    return response.data;
}

/**
 * Create a new AI agent
 */
export async function createAgent(request: CreateAiAgentRequest): Promise<AiAgent> {
    const client = getClient();
    const response = await client.post<AiAgent>('/ai-agents', request);
    return response.data;
}

/**
 * Update an existing AI agent
 */
export async function updateAgent(agentId: string, request: UpdateAiAgentRequest): Promise<AiAgent> {
    const client = getClient();
    const response = await client.patch<AiAgent>(`/ai-agents/${agentId}`, request);
    return response.data;
}

/**
 * Delete an AI agent
 */
export async function deleteAgent(agentId: string): Promise<void> {
    const client = getClient();
    await client.delete(`/ai-agents/${agentId}`);
}

/**
 * Generate Agent Context Token
 */
export async function generateAgentContextToken(
    request: GenerateAgentContextTokenRequest
): Promise<GenerateTokenResponse> {
    const client = getClient();
    const response = await client.post<GenerateTokenResponse>(
        '/token/agent',
        request
    );
    return response.data;
}
