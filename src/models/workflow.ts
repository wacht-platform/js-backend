import { SchemaField } from './tool';

export interface AiWorkflow {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    description?: string;
    deployment_id: string;
    configuration: WorkflowConfiguration;
    workflow_definition: WorkflowDefinition;
}

export interface AiWorkflowWithDetails extends AiWorkflow {
    agents_count: number;
    last_execution_at?: string;
}

export interface WorkflowConfiguration {
    timeout_seconds?: number;
    max_retries?: number;
    retry_delay_seconds?: number;
}

export interface WorkflowDefinition {
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
    version: string;
}

export interface WorkflowNode {
    id: string;
    node_type: WorkflowNodeType;
    position: NodePosition;
    data: WorkflowNodeData;
}

export interface NodePosition {
    x: number;
    y: number;
}

export type WorkflowNodeType =
    | { type: 'Trigger' } & TriggerNodeConfig
    | { type: 'ErrorHandler' } & ErrorHandlerNodeConfig
    | { type: 'LLMCall' } & LLMCallNodeConfig
    | { type: 'Switch' } & SwitchNodeConfig
    | { type: 'ToolCall' } & ToolCallNodeConfig
    | { type: 'UserInput' } & UserInputNodeConfig;

export interface WorkflowNodeData {
    label: string;
    description?: string;
    enabled: boolean;
    config: any;
}

export interface WorkflowEdge {
    id: string;
    source: string;
    target: string;
    source_handle?: string;
    target_handle?: string;
}

export interface TriggerNodeConfig {
    description?: string;
    condition: string;
}

export interface ErrorHandlerNodeConfig {
    description?: string;
    enable_retry: boolean;
    max_retries: number;
    retry_delay_seconds: number;
    log_errors: boolean;
    custom_error_message?: string;
    contained_nodes: string[];
}

export interface LLMCallNodeConfig {
    description?: string;
    prompt_template: string;
    response_format: ResponseFormat;
    json_schema: SchemaField[];
}

export type ResponseFormat = 'text' | 'json';

export interface SwitchNodeConfig {
    description?: string;
    switch_condition: string;
    cases: SwitchCase[];
    default_case: boolean;
}

export interface SwitchCase {
    case_condition: string;
    case_label?: string;
}

export interface ToolCallNodeConfig {
    description?: string;
    tool_id: string;
    input_parameters: Record<string, any>;
}

export interface UserInputNodeConfig {
    description?: string;
    prompt: string;
    input_type: UserInputType;
    default_value?: string;
    placeholder?: string;
    options?: string[];
}

export type UserInputType =
    | 'text'
    | 'number'
    | 'select'
    | 'multiselect'
    | 'boolean'
    | 'date';

export interface CreateAiWorkflowRequest {
    name: string;
    description?: string;
    configuration?: WorkflowConfiguration;
    workflow_definition?: WorkflowDefinition;
}

export interface UpdateAiWorkflowRequest {
    name?: string;
    description?: string;
    configuration?: WorkflowConfiguration;
    workflow_definition?: WorkflowDefinition;
}

export interface WorkflowListResponse {
    data: AiWorkflowWithDetails[];
    has_more: boolean;
    limit?: number;
    offset?: number;
}

export interface ListWorkflowsOptions {
    limit?: number;
    offset?: number;
    search?: string;
}
