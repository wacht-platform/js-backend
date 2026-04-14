import {
  getClient,
  type WachtClient,
  type BinaryResponse,
  type PaginatedResponse,
  type ListOptions,
} from "../client";
import type {
  ActorMcpServerConnectResponse,
  ActorMcpServerSummary,
  ActorProject,
  AgentDetailsResponse,
  AgentThread,
  AiAgent,
  AiAgentWithDetails,
  AiKnowledgeBase,
  AiKnowledgeBaseDocument,
  AiKnowledgeBaseWithDetails,
  AiSettings,
  AiTool,
  AiToolWithDetails,
  BinaryFileResponse,
  SkillFileResponse,
  SkillScope,
  SkillTreeResponse,
  CreateActorProjectRequest,
  CreateAgentThreadRequest,
  CreateAiAgentRequest,
  CreateAiKnowledgeBaseRequest,
  CreateAiToolRequest,
  CreateMcpServerRequest,
  DiscoverMcpServerAuthRequest,
  McpServerCreateResponse,
  CreateProjectTaskBoardItemRequest,
  CursorPage,
  ExecuteAgentRequest,
  ExecuteAgentResponse,
  McpServer,
  McpServerDiscoveryResponse,
  KnowledgeBaseListResponse,
  ProjectTaskBoard,
  ProjectTaskBoardItem,
  ProjectTaskBoardItemAssignment,
  ProjectTaskBoardItemEvent,
  TaskWorkspaceFileContent,
  TaskWorkspaceListing,
  ThreadEvent,
  ThreadMessagesResponse,
  ThreadTaskGraph,
  UpdateActorProjectRequest,
  UpdateAgentThreadRequest,
  UpdateAiAgentRequest,
  UpdateAiKnowledgeBaseRequest,
  UpdateAiToolRequest,
  UpdateAiSettingsRequest,
  UpdateMcpServerRequest,
  UpdateProjectTaskBoardItemRequest,
  AppendProjectTaskBoardItemJournalRequest,
} from "../models";

function buildListQuery(options?: ListOptions & { search?: string }): string {
  if (!options) return "";
  return buildOptionalQuery({
    limit: options.limit ?? 50,
    offset: options.offset ?? 0,
    search: options.search,
  });
}

function buildBoolQuery(key: string, value?: boolean): string {
  if (value === undefined) return "";
  return `?${new URLSearchParams({ [key]: String(value) }).toString()}`;
}

function buildOptionalQuery(
  params: Record<string, string | number | boolean | undefined | null>,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

function buildPathQuery(path?: string): string {
  return buildOptionalQuery({ path });
}

export async function listAgents(
  options?: ListOptions & { search?: string },
  client?: WachtClient,
): Promise<PaginatedResponse<AiAgentWithDetails>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<AiAgentWithDetails>>(
    `/ai/agents${buildListQuery(options)}`,
  );
}

export async function getAgent(
  agentId: string,
  client?: WachtClient,
): Promise<AiAgentWithDetails> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AiAgentWithDetails>(`/ai/agents/${agentId}`);
}

export async function getAgentDetails(
  agentId: string,
  client?: WachtClient,
): Promise<AgentDetailsResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AgentDetailsResponse>(
    `/ai/agents/${agentId}/details`,
  );
}

export async function listAgentSkillTree(
  agentId: string,
  scope: SkillScope,
  path?: string,
  client?: WachtClient,
): Promise<SkillTreeResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<SkillTreeResponse>(
    `/ai/agents/${agentId}/skills/tree${buildOptionalQuery({ scope, path })}`,
  );
}

export async function readAgentSkillFile(
  agentId: string,
  scope: SkillScope,
  path: string,
  client?: WachtClient,
): Promise<SkillFileResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<SkillFileResponse>(
    `/ai/agents/${agentId}/skills/file${buildOptionalQuery({ scope, path })}`,
  );
}

export async function importAgentSkillBundle(
  agentId: string,
  file: Blob,
  options: { replace_existing?: boolean; file_name?: string } = {},
  client?: WachtClient,
): Promise<SkillTreeResponse> {
  const sdkClient = client ?? getClient();
  const formData = new FormData();
  const fileName =
    options.file_name ||
    ((typeof File !== "undefined" && file instanceof File) ? file.name : "skills.zip");
  formData.append("file", file, fileName);
  if (options.replace_existing !== undefined) {
    formData.append("replace_existing", String(options.replace_existing));
  }
  return sdkClient.post<SkillTreeResponse>(
    `/ai/agents/${agentId}/skills`,
    formData,
  );
}

