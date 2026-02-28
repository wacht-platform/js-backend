/**
 * AI Agent model
 * Generated from OpenAPI - matches Rust SDK exactly
 */
export interface AiAgent {
  id: string;
  name: string;
  description?: string;
  deployment_id: string;
  configuration: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * Request to create an AI agent
 */
export interface CreateAiAgentRequest {
  name: string;
  description?: string;
  configuration?: Record<string, unknown>;
}

/**
 * Request to update an AI agent
 */
export interface UpdateAiAgentRequest {
  name?: string;
  description?: string;
  status?: string; // "active" or "inactive"
  configuration?: Record<string, unknown>;
}

/**
 * AI Tool model
 */
export interface AiTool {
  id?: string;
  name?: string;
  description?: string;
  tool_type?: AiToolType;
  config?: Record<string, unknown>; // AiToolConfiguration is a discriminated union
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * AI Tool Type enum
 */
export type AiToolType = 'api' | 'platform_event' | 'platform_function' | 'internal' | 'use_external_service';

/**
 * Request to create an AI tool
 */
export interface CreateAiToolRequest {
  name: string;
  description?: string;
  tool_type: string;
  configuration: Record<string, unknown>; // AiToolConfiguration discriminated union
}

/**
 * Request to update an AI tool
 */
export interface UpdateAiToolRequest {
  name?: string;
  description?: string;
  tool_type?: string;
  configuration?: Record<string, unknown>; // AiToolConfiguration discriminated union
}

/**
 * AI Knowledge Base model
 */
export interface AiKnowledgeBase {
  id: string;
  name: string;
  description?: string;
  deployment_id: string;
  configuration: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * Request to create an AI knowledge base
 */
export interface CreateAiKnowledgeBaseRequest {
  name: string;
  description?: string;
  configuration?: Record<string, unknown>;
}

/**
 * Request to update an AI knowledge base
 */
export interface UpdateAiKnowledgeBaseRequest {
  name?: string;
  description?: string;
  configuration?: Record<string, unknown>;
}

/**
 * AI Execution Context model
 */
export type ExecutionContextStatus = 'idle' | 'running' | 'waiting_for_input' | 'interrupted' | 'completed' | 'failed';

export interface AiExecutionContext {
  id: string;
  created_at: string;
  updated_at: string;
  deployment_id: string;
  title: string;
  system_instructions?: string;
  context_group?: string;
  last_activity_at: string;
  completed_at?: string;
  execution_state?: Record<string, unknown>;
  status: ExecutionContextStatus;
  source?: string;
  external_context_id?: string;
  external_resource_metadata?: Record<string, unknown>;
}

/**
 * Request to create an AI execution context
 */
export interface CreateAiExecutionContextRequest {
  title?: string;
  system_instructions?: string;
  context_group?: string;
}

/**
 * Request to update an AI execution context
 */
export interface UpdateAiExecutionContextRequest {
  title?: string;
  system_instructions?: string;
  context_group?: string;
}

/**
 * Agent Integration model
 */
export interface AgentIntegration {
  id: string;
  created_at: string;
  updated_at: string;
  deployment_id: string;
  agent_id: string;
  integration_type: IntegrationType;
  name: string;
  config?: Record<string, unknown>;
  webhook_url?: string;
}

/**
 * Integration Type enum
 */
export type IntegrationType = 'teams' | 'slack' | 'whatsapp' | 'discord' | 'clickup';

/**
 * Request to create an agent integration
 */
export interface CreateAgentIntegrationRequest {
  integration_type: IntegrationType;
  name: string;
  config?: Record<string, unknown>;
}

/**
 * Request to update an agent integration
 */
export interface UpdateAgentIntegrationRequest {
  name?: string;
  config?: Record<string, unknown>;
}

/**
 * AI Knowledge Base Document model
 */
export interface AiKnowledgeBaseDocument {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description?: string;
  file_name: string;
  file_size: number;
  file_type: string;
  file_url: string;
  knowledge_base_id: string;
  processing_metadata?: Record<string, unknown>;
}

/**
 * Request to upload a document to knowledge base
 */
export interface UploadKnowledgeBaseDocumentRequest {
  file: File;
  title?: string;
  description?: string;
}

/**
 * Execute agent request
 */
export interface ExecuteAgentRequest {
  agent_name?: string;
  execution_type: {
    new_message?: {
      message: string;
      files?: Array<{
        filename: string;
        mime_type: string;
        data: string;
      }>;
    };
    user_input_response?: {
      message: string;
    };
    platform_function_result?: {
      execution_id: string;
      result: Record<string, unknown>;
    };
    cancel?: Record<string, never>;
  };
}

/**
 * Execute agent response
 */
export interface ExecuteAgentResponse {
  status: string;
  conversation_id?: string;
}
