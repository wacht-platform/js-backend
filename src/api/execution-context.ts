import { getClient } from '../client';
import {
    AiExecutionContext,
    CreateAiExecutionContextRequest,
    UpdateExecutionContextRequest,
    ExecutionContextListResponse,
    ListExecutionContextsOptions,
} from '../models/execution-context';

/**
 * Fetch all execution contexts for the current workspace
 */
export async function fetchExecutionContexts(
    options?: ListExecutionContextsOptions
): Promise<ExecutionContextListResponse> {
    const client = getClient();
    const response = await client.get<ExecutionContextListResponse>(
        '/ai-execution-context',
        { params: options }
    );
    return response.data;
}

/**
 * Fetch a specific execution context by ID
 */
export async function fetchExecutionContext(id: string): Promise<AiExecutionContext> {
    const client = getClient();
    const response = await client.get<AiExecutionContext>(`/ai-execution-context/${id}`);
    return response.data;
}

/**
 * Create a new execution context for AI operations
 */
export async function createExecutionContext(
    request: CreateAiExecutionContextRequest
): Promise<AiExecutionContext> {
    const client = getClient();
    const response = await client.post<AiExecutionContext>(
        '/ai-execution-context',
        request
    );
    return response.data;
}

/**
 * Update an existing execution context
 */
export async function updateExecutionContext(
    id: string,
    request: UpdateExecutionContextRequest
): Promise<AiExecutionContext> {
    const client = getClient();
    const response = await client.patch<AiExecutionContext>(
        `/ai-execution-context/${id}`,
        request
    );
    return response.data;
}

/**
 * Delete an execution context
 */
export async function deleteExecutionContext(id: string): Promise<void> {
    const client = getClient();
    await client.delete(`/ai-execution-context/${id}`);
}
