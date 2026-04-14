/**
 * AI Agent model
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

export interface AiAgentWithDetails extends AiAgent {
  tools_count: number;
  knowledge_bases_count: number;
  sub_agents?: string[];
}

export interface AgentDetailsResponse extends AiAgentWithDetails {
  tools: Array<Record<string, unknown>>;
  knowledge_bases: Array<Record<string, unknown>>;
}

export type SkillScope = "system" | "agent";

export interface SkillTreeEntry {
  name: string;
  path: string;
  kind: string;
  size_bytes?: number;
}

export interface SkillTreeResponse {
  scope: SkillScope;
  path: string;
  entries: SkillTreeEntry[];
}

export interface SkillFileResponse {
  scope: SkillScope;
  path: string;
  is_text: boolean;
  size_bytes: number;
  content?: string;
  content_base64?: string;
}

export interface CreateAiAgentRequest {
  name: string;
  description?: string;
  configuration?: Record<string, unknown>;
  tool_ids?: string[];
  knowledge_base_ids?: string[];
  sub_agents?: string[];
}

export interface UpdateAiAgentRequest {
  name?: string;
  description?: string;
  status?: string;
  configuration?: Record<string, unknown>;
  tool_ids?: string[];
  knowledge_base_ids?: string[];
  sub_agents?: string[];
}

export interface AiTool {
  id: string;
  name: string;
  description?: string;
  deployment_id: string;
  tool_type: AiToolType;
  requires_user_approval: boolean;
  configuration: AiToolConfiguration;
  created_at: string;
  updated_at: string;
}

export interface AiToolWithDetails extends AiTool {}

export type AiToolType =
  | "api"
  | "platform_event"
  | "code_runner"
  | "internal"
  | "use_external_service";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface SchemaField {
  name?: string;
  field_type?: string;
  required?: boolean;
  title?: string;
  description?: string;
  enum_values?: unknown[];
  format?: string;
  minimum?: number;
  maximum?: number;
  items_type?: string;
  items_schema?: SchemaField;
  min_items?: number;
  max_items?: number;
  properties?: SchemaField[];
}

export interface AuthorizationConfiguration {
  authorize_as_user: boolean;
  jwt_template_id?: string;
  custom_headers?: SchemaField[];
}

export interface ApiToolConfiguration {
  type: "api";
  endpoint: string;
  method?: HttpMethod;
  authorization?: AuthorizationConfiguration;
  request_body_schema?: SchemaField[];
  url_params_schema?: SchemaField[];
  timeout_seconds?: number;
}

export interface PlatformEventToolConfiguration {
  type: "platform_event";
  event_label: string;
  event_data?: Record<string, unknown>;
}

export interface CodeRunnerEnvVariable {
  name: string;
  value: string;
}

export interface CodeRunnerToolConfiguration {
  type: "code_runner";
  runtime?: "python";
  code: string;
  input_schema?: SchemaField[];
  output_schema?: SchemaField[];
  env_variables?: CodeRunnerEnvVariable[];
  timeout_seconds?: number;
  allow_network?: boolean;
}

export interface InternalToolConfiguration {
  type: "internal";
  tool_type: string;
  input_schema?: SchemaField[];
}

export interface UseExternalServiceToolConfiguration {
  type: "use_external_service";
  service_type: string;
  input_schema?: SchemaField[];
}

export type AiToolConfiguration =
  | ApiToolConfiguration
  | PlatformEventToolConfiguration
  | CodeRunnerToolConfiguration
  | InternalToolConfiguration
  | UseExternalServiceToolConfiguration;

export interface CreateAiToolRequest {
  name: string;
  description?: string;
  tool_type: string;
  requires_user_approval?: boolean;
  configuration: AiToolConfiguration;
}

export interface UpdateAiToolRequest {
  name?: string;
  description?: string;
  tool_type?: string;
  requires_user_approval?: boolean;
  configuration?: AiToolConfiguration;
}

export interface AiKnowledgeBase {
  id: string;
  name: string;
  description?: string;
  deployment_id: string;
  configuration: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AiKnowledgeBaseWithDetails extends AiKnowledgeBase {
  documents_count: number;
  total_size: number;
}

export interface KnowledgeBaseListResponse {
  data: AiKnowledgeBaseWithDetails[];
  has_more: boolean;
}

export interface CreateAiKnowledgeBaseRequest {
  name: string;
  description?: string;
  configuration?: Record<string, unknown>;
}

export interface UpdateAiKnowledgeBaseRequest {
  name?: string;
  description?: string;
  configuration?: Record<string, unknown>;
}

export interface AiKnowledgeBaseDocument {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description?: string;
  file_name: string;
  file_size: number;
  file_type: string;
  storage_object_key: string;
  knowledge_base_id: string;
  processing_metadata?: Record<string, unknown>;
}

export interface McpTokenAuthConfig {
  type: "token";
  auth_token: string;
}

export interface McpOAuthClientCredentialsAuthConfig {
  type: "oauth_client_credentials";
  client_id: string;
  client_secret: string;
  token_url?: string;
  scopes?: string[];
}

export interface McpOAuthAuthorizationCodePublicPkceAuthConfig {
  type: "oauth_authorization_code_public_pkce";
  client_id?: string;
  auth_url?: string;
  token_url?: string;
  register_url?: string;
  scopes?: string[];
  resource?: string;
}

export interface McpOAuthAuthorizationCodeConfidentialPkceAuthConfig {
  type: "oauth_authorization_code_confidential_pkce";
  client_id: string;
  client_secret: string;
  auth_url?: string;
  token_url?: string;
  scopes?: string[];
  resource?: string;
}

export type McpAuthConfig =
  | McpTokenAuthConfig
  | McpOAuthClientCredentialsAuthConfig
  | McpOAuthAuthorizationCodePublicPkceAuthConfig
  | McpOAuthAuthorizationCodeConfidentialPkceAuthConfig;

export interface McpServerConfig {
  endpoint: string;
  auth?: McpAuthConfig;
  headers?: Record<string, string>;
}

export interface McpServer {
  id: string;
  created_at: string;
  updated_at: string;
  deployment_id: string;
  name: string;
  config: McpServerConfig;
}

export interface CreateMcpServerRequest {
  name: string;
  config: McpServerConfig;
}

export interface UpdateMcpServerRequest {
  name?: string;
  config?: McpServerConfig;
}

export interface McpServerDiscoveryResponse {
  requires_auth: boolean;
  recommended_auth_mode?: string;
  token_url?: string;
  auth_url?: string;
  register_url?: string;
  resource_metadata_url?: string;
  resource?: string;
  scopes?: string[];
  token_endpoint_auth_methods_supported?: string[];
  authorization_servers?: string[];
  message: string;
}

export interface McpServerCreateResponse extends McpServer {
  discovery_result: McpServerDiscoveryResponse;
}

export interface DiscoverMcpServerAuthRequest {
  endpoint: string;
}

export interface ActorProject {
  id: string;
  deployment_id: string;
  actor_id: string;
  name: string;
  description?: string;
  status: string;
  coordinator_thread_id?: string;
  review_thread_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  archived_at?: string;
}

export interface CreateActorProjectRequest {
  name: string;
  agent_id?: string;
  description?: string;
  status?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateActorProjectRequest {
  name?: string;
  description?: string;
  status?: string;
}

export interface AgentThread {
  id: string;
  deployment_id: string;
  actor_id: string;
  project_id: string;
  title: string;
  thread_kind: string;
  thread_visibility: string;
  thread_purpose: string;
  responsibility?: string;
  reusable: boolean;
  accepts_assignments: boolean;
  capability_tags: string[];
  status: string;
  system_instructions?: string;
  last_activity_at: string;
  completed_at?: string;
  execution_state?: Record<string, unknown>;
  next_event_sequence?: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  archived_at?: string;
}

export interface CreateAgentThreadRequest {
  title: string;
  agent_id?: string;
  system_instructions?: string;
  thread_purpose?: string;
  responsibility?: string;
  reusable?: boolean;
  accepts_assignments?: boolean;
  capability_tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateAgentThreadRequest {
  title?: string;
  agent_id?: string;
  system_instructions?: string;
}

export interface ProjectTaskBoard {
  id: string;
  deployment_id: string;
  actor_id: string;
  project_id: string;
  title: string;
  status: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  archived_at?: string;
}

export interface ProjectTaskBoardItem {
  id: string;
  board_id: string;
  task_key: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assigned_thread_id?: string;
  metadata?: Record<string, unknown>;
  completed_at?: string;
  archived_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectTaskBoardItemRequest {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
}

export interface UpdateProjectTaskBoardItemRequest {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
}

export interface ProjectTaskBoardAssignmentTarget {
  thread_id?: string;
  responsibility?: string;
  capability_tags?: string[];
}

export interface ProjectTaskBoardAssignmentMetadata {
  requested_target?: ProjectTaskBoardAssignmentTarget;
  [key: string]: unknown;
}

export interface ProjectTaskBoardItemEvent {
  id: string;
  board_item_id: string;
  thread_id?: string;
  execution_run_id?: string;
  event_type: string;
  summary: string;
  body_markdown?: string;
  details?: Record<string, unknown>;
  created_at: string;
}

export interface AppendProjectTaskBoardItemJournalRequest {
  summary: string;
  details?: string;
  body_markdown?: string;
  attachments?: unknown;
}

export interface ProjectTaskBoardItemAssignment {
  id: string;
  board_item_id: string;
  thread_id: string;
  assignment_role: string;
  assignment_order: number;
  status: string;
  instructions?: string;
  handoff_file_path?: string;
  metadata?: ProjectTaskBoardAssignmentMetadata;
  result_status?: string;
  result_summary?: string;
  result_payload?: Record<string, unknown>;
  claimed_at?: string;
  started_at?: string;
  completed_at?: string;
  rejected_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ThreadEvent {
  id: string;
  deployment_id: string;
  thread_id: string;
  board_item_id?: string;
  event_type: string;
  status: string;
  priority: number;
  payload?: Record<string, unknown>;
  available_at: string;
  claimed_at?: string;
  completed_at?: string;
  failed_at?: string;
  caused_by_conversation_id?: string;
  caused_by_run_id?: string;
  caused_by_thread_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationRecord {
  id: string;
  thread_id: string;
  execution_run_id?: string;
  timestamp: string;
  content: Record<string, unknown>;
  message_type: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, unknown>;
}

export interface ThreadMessagesResponse {
  data: ConversationRecord[];
  has_more: boolean;
}

export interface ThreadTaskGraph {
  id: string;
  deployment_id: string;
  thread_id: string;
  board_item_id?: string;
  version: number;
  status: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ThreadTaskNode {
  id: string;
  graph_id: string;
  board_item_id?: string;
  title: string;
  description?: string;
  status: string;
  priority: number;
  owner_agent_id?: string;
  assigned_thread_id?: string;
  retry_count: number;
  max_retries: number;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: Record<string, unknown>;
  lease_owner?: string;
  lease_until?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ThreadTaskEdge {
  graph_id: string;
  from_node_id: string;
  to_node_id: string;
  dependency_type: string;
  created_at: string;
}

export interface ThreadTaskGraphSummary {
  graph_id: string;
  graph_status: string;
  total_nodes: number;
  pending_nodes: number;
  ready_nodes: number;
  in_progress_nodes: number;
  completed_nodes: number;
  failed_nodes: number;
  cancelled_nodes: number;
  progress_percent: number;
}

export interface TaskWorkspaceFileEntry {
  path: string;
  name: string;
  is_dir: boolean;
  size_bytes?: number;
  modified_at?: string;
}

export interface TaskWorkspaceListing {
  exists: boolean;
  files: TaskWorkspaceFileEntry[];
}

export interface TaskWorkspaceFileContent {
  path: string;
  name: string;
  mime_type: string;
  is_text: boolean;
  size_bytes: number;
  truncated: boolean;
  content?: string;
  content_base64?: string;
}

export interface BinaryFileResponse {
  data: Uint8Array;
  mime_type?: string;
  file_name?: string;
}

export interface ActorMcpServerSummary {
  id: string;
  name: string;
  endpoint: string;
  auth_type: string;
  requires_user_connection: boolean;
  connection_status: string;
  connected_at?: string;
  expires_at?: string;
}

export interface ActorMcpServerConnectResponse {
  auth_url: string;
}

export interface CursorPage<T> {
  data: T[];
  limit: number;
  has_more: boolean;
  next_cursor?: string;
}

export interface ExecuteAgentRequest {
  agent_id?: string;
  execution_type: {
    new_message?: {
      message: string;
      files?: Array<{
        filename: string;
        mime_type: string;
        data: string;
      }>;
    };
    approval_response?: {
      request_message_id: string;
      approvals: Array<{
        tool_name: string;
        mode: string;
      }>;
    };
    cancel?: Record<string, never>;
  };
}

export interface ExecuteAgentResponse {
  status: string;
  conversation_id?: string;
}

export type DeploymentLlmProvider = "gemini" | "openai" | "openrouter";
export type DeploymentStorageProvider = "s3";

export interface DeploymentStorageSettingsResponse {
  provider: DeploymentStorageProvider;
  bucket?: string;
  region?: string;
  endpoint?: string;
  root_prefix?: string;
  force_path_style: boolean;
  access_key_id_set: boolean;
  secret_access_key_set: boolean;
}

export interface UpdateDeploymentStorageSettingsRequest {
  provider?: DeploymentStorageProvider;
  bucket?: string;
  region?: string;
  endpoint?: string;
  root_prefix?: string;
  force_path_style?: boolean;
  access_key_id?: string;
  secret_access_key?: string;
}

export interface AiSettings {
  strong_llm_provider: DeploymentLlmProvider;
  weak_llm_provider: DeploymentLlmProvider;
  gemini_api_key_set: boolean;
  openrouter_api_key_set: boolean;
  openrouter_require_parameters: boolean;
  openai_api_key_set: boolean;
  anthropic_api_key_set: boolean;
  strong_model?: string;
  weak_model?: string;
  storage: DeploymentStorageSettingsResponse;
}

export interface UpdateAiSettingsRequest {
  strong_llm_provider?: DeploymentLlmProvider;
  weak_llm_provider?: DeploymentLlmProvider;
  gemini_api_key?: string;
  openrouter_api_key?: string;
  openrouter_require_parameters?: boolean;
  openai_api_key?: string;
  anthropic_api_key?: string;
  strong_model?: string;
  weak_model?: string;
  storage?: UpdateDeploymentStorageSettingsRequest;
}
