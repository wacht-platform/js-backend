import { getClient, type PaginatedResponse, type ListOptions } from '../client';
import type {
  AiAgent,
  CreateAiAgentRequest,
  UpdateAiAgentRequest,
  AiTool,
  CreateAiToolRequest,
  UpdateAiToolRequest,
  AiKnowledgeBase,
  CreateAiKnowledgeBaseRequest,
  UpdateAiKnowledgeBaseRequest,
  AiExecutionContext,
  CreateAiExecutionContextRequest,
  UpdateAiExecutionContextRequest,
  AgentIntegration,
  CreateAgentIntegrationRequest,
  UpdateAgentIntegrationRequest,
  AiKnowledgeBaseDocument,
  ExecuteAgentRequest,
  ExecuteAgentResponse,
} from '../models';

/**
 * List AI agents
 */
export async function listAgents(
  options?: ListOptions
): Promise<PaginatedResponse<AiAgent>> {
  const client = getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : '';
  return client.get<PaginatedResponse<AiAgent>>(`/ai/agents${params}`);
}

/**
 * Get an AI agent
 */
export async function getAgent(agentId: string): Promise<AiAgent> {
  const client = getClient();
  return client.get<AiAgent>(`/ai/agents/${agentId}`);
}

/**
 * Create an AI agent
 */
export async function createAgent(
  request: CreateAiAgentRequest
): Promise<AiAgent> {
  const client = getClient();
  return client.post<AiAgent>('/ai/agents', request);
}

/**
 * Update an AI agent
 */
export async function updateAgent(
  agentId: string,
  request: UpdateAiAgentRequest
): Promise<AiAgent> {
  const client = getClient();
  return client.patch<AiAgent>(`/ai/agents/${agentId}`, request);
}

/**
 * Delete an AI agent
 */
export async function deleteAgent(agentId: string): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/ai/agents/${agentId}`);
}

/**
 * Execute an agent
 */
export async function executeAgent(
  agentName: string,
  request: {
    execution_type: 'new_message' | 'user_input_response' | 'platform_function_result';
    message?: string;
    execution_id?: string;
    result?: unknown;
    files?: Array<{ name: string; content: string; type: string }>;
  }
): Promise<{ status: string }> {
  const client = getClient();
  return client.post<{ status: string }>(
    `/ai/agents/${agentName}/execute`,
    request
  );
}

/**
 * List AI tools
 */
export async function listTools(
  options?: ListOptions
): Promise<PaginatedResponse<AiTool>> {
  const client = getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : '';
  return client.get<PaginatedResponse<AiTool>>(`/ai/tools${params}`);
}

/**
 * Get an AI tool
 */
export async function getTool(toolId: string): Promise<AiTool> {
  const client = getClient();
  return client.get<AiTool>(`/ai/tools/${toolId}`);
}

/**
 * Create an AI tool
 */
export async function createTool(
  request: CreateAiToolRequest
): Promise<AiTool> {
  const client = getClient();
  return client.post<AiTool>('/ai/tools', request);
}

/**
 * Update an AI tool
 */
export async function updateTool(
  toolId: string,
  request: UpdateAiToolRequest
): Promise<AiTool> {
  const client = getClient();
  return client.patch<AiTool>(`/ai/tools/${toolId}`, request);
}

/**
 * Delete an AI tool
 */
export async function deleteTool(toolId: string): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/ai/tools/${toolId}`);
}

/**
 * List AI knowledge bases
 */
export async function listKnowledgeBases(
  options?: ListOptions
): Promise<PaginatedResponse<AiKnowledgeBase>> {
  const client = getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : '';
  return client.get<PaginatedResponse<AiKnowledgeBase>>(
    `/ai/knowledge-bases${params}`
  );
}

/**
 * Get an AI knowledge base
 */
export async function getKnowledgeBase(
  kbId: string
): Promise<AiKnowledgeBase> {
  const client = getClient();
  return client.get<AiKnowledgeBase>(`/ai/knowledge-bases/${kbId}`);
}

/**
 * Create an AI knowledge base
 */
export async function createKnowledgeBase(
  request: CreateAiKnowledgeBaseRequest
): Promise<AiKnowledgeBase> {
  const client = getClient();
  return client.post<AiKnowledgeBase>('/ai/knowledge-bases', request);
}

/**
 * Update an AI knowledge base
 */
export async function updateKnowledgeBase(
  kbId: string,
  request: UpdateAiKnowledgeBaseRequest
): Promise<AiKnowledgeBase> {
  const client = getClient();
  return client.patch<AiKnowledgeBase>(
    `/ai/knowledge-bases/${kbId}`,
    request
  );
}

/**
 * Delete an AI knowledge base
 */