export async function deleteAgentSkill(
  agentId: string,
  skillSlug: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/ai/agents/${agentId}/skills/${encodeURIComponent(skillSlug)}`,
  );
}

export async function createAgent(
  request: CreateAiAgentRequest,
  client?: WachtClient,
): Promise<AiAgent> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AiAgent>("/ai/agents", request);
}

export async function updateAgent(
  agentId: string,
  request: UpdateAiAgentRequest,
  client?: WachtClient,
): Promise<AiAgent> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<AiAgent>(`/ai/agents/${agentId}`, request);
}

export async function deleteAgent(
  agentId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/ai/agents/${agentId}`);
}

export async function listAgentSubAgents(
  agentId: string,
  client?: WachtClient,
): Promise<PaginatedResponse<AiAgentWithDetails>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<AiAgentWithDetails>>(`/ai/agents/${agentId}/sub-agents`);
}

export async function attachAgentSubAgent(
  agentId: string,
  subAgentId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  await sdkClient.post<void>(
    `/ai/agents/${agentId}/sub-agents/${subAgentId}`,
    {},
  );
}

export async function detachAgentSubAgent(
  agentId: string,
  subAgentId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/ai/agents/${agentId}/sub-agents/${subAgentId}`,
  );
}

export async function listTools(
  options?: ListOptions & { search?: string },
  client?: WachtClient,
): Promise<PaginatedResponse<AiToolWithDetails>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<AiToolWithDetails>>(
    `/ai/tools${buildListQuery(options)}`,
  );
}

export async function getTool(
  toolId: string,
  client?: WachtClient,
): Promise<AiToolWithDetails> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AiToolWithDetails>(`/ai/tools/${toolId}`);
}

export async function createTool(
  request: CreateAiToolRequest,
  client?: WachtClient,
): Promise<AiTool> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AiTool>("/ai/tools", request);
}

export async function updateTool(
  toolId: string,
  request: UpdateAiToolRequest,
  client?: WachtClient,
): Promise<AiTool> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<AiTool>(`/ai/tools/${toolId}`, request);
}

export async function deleteTool(
  toolId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/ai/tools/${toolId}`);
}

export async function listAgentTools(
  agentId: string,
  client?: WachtClient,
): Promise<PaginatedResponse<AiTool>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<AiTool>>(`/ai/agents/${agentId}/tools`);
}

export async function attachAgentTool(
  agentId: string,
  toolId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  await sdkClient.post<void>(`/ai/agents/${agentId}/tools/${toolId}`, {});
}

export async function detachAgentTool(
  agentId: string,
  toolId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/ai/agents/${agentId}/tools/${toolId}`);
}

export async function listKnowledgeBases(
  options?: ListOptions & { search?: string },
  client?: WachtClient,
): Promise<KnowledgeBaseListResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<KnowledgeBaseListResponse>(
    `/ai/knowledge-bases${buildListQuery(options)}`,
  );
}

export async function getKnowledgeBase(
  kbId: string,
  client?: WachtClient,
): Promise<AiKnowledgeBaseWithDetails> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AiKnowledgeBaseWithDetails>(`/ai/knowledge-bases/${kbId}`);
}

export async function createKnowledgeBase(
  request: CreateAiKnowledgeBaseRequest,
  client?: WachtClient,
): Promise<AiKnowledgeBase> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AiKnowledgeBase>("/ai/knowledge-bases", request);
}

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

export async function deleteKnowledgeBase(
  kbId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/ai/knowledge-bases/${kbId}`);
}

export async function listAgentKnowledgeBases(
  agentId: string,
  client?: WachtClient,
): Promise<PaginatedResponse<AiKnowledgeBaseWithDetails>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<AiKnowledgeBaseWithDetails>>(
    `/ai/agents/${agentId}/knowledge-bases`,
  );
}

export async function attachAgentKnowledgeBase(
  agentId: string,
  kbId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  await sdkClient.post<void>(
    `/ai/agents/${agentId}/knowledge-bases/${kbId}`,
    {},
  );
}

export async function detachAgentKnowledgeBase(
  agentId: string,
  kbId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(
    `/ai/agents/${agentId}/knowledge-bases/${kbId}`,
  );
}

