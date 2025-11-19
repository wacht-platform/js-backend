import { getClient } from '../client';
import {
    AiTool,
    CreateAiToolRequest,
    UpdateAiToolRequest,
    ToolListResponse,
    ListToolsOptions,
} from '../models/tool';

/**
 * List all AI tools
 */
export async function fetchTools(options?: ListToolsOptions): Promise<ToolListResponse> {
    const client = getClient();
    const response = await client.get<ToolListResponse>('/ai-tools', {
        params: options,
    });
    return response.data;
}

/**
 * Create a new AI tool
 */
export async function createTool(request: CreateAiToolRequest): Promise<AiTool> {
    const client = getClient();
    const response = await client.post<AiTool>('/ai-tools', request);
    return response.data;
}

/**
 * Get a specific AI tool by ID
 */
export async function fetchTool(toolId: string): Promise<AiTool> {
    const client = getClient();
    const response = await client.get<AiTool>(`/ai-tools/${toolId}`);
    return response.data;
}

/**
 * Update an AI tool
 */
export async function updateTool(
    toolId: string,
    request: UpdateAiToolRequest
): Promise<AiTool> {
    const client = getClient();
    const response = await client.patch<AiTool>(`/ai-tools/${toolId}`, request);
    return response.data;
}

/**
 * Delete an AI tool
 */
export async function deleteTool(toolId: string): Promise<void> {
    const client = getClient();
    await client.delete(`/ai-tools/${toolId}`);
}
