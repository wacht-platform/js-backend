import {
  getClient,
  type WachtClient,
  type PaginatedResponse,
  type ListOptions,
} from "../client";
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
} from "../models";

/**
 * List AI agents
 */
export async function listAgents(
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<AiAgent>> {
  const sdkClient = client ?? getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : "";
  return sdkClient.get<PaginatedResponse<AiAgent>>(`/ai/agents${params}`);
}

/**
 * Get an AI agent
 */
export async function getAgent(
  agentId: string,
  client?: WachtClient,
): Promise<AiAgent> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AiAgent>(`/ai/agents/${agentId}`);
}

/**
 * Create an AI agent
 */
export async function createAgent(
  request: CreateAiAgentRequest,
  client?: WachtClient,
): Promise<AiAgent> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AiAgent>("/ai/agents", request);
}

/**
 * Update an AI agent
 */
export async function updateAgent(
  agentId: string,
  request: UpdateAiAgentRequest,
  client?: WachtClient,
): Promise<AiAgent> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<AiAgent>(`/ai/agents/${agentId}`, request);
}

/**
 * Delete an AI agent
 */
export async function deleteAgent(
  agentId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/ai/agents/${agentId}`);
}

/**
 * Execute an agent
 */
export async function executeAgent(
  agentName: string,
  request: {
    execution_type:
      | "new_message"
      | "user_input_response"
      | "platform_function_result";
    message?: string;
    execution_id?: string;
    result?: unknown;
    files?: Array<{ name: string; content: string; type: string }>;
  },
  client?: WachtClient,
): Promise<{ status: string }> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<{ status: string }>(
    `/ai/agents/${agentName}/execute`,
    request,
  );
}

/**
 * List AI tools
 */
export async function listTools(
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<AiTool>> {
  const sdkClient = client ?? getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : "";
  return sdkClient.get<PaginatedResponse<AiTool>>(`/ai/tools${params}`);
}

/**
 * Get an AI tool
 */
export async function getTool(
  toolId: string,
  client?: WachtClient,
): Promise<AiTool> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AiTool>(`/ai/tools/${toolId}`);
}

/**
 * Create an AI tool
 */
export async function createTool(
  request: CreateAiToolRequest,
  client?: WachtClient,
): Promise<AiTool> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AiTool>("/ai/tools", request);
}

/**
 * Update an AI tool
 */
export async function updateTool(
  toolId: string,
  request: UpdateAiToolRequest,
  client?: WachtClient,
): Promise<AiTool> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<AiTool>(`/ai/tools/${toolId}`, request);
}

/**
 * Delete an AI tool
 */
export async function deleteTool(
  toolId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/ai/tools/${toolId}`);
}

/**
 * List AI knowledge bases
 */
export async function listKnowledgeBases(
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<AiKnowledgeBase>> {
  const sdkClient = client ?? getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : "";
  return sdkClient.get<PaginatedResponse<AiKnowledgeBase>>(
    `/ai/knowledge-bases${params}`,
  );
}

/**
 * Get an AI knowledge base
 */
export async function getKnowledgeBase(
  kbId: string,
  client?: WachtClient,
): Promise<AiKnowledgeBase> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AiKnowledgeBase>(`/ai/knowledge-bases/${kbId}`);
}

/**
 * Create an AI knowledge base
 */
export async function createKnowledgeBase(
  request: CreateAiKnowledgeBaseRequest,
  client?: WachtClient,
): Promise<AiKnowledgeBase> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AiKnowledgeBase>("/ai/knowledge-bases", request);
}

/**
 * Update an AI knowledge base
 */
export async function updateKnowledgeBase(
  kbId: string,
  request: UpdateAiKnowledgeBaseRequest,
  client?: WachtClient,
): Promise<AiKnowledgeBase> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<AiKnowledgeBase>(
    `/ai/knowledge-bases/${kbId}`,
    request,
  );
}

/**
 * Delete an AI knowledge base
 */
export async function deleteKnowledgeBase(
  kbId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/ai/knowledge-bases/${kbId}`);
}

/**
 * List AI execution contexts
 */
export async function listExecutionContexts(
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<AiExecutionContext>> {
  const sdkClient = client ?? getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : "";
  return sdkClient.get<PaginatedResponse<AiExecutionContext>>(
    `/ai/execution-contexts${params}`,
  );
}

/**
 * Create an AI execution context
 */
export async function createExecutionContext(
  request: CreateAiExecutionContextRequest,
  client?: WachtClient,
): Promise<AiExecutionContext> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AiExecutionContext>("/ai/execution-contexts", request);
}

/**
 * Update an AI execution context
 */
export async function updateExecutionContext(
  contextId: string,
  request: UpdateAiExecutionContextRequest,
  client?: WachtClient,
): Promise<AiExecutionContext> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<AiExecutionContext>(
    `/ai/execution-contexts/${contextId}`,
    request,
  );
}

/**
 * Delete an AI execution context
 */
export async function deleteExecutionContext(
  contextId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/ai/execution-contexts/${contextId}`);
}