export async function listKnowledgeBaseDocuments(
  kbId: string,
  options?: { limit?: number; offset?: number },
  client?: WachtClient,
): Promise<PaginatedResponse<AiKnowledgeBaseDocument>> {
  const sdkClient = client ?? getClient();
  const params = buildOptionalQuery({
    limit: options?.limit,
    offset: options?.offset,
  });
  return sdkClient.get<PaginatedResponse<AiKnowledgeBaseDocument>>(
    `/ai/knowledge-bases/${kbId}/documents${params}`,
  );
}

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
  );
}

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

export async function listMcpServers(
  options?: ListOptions,
  client?: WachtClient,
): Promise<PaginatedResponse<McpServer>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<PaginatedResponse<McpServer>>(
    `/ai/mcp-servers${buildListQuery(options)}`,
  );
}

export async function getMcpServer(
  mcpServerId: string,
  client?: WachtClient,
): Promise<McpServer> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<McpServer>(`/ai/mcp-servers/${mcpServerId}`);
}

export async function createMcpServer(
  request: CreateMcpServerRequest,
  client?: WachtClient,
): Promise<McpServerCreateResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<McpServerCreateResponse>("/ai/mcp-servers", request);
}

export async function updateMcpServer(
  mcpServerId: string,
  request: UpdateMcpServerRequest,
  client?: WachtClient,
): Promise<McpServer> {
  const sdkClient = client ?? getClient();
  return sdkClient.patch<McpServer>(`/ai/mcp-servers/${mcpServerId}`, request);
}

export async function deleteMcpServer(
  mcpServerId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.delete<void>(`/ai/mcp-servers/${mcpServerId}`);
}

export async function discoverMcpServerAuth(
  request: DiscoverMcpServerAuthRequest,
  client?: WachtClient,
): Promise<McpServerDiscoveryResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<McpServerDiscoveryResponse>(
    "/ai/mcp-servers/discover",
    request,
  );
}

export async function listActorMcpServers(
  actorId: string,
  client?: WachtClient,
): Promise<ActorMcpServerSummary[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ActorMcpServerSummary[]>(
    `/ai/actor-mcp-servers?actor_id=${encodeURIComponent(actorId)}`,
  );
}

export async function connectActorMcpServer(
  actorId: string,
  mcpServerId: string,
  client?: WachtClient,
): Promise<ActorMcpServerConnectResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ActorMcpServerConnectResponse>(
    `/ai/actor-mcp-servers/${mcpServerId}/connect?actor_id=${encodeURIComponent(actorId)}`,
    {},
  );
}

export async function disconnectActorMcpServer(
  actorId: string,
  mcpServerId: string,
  client?: WachtClient,
): Promise<void> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<void>(
    `/ai/actor-mcp-servers/${mcpServerId}/disconnect?actor_id=${encodeURIComponent(actorId)}`,
    {},
  );
}

export async function listActorProjects(
  actorId: string,
  includeArchived = false,
  client?: WachtClient,
): Promise<ActorProject[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ActorProject[]>(
    `/ai/actor-projects${buildOptionalQuery({ actor_id: actorId, include_archived: includeArchived ? true : undefined })}`,
  );
}

export async function searchActorProjects(
  actorId: string,
  options: { q?: string; limit?: number; cursor?: string } = {},
  client?: WachtClient,
): Promise<CursorPage<ActorProject>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<CursorPage<ActorProject>>(
    `/ai/actor-projects/search${buildOptionalQuery({ actor_id: actorId, q: options.q, limit: options.limit, cursor: options.cursor })}`,
  );
}

export async function createActorProject(
  actorId: string,
  request: CreateActorProjectRequest,
  client?: WachtClient,
): Promise<ActorProject> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ActorProject>(
    `/ai/actor-projects${buildOptionalQuery({ actor_id: actorId })}`,
    request,
  );
}

export async function getActorProject(
  projectId: string,
  client?: WachtClient,
): Promise<ActorProject> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ActorProject>(`/ai/actor-projects/${projectId}`);
}

export async function updateActorProject(
  projectId: string,
  request: UpdateActorProjectRequest,
  client?: WachtClient,
): Promise<ActorProject> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ActorProject>(
    `/ai/actor-projects/${projectId}/update`,
    request,
  );
}

