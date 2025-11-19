import { getClient } from '../client';
import {
    AiWorkflow,
    CreateAiWorkflowRequest,
    UpdateAiWorkflowRequest,
    WorkflowListResponse,
    ListWorkflowsOptions,
} from '../models/workflow';

/**
 * List all AI workflows
 */
export async function fetchWorkflows(
    options?: ListWorkflowsOptions
): Promise<WorkflowListResponse> {
    const client = getClient();
    const response = await client.get<WorkflowListResponse>('/ai-workflows', {
        params: options,
    });
    return response.data;
}

/**
 * Create a new AI workflow
 */
export async function createWorkflow(
    request: CreateAiWorkflowRequest
): Promise<AiWorkflow> {
    const client = getClient();
    const response = await client.post<AiWorkflow>('/ai-workflows', request);
    return response.data;
}

/**
 * Get a specific AI workflow by ID
 */
export async function fetchWorkflow(workflowId: string): Promise<AiWorkflow> {
    const client = getClient();
    const response = await client.get<AiWorkflow>(`/ai-workflows/${workflowId}`);
    return response.data;
}

/**
 * Update an AI workflow
 */
export async function updateWorkflow(
    workflowId: string,
    request: UpdateAiWorkflowRequest
): Promise<AiWorkflow> {
    const client = getClient();
    const response = await client.patch<AiWorkflow>(
        `/ai-workflows/${workflowId}`,
        request
    );
    return response.data;
}

/**
 * Delete an AI workflow
 */
export async function deleteWorkflow(workflowId: string): Promise<void> {
    const client = getClient();
    await client.delete(`/ai-workflows/${workflowId}`);
}
