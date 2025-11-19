export interface AiTool {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    description?: string;
    tool_type: AiToolType;
    deployment_id: string;
    configuration: AiToolConfiguration;
}

export interface AiToolWithDetails extends AiTool { }

export type AiToolType =
    | 'api'
    | 'knowledge_base'
    | 'platform_event'
    | 'platform_function';

export type AiToolConfiguration =
    | { type: 'Api' } & ApiToolConfiguration
    | { type: 'KnowledgeBase' } & KnowledgeBaseToolConfiguration
    | { type: 'PlatformEvent' } & PlatformEventToolConfiguration
    | { type: 'PlatformFunction' } & PlatformFunctionToolConfiguration;

export interface ApiToolConfiguration {
    endpoint: string;
    method: HttpMethod;
    authorization?: AuthorizationConfiguration;
    request_body_schema?: SchemaField[];
    url_params_schema?: SchemaField[];
    timeout_seconds?: number;
}

export interface KnowledgeBaseToolConfiguration {
    knowledge_base_ids: string[];
    search_settings: KnowledgeBaseSearchSettings;
}

export interface PlatformEventToolConfiguration {
    event_label: string;
    event_data?: any;
}

export interface PlatformFunctionToolConfiguration {
    function_name: string;
    function_description?: string;
    input_schema?: SchemaField[];
    output_schema?: SchemaField[];
    is_overridable: boolean;
}

export interface SchemaField {
    name: string;
    field_type: string;
    required: boolean;
    description?: string;
}

export interface AuthorizationConfiguration {
    authorize_as_user: boolean;
    jwt_template_id?: string;
    custom_headers?: SchemaField[];
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface KnowledgeBaseSearchSettings {
    max_results?: number;
    similarity_threshold?: number;
    include_metadata: boolean;
    sort_by_relevance: boolean;
}

export interface CreateAiToolRequest {
    name: string;
    description?: string;
    tool_type: string;
    configuration: AiToolConfiguration;
}

export interface UpdateAiToolRequest {
    name?: string;
    description?: string;
    tool_type?: string;
    configuration?: AiToolConfiguration;
}

export interface ToolListResponse {
    data: AiToolWithDetails[];
    has_more: boolean;
    limit?: number;
    offset?: number;
}

export interface ListToolsOptions {
    limit?: number;
    offset?: number;
    search?: string;
}