export async function archiveActorProject(
  projectId: string,
  client?: WachtClient,
): Promise<ActorProject> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ActorProject>(
    `/ai/actor-projects/${projectId}/archive`,
    {},
  );
}

export async function unarchiveActorProject(
  projectId: string,
  client?: WachtClient,
): Promise<ActorProject> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ActorProject>(
    `/ai/actor-projects/${projectId}/unarchive`,
    {},
  );
}

export async function getProjectTaskBoard(
  projectId: string,
  client?: WachtClient,
): Promise<ProjectTaskBoard> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ProjectTaskBoard>(
    `/ai/actor-projects/${projectId}/board`,
  );
}

export async function listProjectTaskBoardItems(
  projectId: string,
  client?: WachtClient,
): Promise<ProjectTaskBoardItem[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ProjectTaskBoardItem[]>(
    `/ai/actor-projects/${projectId}/board/items`,
  );
}

export async function createProjectTaskBoardItem(
  projectId: string,
  request: CreateProjectTaskBoardItemRequest,
  client?: WachtClient,
): Promise<ProjectTaskBoardItem> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ProjectTaskBoardItem>(
    `/ai/actor-projects/${projectId}/board/items`,
    request,
  );
}

export async function getProjectTaskBoardItem(
  projectId: string,
  itemId: string,
  client?: WachtClient,
): Promise<ProjectTaskBoardItem> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ProjectTaskBoardItem>(
    `/ai/actor-projects/${projectId}/board/items/${itemId}`,
  );
}

export async function listProjectTaskBoardItemEvents(
  projectId: string,
  itemId: string,
  client?: WachtClient,
): Promise<ProjectTaskBoardItemEvent[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ProjectTaskBoardItemEvent[]>(
    `/ai/actor-projects/${projectId}/board/items/${itemId}/events`,
  );
}

export async function listProjectTaskBoardItemAssignments(
  projectId: string,
  itemId: string,
  client?: WachtClient,
): Promise<ProjectTaskBoardItemAssignment[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ProjectTaskBoardItemAssignment[]>(
    `/ai/actor-projects/${projectId}/board/items/${itemId}/assignments`,
  );
}

export async function listProjectTaskBoardItemFilesystem(
  projectId: string,
  itemId: string,
  path?: string,
  client?: WachtClient,
): Promise<TaskWorkspaceListing> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<TaskWorkspaceListing>(
    `/ai/actor-projects/${projectId}/board/items/${itemId}/filesystem${buildPathQuery(path)}`,
  );
}

export async function getProjectTaskBoardItemFilesystemFile(
  projectId: string,
  itemId: string,
  path: string,
  client?: WachtClient,
): Promise<TaskWorkspaceFileContent> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<TaskWorkspaceFileContent>(
    `/ai/actor-projects/${projectId}/board/items/${itemId}/filesystem/file${buildPathQuery(path)}`,
  );
}

export async function updateProjectTaskBoardItem(
  projectId: string,
  itemId: string,
  request: UpdateProjectTaskBoardItemRequest,
  client?: WachtClient,
): Promise<ProjectTaskBoardItem> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ProjectTaskBoardItem>(
    `/ai/actor-projects/${projectId}/board/items/${itemId}/update`,
    request,
  );
}

export async function archiveProjectTaskBoardItem(
  projectId: string,
  itemId: string,
  client?: WachtClient,
): Promise<ProjectTaskBoardItem> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ProjectTaskBoardItem>(
    `/ai/actor-projects/${projectId}/board/items/${itemId}/archive`,
    {},
  );
}

export async function unarchiveProjectTaskBoardItem(
  projectId: string,
  itemId: string,
  client?: WachtClient,
): Promise<ProjectTaskBoardItem> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ProjectTaskBoardItem>(
    `/ai/actor-projects/${projectId}/board/items/${itemId}/unarchive`,
    {},
  );
}

export async function appendProjectTaskBoardItemJournal(
  projectId: string,
  itemId: string,
  request: AppendProjectTaskBoardItemJournalRequest,
  client?: WachtClient,
): Promise<ProjectTaskBoardItemEvent> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ProjectTaskBoardItemEvent>(
    `/ai/actor-projects/${projectId}/board/items/${itemId}/journal`,
    request,
  );
}

export async function listProjectThreads(
  projectId: string,
  includeArchived = false,
  client?: WachtClient,
): Promise<AgentThread[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AgentThread[]>(
    `/ai/actor-projects/${projectId}/threads${buildBoolQuery("include_archived", includeArchived)}`,
  );
}