// ============================================================
// Agent Integrations
// ============================================================

/**
 * List agent integrations for an agent
 */
export async function listAgentIntegrations(
  agentId: string,
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<AgentIntegration>> {
  const sdkClient = client ?? getClient();
  const params = options
    ? `?limit=${options.limit || 50}&offset=${options.offset || 0}`
    : "";
  return sdkClient.get<PaginatedResponse<AgentIntegration>>(
    `/ai/agents/${agentId}/integrations${params}`,
  );
}

/**
 * Get an agent integration
 */
export async function getAgentIntegration(
  agentId: string,
  integrationId: string,
  client?: WachtClient,
): Promise<AgentIntegration> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AgentIntegration>(
    `/ai/agents/${agentId}/integrations/${integrationId}`,
  );
}

/**
 * Create an agent integration
 */
export async function createAgentIntegration(
  agentId: string,
  request: CreateAgentIntegrationRequest,
  client?: WachtClient,
): Promise<AgentIntegration> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AgentIntegration>(
    `/ai/agents/${agentId}/integrations`,
    request,
  );
}

/**
 * Update an agent integration
 */
export async function updateAgentIntegration(
  agentId: string,
  integrationId: string,
  request: UpdateAgentIntegrationRequest,
  client?: WachtClient,
): Promise<AgentIntegration> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<AgentIntegration>(
    `/ai/agents/${agentId}/integrations/${integrationId}`,
    request,
  );
}

/**
 * Delete an agent integration
 */
export async function deleteAgentIntegration(
  agentId: string,
  integrationId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/ai/agents/${agentId}/integrations/${integrationId}`,
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
  options?: { limit?: number; offset?: number },
  client?: WachtClient,
): Promise<PaginatedResponse<AiKnowledgeBaseDocument>> {
  const sdkClient = client ?? getClient();
  const params =
    options && options.limit
      ? `?limit=${options.limit}&offset=${options.offset || 0}`
      : "";
  return sdkClient.get<PaginatedResponse<AiKnowledgeBaseDocument>>(
    `/ai/knowledge-bases/${kbId}/documents${params}`,
  );
}

/**
 * Upload a document to a knowledge base
 */
export async function uploadKnowledgeBaseDocument(
  kbId: string,
  file: File,
  title?: string,
  description?: string,
  client?: WachtClient,
): Promise<AiKnowledgeBaseDocument> {
  const sdkClient = client ?? getClient();
  const formData = new FormData();
  formData.append("file", file);
  if (title) formData.append("title", title);
  if (description) formData.append("description", description);

  return sdkClient.post<AiKnowledgeBaseDocument>(
    `/ai/knowledge-bases/${kbId}/documents`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}

/**
 * Delete a document from a knowledge base
 */
export async function deleteKnowledgeBaseDocument(
  kbId: string,
  documentId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/ai/knowledge-bases/${kbId}/documents/${documentId}`,
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
  request: ExecuteAgentRequest,
  client?: WachtClient,
): Promise<ExecuteAgentResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ExecuteAgentResponse>(
    `/ai/execution-contexts/${contextId}/execute`,
    request,
  );
}

// ============================================================
// AI Settings
// ============================================================

/**
 * Get AI settings
 */
export async function getAiSettings(client?: WachtClient): Promise<{
  enabled_models: string[];
  default_model: string;
}> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<{ enabled_models: string[]; default_model: string }>(
    "/ai/settings",
  );
}

/**
 * Update AI settings
 */
export async function updateAiSettings(
  request: {
    enabled_models?: string[];
    default_model?: string;
  },
  client?: WachtClient,
): Promise<{ enabled_models: string[]; default_model: string }> {
  const sdkClient = client ?? getClient();
  return sdkClient.put<{ enabled_models: string[]; default_model: string }>(
    "/ai/settings",
    request,
  );
}

/**
 * Get agent details (extended information)
 */
export async function getAgentDetails(
  agentId: string,
  client?: WachtClient,
): Promise<AiAgent & { configuration?: Record<string, unknown> }> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AiAgent & { configuration?: Record<string, unknown> }>(
    `/ai/agents/${agentId}/details`,
  );
}
