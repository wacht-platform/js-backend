import { getClient } from '../client';
import {
    AiKnowledgeBase,
    CreateAiKnowledgeBaseRequest,
    UpdateAiKnowledgeBaseRequest,
    KnowledgeBaseDocument,
    KnowledgeBaseListResponse,
    DocumentListResponse,
    ListKnowledgeBasesOptions,
    KnowledgeBaseSearchOptions,
    KnowledgeBaseSearchResult,
} from '../models/knowledge-base';
import FormData from 'form-data'; // Assuming node environment, might need to be installed or use native FormData

/**
 * List all knowledge bases
 */
export async function fetchKnowledgeBases(
    options?: ListKnowledgeBasesOptions
): Promise<KnowledgeBaseListResponse> {
    const client = getClient();
    const response = await client.get<KnowledgeBaseListResponse>('/ai-knowledge-bases', {
        params: options,
    });
    return response.data;
}

/**
 * Create a new knowledge base
 */
export async function createKnowledgeBase(
    request: CreateAiKnowledgeBaseRequest
): Promise<AiKnowledgeBase> {
    const client = getClient();
    const response = await client.post<AiKnowledgeBase>('/ai-knowledge-bases', request);
    return response.data;
}

/**
 * Get a specific knowledge base by ID
 */
export async function fetchKnowledgeBase(knowledgeBaseId: string): Promise<AiKnowledgeBase> {
    const client = getClient();
    const response = await client.get<AiKnowledgeBase>(
        `/ai-knowledge-bases/${knowledgeBaseId}`
    );
    return response.data;
}

/**
 * Update a knowledge base
 */
export async function updateKnowledgeBase(
    knowledgeBaseId: string,
    request: UpdateAiKnowledgeBaseRequest
): Promise<AiKnowledgeBase> {
    const client = getClient();
    const response = await client.patch<AiKnowledgeBase>(
        `/ai-knowledge-bases/${knowledgeBaseId}`,
        request
    );
    return response.data;
}

/**
 * Delete a knowledge base
 */
export async function deleteKnowledgeBase(knowledgeBaseId: string): Promise<void> {
    const client = getClient();
    await client.delete(`/ai-knowledge-bases/${knowledgeBaseId}`);
}

/**
 * Get documents in a knowledge base
 */
export async function fetchDocuments(
    knowledgeBaseId: string
): Promise<DocumentListResponse> {
    const client = getClient();
    const response = await client.get<DocumentListResponse>(
        `/ai-knowledge-bases/${knowledgeBaseId}/documents`
    );
    return response.data;
}

/**
 * Upload a document to a knowledge base
 */
export async function uploadDocument(
    knowledgeBaseId: string,
    fileContent: any, // Buffer, Blob, or Stream
    fileName: string,
    title?: string,
    description?: string
): Promise<KnowledgeBaseDocument> {
    const client = getClient();
    const formData = new FormData();

    if (title) formData.append('title', title);
    if (description) formData.append('description', description);
    formData.append('file', fileContent, fileName);

    const response = await client.post<KnowledgeBaseDocument>(
        `/ai-knowledge-bases/${knowledgeBaseId}/documents`,
        formData,
        {
            headers: {
                // @ts-ignore
                ...formData.getHeaders?.(), // Only for 'form-data' package
            },
        }
    );
    return response.data;
}

/**
 * Delete a document from a knowledge base
 */
export async function deleteDocument(
    knowledgeBaseId: string,
    documentId: string
): Promise<void> {
    const client = getClient();
    await client.delete(
        `/ai-knowledge-bases/${knowledgeBaseId}/documents/${documentId}`
    );
}

/**
 * Search across all knowledge bases
 */
export async function searchGlobal(
    options: KnowledgeBaseSearchOptions
): Promise<KnowledgeBaseSearchResult> {
    const client = getClient();
    const response = await client.get<KnowledgeBaseSearchResult>(
        '/ai-knowledge-bases/search',
        { params: options }
    );
    return response.data;
}

/**
 * Search within a specific knowledge base
 */
export async function searchKnowledgeBase(
    knowledgeBaseId: string,
    options: KnowledgeBaseSearchOptions
): Promise<KnowledgeBaseSearchResult> {
    const client = getClient();
    const response = await client.get<KnowledgeBaseSearchResult>(
        `/ai-knowledge-bases/${knowledgeBaseId}/search`,
        { params: options }
    );
    return response.data;
}
