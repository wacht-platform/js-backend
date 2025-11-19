export interface AiAgent {
    id?: string;
    name?: string;
    description?: string;
    model?: string;
    system_prompt?: string;
    temperature?: number;
    max_tokens?: number;
    tools?: string[];
    knowledge_bases?: string[];
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface CreateAiAgentRequest {
    name: string;
    description?: string;
    model: string;
    system_prompt?: string;
    temperature?: number;
    max_tokens?: number;
    tools?: string[];
    knowledge_bases?: string[];
}

export interface UpdateAiAgentRequest {
    name?: string;
    description?: string;
    model?: string;
    system_prompt?: string;
    temperature?: number;
    max_tokens?: number;
    tools?: string[];
    knowledge_bases?: string[];
    is_active?: boolean;
}

export interface GenerateAgentContextTokenRequest {
    user_id: number;
    audience?: string;
    validity_hours?: number;
}

export interface AgentListResponse {
    data: AiAgent[];
    has_more: boolean;
}

export interface ListAgentsOptions {
    page?: number;
    per_page?: number;
    is_active?: boolean;
    search?: string;
}