export async function createAgentThread(
  projectId: string,
  request: CreateAgentThreadRequest,
  client?: WachtClient,
): Promise<AgentThread> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AgentThread>(
    `/ai/actor-projects/${projectId}/threads`,
    request,
  );
}

export async function searchActorProjectThreads(
  actorId: string,
  options: { q?: string; limit?: number; cursor?: string } = {},
  client?: WachtClient,
): Promise<CursorPage<AgentThread>> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<CursorPage<AgentThread>>(
    `/ai/actor-project-threads/search${buildOptionalQuery({ actor_id: actorId, q: options.q, limit: options.limit, cursor: options.cursor })}`,
  );
}

export async function getAgentThread(
  threadId: string,
  client?: WachtClient,
): Promise<AgentThread> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AgentThread>(`/ai/actor-project-threads/${threadId}`);
}

export async function updateAgentThread(
  threadId: string,
  request: UpdateAgentThreadRequest,
  client?: WachtClient,
): Promise<AgentThread> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AgentThread>(
    `/ai/actor-project-threads/${threadId}/update`,
    request,
  );
}

export async function archiveAgentThread(
  threadId: string,
  client?: WachtClient,
): Promise<AgentThread> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AgentThread>(
    `/ai/actor-project-threads/${threadId}/archive`,
    {},
  );
}

export async function unarchiveAgentThread(
  threadId: string,
  client?: WachtClient,
): Promise<AgentThread> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<AgentThread>(
    `/ai/actor-project-threads/${threadId}/unarchive`,
    {},
  );
}

export async function listThreadEvents(
  threadId: string,
  client?: WachtClient,
): Promise<ThreadEvent[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ThreadEvent[]>(
    `/ai/actor-project-threads/${threadId}/events`,
  );
}

export async function listThreadAssignments(
  threadId: string,
  client?: WachtClient,
): Promise<ProjectTaskBoardItemAssignment[]> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ProjectTaskBoardItemAssignment[]>(
    `/ai/actor-project-threads/${threadId}/assignments`,
  );
}

export async function getLatestThreadTaskGraph(
  threadId: string,
  client?: WachtClient,
): Promise<ThreadTaskGraph | null> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ThreadTaskGraph | null>(
    `/ai/actor-project-threads/${threadId}/task-graphs`,
  );
}

export async function listThreadMessages(
  threadId: string,
  options: { limit?: number; before_id?: string; after_id?: string } = {},
  client?: WachtClient,
): Promise<ThreadMessagesResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<ThreadMessagesResponse>(
    `/ai/actor-project-threads/${threadId}/messages${buildOptionalQuery(options)}`,
  );
}

export async function listThreadFilesystem(
  threadId: string,
  path?: string,
  client?: WachtClient,
): Promise<TaskWorkspaceListing> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<TaskWorkspaceListing>(
    `/ai/actor-project-threads/${threadId}/filesystem${buildPathQuery(path)}`,
  );
}

function toBinaryFileResponse(response: BinaryResponse): BinaryFileResponse {
  return {
    data: response.data,
    mime_type: response.contentType,
    file_name: response.fileName,
  };
}

export async function getThreadFilesystemFile(
  threadId: string,
  path: string,
  client?: WachtClient,
): Promise<BinaryFileResponse> {
  const sdkClient = client ?? getClient();
  const response = await sdkClient.getBinary(
    `/ai/actor-project-threads/${threadId}/filesystem/file${buildPathQuery(path)}`,
  );
  return toBinaryFileResponse(response);
}

export async function runAgentThread(
  threadId: string,
  request: ExecuteAgentRequest,
  client?: WachtClient,
): Promise<ExecuteAgentResponse> {
  const sdkClient = client ?? getClient();
  return sdkClient.post<ExecuteAgentResponse>(
    `/ai/actor-project-threads/${threadId}/run`,
    request,
  );
}

export async function getAiSettings(client?: WachtClient): Promise<AiSettings> {
  const sdkClient = client ?? getClient();
  return sdkClient.get<AiSettings>("/ai/settings");
}

export async function updateAiSettings(
  request: UpdateAiSettingsRequest,
  client?: WachtClient,
): Promise<AiSettings> {
  const sdkClient = client ?? getClient();
  return sdkClient.put<AiSettings>("/ai/settings", request);
}
