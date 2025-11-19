export interface AiKnowledgeBase {
    id: string;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateAiKnowledgeBaseRequest {
    name: string;
    description?: string;
}

export interface UpdateAiKnowledgeBaseRequest {
    name?: string;
    description?: string;
}

export interface KnowledgeBaseDocument {
    id: string;
    knowledge_base_id: string;
    file_name: string;
    file_size: number;
    created_at: string;
}

export interface KnowledgeBaseListResponse {
    data: AiKnowledgeBase[];
    has_more: boolean;
}

export interface DocumentListResponse {
    data: KnowledgeBaseDocument[];
    has_more: boolean;
}

export interface ListKnowledgeBasesOptions {
    page?: number;
    per_page?: number;
    search?: string;
}

export interface KnowledgeBaseSearchOptions {
    query: string;
    limit?: number;
    threshold?: number;
}

export interface KnowledgeBaseSearchResult {
    results: any[]; // Define specific result structure if needed
}