export async function deleteKnowledgeBase(kbId: string): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/ai/knowledge-bases/${kbId}`);
}

/**
 * List AI execution contexts
 */
export async function listExecutionContexts(
  options?: ListOptions
): Promise<PaginatedResponse<AiExecutionContext>> {
  const client = getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : '';
  return client.get<PaginatedResponse<AiExecutionContext>>(
    `/ai/execution-contexts${params}`
  );
}

/**
 * Create an AI execution context
 */
export async function createExecutionContext(
  request: CreateAiExecutionContextRequest
): Promise<AiExecutionContext> {
  const client = getClient();
  return client.post<AiExecutionContext>('/ai/execution-contexts', request);
}

/**
 * Update an AI execution context
 */
export async function updateExecutionContext(
  contextId: string,
  request: UpdateAiExecutionContextRequest
): Promise<AiExecutionContext> {
  const client = getClient();
  return client.patch<AiExecutionContext>(
    `/ai/execution-contexts/${contextId}`,
    request
  );
}

/**
 * Delete an AI execution context
 */
export async function deleteExecutionContext(
  contextId: string
): Promise<void> {
  const client = getClient();
  return client.delete<void>(`/ai/execution-contexts/${contextId}`);
}

// ============================================================
// Agent Integrations
// ============================================================

/**
 * List agent integrations for an agent
 */
export async function listAgentIntegrations(
  agentId: string,
  options?: ListOptions
): Promise<PaginatedResponse<AgentIntegration>> {
  const client = getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : '';
  return client.get<PaginatedResponse<AgentIntegration>>(
    `/ai/agents/${agentId}/integrations${params}`
  );
}

/**
 * Get an agent integration
 */
export async function getAgentIntegration(
  agentId: string,
  integrationId: string
): Promise<AgentIntegration> {
  const client = getClient();
  return client.get<AgentIntegration>(
    `/ai/agents/${agentId}/integrations/${integrationId}`
  );
}

/**
 * Create an agent integration
 */
export async function createAgentIntegration(
  agentId: string,
  request: CreateAgentIntegrationRequest
): Promise<AgentIntegration> {
  const client = getClient();
  return client.post<AgentIntegration>(
    `/ai/agents/${agentId}/integrations`,
    request
  );
}

/**
 * Update an agent integration
 */
export async function updateAgentIntegration(
  agentId: string,
  integrationId: string,
  request: UpdateAgentIntegrationRequest
): Promise<AgentIntegration> {
  const client = getClient();
  return client.patch<AgentIntegration>(
    `/ai/agents/${agentId}/integrations/${integrationId}`,
    request
  );
}

/**
 * Delete an agent integration
 */
export async function deleteAgentIntegration(
  agentId: string,
  integrationId: string
): Promise<void> {
  const client = getClient();
  return client.delete<void>(
    `/ai/agents/${agentId}/integrations/${integrationId}`
  );
}

// ============================================================
// Knowledge Base Documents
// ============================================================

/**
 * List documents in a knowledge base
 */
export async function listKnowledgeBaseDocuments(
  kbId: string,
  options?: { limit?: number; offset?: number }
): Promise<PaginatedResponse<AiKnowledgeBaseDocument>> {
  const client = getClient();
  const params =
    options && options.limit
      ? `?limit=${options.limit}&offset=${options.offset || 0}`
      : '';
  return client.get<PaginatedResponse<AiKnowledgeBaseDocument>>(
    `/ai/knowledge-bases/${kbId}/documents${params}`
  );
}

/**
 * Upload a document to a knowledge base
 */
export async function uploadKnowledgeBaseDocument(
  kbId: string,
  file: File,
  title?: string,
  description?: string
): Promise<AiKnowledgeBaseDocument> {
  const client = getClient();
  const formData = new FormData();
  formData.append('file', file);
  if (title) formData.append('title', title);
  if (description) formData.append('description', description);

  return client.post<AiKnowledgeBaseDocument>(
    `/ai/knowledge-bases/${kbId}/documents`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
}

/**
 * Delete a document from a knowledge base
 */
export async function deleteKnowledgeBaseDocument(
  kbId: string,
  documentId: string
): Promise<void> {
  const client = getClient();
  return client.delete<void>(
    `/ai/knowledge-bases/${kbId}/documents/${documentId}`
  );
}

// ============================================================
// Execute Agent
// ============================================================

/**
 * Execute an agent in an execution context
 */
export async function executeAgentInContext(
  contextId: string,
  request: ExecuteAgentRequest
): Promise<ExecuteAgentResponse> {
  const client = getClient();
  return client.post<ExecuteAgentResponse>(
    `/ai/execution-contexts/${contextId}/execute`,
    request
  );
}

// ============================================================
// AI Settings
// ============================================================

/**
 * Get AI settings
 */
export async function getAiSettings(): Promise<{
  enabled_models: string[];
  default_model: string;
}> {
  const client = getClient();
  return client.get<{ enabled_models: string[]; default_model: string }>(
    '/ai/settings'
  );
}

/**
 * Update AI settings
 */
export async function updateAiSettings(request: {
  enabled_models?: string[];
  default_model?: string;
}): Promise<{ enabled_models: string[]; default_model: string }> {
  const client = getClient();
  return client.put<{ enabled_models: string[]; default_model: string }>(
    '/ai/settings',
    request
  );
}

/**
 * Get agent details (extended information)
 */
export async function getAgentDetails(
  agentId: string
): Promise<AiAgent & { configuration?: Record<string, unknown> }> {
  const client = getClient();
  return client.get<AiAgent & { configuration?: Record<string, unknown> }>(
    `/ai/agents/${agentId}/details`
  );
}
