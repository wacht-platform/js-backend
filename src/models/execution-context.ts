export interface AiExecutionContext {
    id: string;
    title?: string;
    system_instructions?: string;
    context_group?: string;
    status?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateAiExecutionContextRequest {
    title?: string;
    system_instructions?: string;
    context_group?: string;
    status?: string;
}

export interface UpdateExecutionContextRequest {
    title?: string;
    system_instructions?: string;
    context_group?: string;
    status?: string;
}

export interface ExecutionContextListResponse {
    data: AiExecutionContext[];
    has_more: boolean;
}

export interface ListExecutionContextsOptions {
    limit?: number;
    offset?: number;
    status?: string;
    context_group?: string;
}
