/**
 * Wacht SDK for JavaScript/TypeScript
 *
 * @example
 * ```typescript
 * import { initClient, users } from '@wacht/backend';
 *
 * // Initialize the client
 * initClient({ apiKey: 'your-api-key' });
 *
 * // Create a user
 * const user = await users.createUser({
 *   first_name: 'John',
 *   last_name: 'Doe',
 *   email_address: 'john@example.com'
 * });
 * ```
 */

// Direct imports for proper ESM export
import {
  createClientStore,
  createClientStore as createWachtClientStore,
  getClient,
  initClient,
  isClientInitialized,
  WachtClient,
  WachtClientStore,
} from "./client";
import {
  WachtError,
  parseApiError,
} from "./error";
import {
  authenticateRequest,
  authFromHeaders,
  exchangeSessionForAuthToken,
  getAuth,
  getAuthFromToken,
  parseFrontendApiUrlFromPublishableKey,
  toSessionPrincipalIdentity,
  toSessionPrincipalMetadata,
  verifyAuthToken,
  WachtAuthError,
} from "./server-auth";
import {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  ServerError,
} from "./error";

// Type imports
import type { WachtConfig, PaginatedResponse, ListOptions, BinaryResponse } from "./client";
import type {
  JWTPayload,
  PermissionCheck,
  ProtectOptions,
  SessionPrincipalIdentity,
  SessionPrincipalMetadata,
  WachtAuth,
  WachtServerOptions,
} from "./server-auth";
import type {
  DeploymentRestrictionsUpdates,
  CountryRestrictions,
  MultiSessionSupport,
} from "./models/deployment-restrictions";
import type {
  DeploymentMode,
  EmailProvider,
  DnsRecord,
  DomainVerificationRecords,
  EmailVerificationRecords,
  CustomSmtpConfig,
  DeploymentWithSettings,
  DeploymentCredentialsApiKey,
  DeploymentCredentialsResponse,
} from "./models/deployment";
import type { DeploymentB2bSettingsUpdates } from "./models/b2b-settings";
import type {
  JwtTemplate,
  CreateJwtTemplateRequest,
  UpdateJwtTemplateRequest,
  CustomSigningKey,
} from "./models/jwt-template";
import type {
  User,
  UserDetails,
  CreateUserRequest,
  UpdateUserRequest,
  UpdatePasswordRequest,
} from "./models/user";
import type {
  UserEmail,
  AddEmailRequest,
  UpdateEmailRequest,
} from "./models/user";
import type {
  UserPhone,
  AddPhoneRequest,
  UpdatePhoneRequest,
} from "./models/user";
import type {
  DeploymentInvitation,
  DeploymentWaitlistUser,
  InviteUserRequest,
  UserSocialConnection,
  SessionTicketResponse,
  CreateSessionTicketRequest,
} from "./models/user";
import type {
  Organization,
  OrganizationDetails,
  ListOrganizationsOptions,
  OrganizationListSortOrder,
  ListOrganizationMembersOptions,
  OrganizationMemberListSortOrder,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
} from "./models/organization";
import type {
  OrganizationMember,
  AddOrganizationMemberRequest,
  UpdateOrganizationMemberRequest,
} from "./models/organization";
import type {
  OrganizationRole,
  DeploymentOrganizationRole,
  CreateOrganizationRoleRequest,
  UpdateOrganizationRoleRequest,
} from "./models/organization";
import type {
  OrganizationInvitation,
  OrganizationInvitationSummary,
  ListOrganizationInvitationsOptions,
  CreateOrganizationInvitationRequest,
} from "./models/organization";
import type {
  Workspace,
  WorkspaceListItem,
  WorkspaceDetails,
  ListWorkspacesOptions,
  WorkspaceListSortOrder,
  ListWorkspaceMembersOptions,
  WorkspaceMemberListSortOrder,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
} from "./models/workspace";
import type {
  WorkspaceMember,
  AddWorkspaceMemberRequest,
  UpdateWorkspaceMemberRequest,
} from "./models/workspace";
import type {
  WorkspaceRole,
  DeploymentWorkspaceRole,
  CreateWorkspaceRoleRequest,
  UpdateWorkspaceRoleRequest,
} from "./models/workspace";
import type {
  Actor,
  AiAgent,
  AiAgentWithDetails,
  AgentDetailsResponse,
  AgentHookStep,
  AgentHooksConfig,
  AnswerSubmission,
  AnswerValue,
  ApprovalSubmission,
  ApprovalSubmissionItem,
  ComposioAuthConfigListResponse,
  ComposioAuthConfigSummary,
  ComposioConfigResponse,
  ComposioEnableAppAuth,
  ComposioEnabledApp,
  ComposioToolkit,
  ComposioToolkitAuthField,
  ComposioToolkitAuthFields,
  ComposioToolkitAuthMode,
  ComposioToolkitDetailsResponse,
  ComposioToolkitListResponse,
  ActorProject,
  AgentThread,
  CreateActorRequest,
  LookupActorParams,
  LookupActorResponse,
  CreateAiAgentRequest,
  CreateActorProjectRequest,
  CreateAgentThreadRequest,
  AiKnowledgeBaseDocument,
  BinaryFileResponse,
  SkillFileResponse,
  SkillTreeEntry,
  SkillTreeResponse,
  SkillScope,
  SkillSummaryEntry,
  AgentSkillsSummary,
  DelegateProjectTaskRequest,
  DelegateProjectTaskResponse,
  AiKnowledgeBaseWithDetails,
  KnowledgeBaseListResponse,
  DeploymentEmbeddingProvider,
  DeploymentLlmProvider,
  DeploymentStorageProvider,
  AiSettings,
  UpdateAiSettingsRequest,
  ActorMcpServerConnectResponse,
  ActorMcpServerSummary,
  CreateMcpServerRequest,
  CreateProjectTaskBoardItemCommentRequest,
  CreateProjectTaskBoardItemRequest,
  CursorPage,
  EnableComposioAppRequest,
  ExecuteAgentRequest,
  ExecuteAgentResponse,
  McpServer,
  McpServerCreateResponse,
  McpServerDiscoveryResponse,
  DiscoverMcpServerAuthRequest,
  McpServerConfig,
  McpAuthConfig,
  ProjectTaskBoard,
  ProjectTaskBoardItem,
  ProjectTaskBoardItemComment,
  ProjectTaskBoardItemAssignment,
  QuestionAnswer,
  TaskWorkspaceFileContent,
  TaskWorkspaceListing,
  ThreadMessagesResponse,
  ThreadTaskGraph,
  ThreadTaskGraphSummary,
  ThreadTaskEdge,
  ThreadTaskNode,
  ToolApprovalMode,
  UpdateComposioConfigRequest,
  UpdateActorProjectRequest,
  UpdateAgentThreadRequest,
  UpdateAiAgentRequest,
  UpdateMcpServerRequest,
  UpdateProjectTaskBoardItemRequest,
} from "./models/ai";
import type {
  AiTool,
  AiToolWithDetails,
  AiToolConfiguration,
  ApiToolConfiguration,
  PlatformEventToolConfiguration,
  CodeRunnerToolConfiguration,
  InternalToolConfiguration,
  McpToolConfiguration,
  VirtualToolConfiguration,
  CreateAiToolRequest,
  UpdateAiToolRequest,
} from "./models/ai";
import type {
  AiKnowledgeBase,
  CreateAiKnowledgeBaseRequest,
  UpdateAiKnowledgeBaseRequest,
} from "./models/ai";
import type {
  Notification,
  CreateNotificationRequest,
  CallToAction,
  NotificationSeverity,
  NotificationStats,
} from "./models/notification";
import type {
  ApiAuthApp,
  CreateApiAuthAppRequest,
  UpdateApiAuthAppRequest,
  RateLimitScheme,
  CreateRateLimitSchemeRequest,
  UpdateRateLimitSchemeRequest,
  ApiAuditLog,
  ApiAuditLogsResponse,
  ApiAuditTopKey,
  ApiAuditTopPath,
  ApiAuditBlockedReason,
  ApiAuditRateLimitRule,
  ApiAuditRateLimitBreakdown,
  ApiAuditAnalyticsResponse,
  ApiAuditTimeseriesPoint,
  ApiAuditTimeseriesResponse,
  ListApiAuditLogsOptions,
  GetApiAuditAnalyticsOptions,
  GetApiAuditTimeseriesOptions,
} from "./models/api-key";
import type {
  ApiKey,
  ApiKeyWithSecret,
  CreateApiKeyRequest,
  RevokeApiKeyOptions,
  RevokeApiKeyRequest,
  RotateApiKeyRequest,
} from "./models/api-key";
import type {
  RateLimit,
  AuthzPrincipalType,
  AuthzDenyReason,
  AuthzPrincipal,
  AuthzCheckRequest,
  AuthzIdentity,
  AuthzMetadata,
  AuthzApiKeyIdentity,
  AuthzOauthAccessTokenIdentity,
  ResolvedAuthzIdentity,
  AuthzRateLimitState,
  AuthzCheckResponse,
} from "./models/api-key";
import type {
  OAuthScopeDefinition,
  OAuthApp,
  OAuthDomainVerificationResponse,
  CreateOAuthAppRequest,
  UpdateOAuthAppRequest,
  UpdateOAuthScopeRequest,
  SetOAuthScopeMappingRequest,
  OAuthClient,
  Jwk,
  JwksDocument,
  CreateOAuthClientRequest,
  UpdateOAuthClientRequest,
  RotateOAuthClientSecretResponse,
  OAuthGrant,
  OAuthAppSigningKey,
  OAuthAppSigningKeysListResponse,
  OAuthAppSigningKeyRotatedResponse,
} from "./models/oauth";
import type {
  WebhookApp,
  WebhookEventCatalog,
  WebhookEventDefinition,
  CreateWebhookAppRequest,
  UpdateWebhookAppRequest,
  CreateWebhookEventCatalogRequest,
  UpdateWebhookEventCatalogRequest,
  AppendWebhookEventCatalogEventsRequest,
  ArchiveWebhookEventInCatalogRequest,
  TriggerWebhookRequest,
  WebhookEndpoint,
  WebhookDelivery,
  WebhookAppEvent,
  WebhookDeliveryDetails,
  WebhookStats,
  WebhookTimeseriesData,
  WebhookTimeseriesResult,
  CreateWebhookEndpointRequest,
  UpdateWebhookEndpointRequest,
  WebhookAnalytics,
  ReplayTaskStatus,
  ReplayTaskListResponse,
  ReplayTaskCancelResponse,
} from "./models/webhook";
import type {
  Segment,
  ListSegmentsOptions,
  CreateSegmentRequest,
  UpdateSegmentRequest,
  SegmentDataRequest,
  AnalyzedEntity,
} from "./models/segment";
import type {
  EmailTemplate,
  SocialConnection,
  UpsertSocialConnectionRequest,
  SmtpConfigRequest,
  SmtpConfigResponse,
  SmtpVerifyResponse,
} from "./models";
import type {
  AnalyticsStats,
  RecentSignup,
} from "./models/analytics";

// API modules - namespace exports
import * as users from "./api/users";
import * as organizations from "./api/organizations";
import * as workspaces from "./api/workspaces";
import * as apiKeys from "./api/api-keys";
import * as settings from "./api/settings";
import * as notifications from "./api/notifications";
import * as webhooks from "./api/webhooks";
import * as ai from "./api/ai";
import * as oauth from "./api/oauth";
import * as segments from "./api/segments";
import * as sessions from "./api/sessions";
import * as invitations from "./api/invitations";
import * as analytics from "./api/analytics";
import * as utility from "./api/utility";
import * as health from "./api/health";
import * as gateway from "./api/gateway";
import * as credentials from "./api/credentials";

// Client exports
export {
  initClient,
  getClient,
  isClientInitialized,
  WachtClient,
  WachtClientStore,
  createClientStore,
  createWachtClientStore,
};
export type { WachtConfig, PaginatedResponse, ListOptions, BinaryResponse };
export {
  authenticateRequest,
  authFromHeaders,
  exchangeSessionForAuthToken,
  getAuth,
  getAuthFromToken,
  parseFrontendApiUrlFromPublishableKey,
  toSessionPrincipalIdentity,
  toSessionPrincipalMetadata,
  verifyAuthToken,
  WachtAuthError,
};
export type {
  JWTPayload,
  PermissionCheck,
  ProtectOptions,
  SessionPrincipalIdentity,
  SessionPrincipalMetadata,
  WachtAuth,
  WachtServerOptions,
};

// Error exports
export { WachtError, parseApiError };
export {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  ServerError,
};

// Model type exports
export type {
  DeploymentRestrictionsUpdates,
  CountryRestrictions,
  MultiSessionSupport,
};
export type {
  DeploymentMode,
  EmailProvider,
  DnsRecord,
  DomainVerificationRecords,
  EmailVerificationRecords,
  CustomSmtpConfig,
  DeploymentWithSettings,
  DeploymentCredentialsApiKey,
  DeploymentCredentialsResponse,
};
export type { DeploymentB2bSettingsUpdates };
export type {
  JwtTemplate,
  CreateJwtTemplateRequest,
  UpdateJwtTemplateRequest,
  CustomSigningKey,
};
export type {
  User,
  UserDetails,
  CreateUserRequest,
  UpdateUserRequest,
  UpdatePasswordRequest,
};
export type { UserEmail, AddEmailRequest, UpdateEmailRequest };
export type { UserPhone, AddPhoneRequest, UpdatePhoneRequest };
export type {
  Organization,
  OrganizationDetails,
  ListOrganizationsOptions,
  OrganizationListSortOrder,
  ListOrganizationMembersOptions,
  OrganizationMemberListSortOrder,
  CreateOrganizationRequest,
  UpdateOrganizationRequest,
};
export type {
  OrganizationMember,
  AddOrganizationMemberRequest,
  UpdateOrganizationMemberRequest,
};
export type {
  OrganizationRole,
  DeploymentOrganizationRole,
  CreateOrganizationRoleRequest,
  UpdateOrganizationRoleRequest,
};
export type {
  OrganizationInvitation,
  OrganizationInvitationSummary,
  ListOrganizationInvitationsOptions,
  CreateOrganizationInvitationRequest,
};
export type {
  Workspace,
  WorkspaceListItem,
  WorkspaceDetails,
  ListWorkspacesOptions,
  WorkspaceListSortOrder,
  ListWorkspaceMembersOptions,
  WorkspaceMemberListSortOrder,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
};
export type {
  WorkspaceMember,
  AddWorkspaceMemberRequest,
  UpdateWorkspaceMemberRequest,
};
export type {
  WorkspaceRole,
  DeploymentWorkspaceRole,
  CreateWorkspaceRoleRequest,
  UpdateWorkspaceRoleRequest,
};
export type {
  AiAgent,
  AiAgentWithDetails,
  AgentDetailsResponse,
  AgentHookStep,
  AgentHooksConfig,
  CreateAiAgentRequest,
  UpdateAiAgentRequest,
};
export type {
  AiTool,
  AiToolWithDetails,
  AiToolConfiguration,
  ApiToolConfiguration,
  PlatformEventToolConfiguration,
  CodeRunnerToolConfiguration,
  InternalToolConfiguration,
  McpToolConfiguration,
  VirtualToolConfiguration,
  CreateAiToolRequest,
  UpdateAiToolRequest,
};
export type {
  AiKnowledgeBase,
  AiKnowledgeBaseWithDetails,
  KnowledgeBaseListResponse,
  CreateAiKnowledgeBaseRequest,
  UpdateAiKnowledgeBaseRequest,
};
export type {
  Actor,
  CreateActorRequest,
  LookupActorParams,
  LookupActorResponse,
  ActorProject,
  CreateActorProjectRequest,
  UpdateActorProjectRequest,
  AgentThread,
  CreateAgentThreadRequest,
  UpdateAgentThreadRequest,
  AiKnowledgeBaseDocument,
  BinaryFileResponse,
  SkillFileResponse,
  SkillTreeEntry,
  SkillTreeResponse,
  SkillScope,
  SkillSummaryEntry,
  AgentSkillsSummary,
  DelegateProjectTaskRequest,
  DelegateProjectTaskResponse,
  McpServer,
  McpServerCreateResponse,
  CreateMcpServerRequest,
  UpdateMcpServerRequest,
  McpServerDiscoveryResponse,
  DiscoverMcpServerAuthRequest,
  McpServerConfig,
  McpAuthConfig,
  ActorMcpServerSummary,
  ActorMcpServerConnectResponse,
  ExecuteAgentRequest,
  ExecuteAgentResponse,
  DeploymentEmbeddingProvider,
  DeploymentLlmProvider,
  DeploymentStorageProvider,
  AiSettings,
  UpdateAiSettingsRequest,
  CursorPage,
  ProjectTaskBoard,
  ProjectTaskBoardItem,
  ProjectTaskBoardItemComment,
  CreateProjectTaskBoardItemRequest,
  CreateProjectTaskBoardItemCommentRequest,
  UpdateProjectTaskBoardItemRequest,
  AnswerValue,
  QuestionAnswer,
  AnswerSubmission,
  ToolApprovalMode,
  ApprovalSubmissionItem,
  ApprovalSubmission,
  ProjectTaskBoardItemAssignment,
  TaskWorkspaceListing,
  TaskWorkspaceFileContent,
  ThreadMessagesResponse,
  ThreadTaskGraph,
  ThreadTaskNode,
  ThreadTaskEdge,
  ThreadTaskGraphSummary,
  ComposioEnabledApp,
  ComposioConfigResponse,
  UpdateComposioConfigRequest,
  ComposioToolkit,
  ComposioToolkitListResponse,
  ComposioAuthConfigSummary,
  ComposioAuthConfigListResponse,
  ComposioEnableAppAuth,
  EnableComposioAppRequest,
  ComposioToolkitAuthField,
  ComposioToolkitAuthFields,
  ComposioToolkitAuthMode,
  ComposioToolkitDetailsResponse,
};
export type {
  Notification,
  CreateNotificationRequest,
  CallToAction,
  NotificationSeverity,
  NotificationStats,
};
export type {
  ApiAuthApp,
  CreateApiAuthAppRequest,
  UpdateApiAuthAppRequest,
  RateLimitScheme,
  CreateRateLimitSchemeRequest,
  UpdateRateLimitSchemeRequest,
  ApiAuditLog,
  ApiAuditLogsResponse,
  ApiAuditTopKey,
  ApiAuditTopPath,
  ApiAuditBlockedReason,
  ApiAuditRateLimitRule,
  ApiAuditRateLimitBreakdown,
  ApiAuditAnalyticsResponse,
  ApiAuditTimeseriesPoint,
  ApiAuditTimeseriesResponse,
  ListApiAuditLogsOptions,
  GetApiAuditAnalyticsOptions,
  GetApiAuditTimeseriesOptions,
};
export type {
  ApiKey,
  ApiKeyWithSecret,
  CreateApiKeyRequest,
  RevokeApiKeyOptions,
  RevokeApiKeyRequest,
  RotateApiKeyRequest,
};
export type {
  RateLimit,
  AuthzPrincipalType,
  AuthzDenyReason,
  AuthzPrincipal,
  AuthzCheckRequest,
  AuthzIdentity,
  AuthzMetadata,
  AuthzApiKeyIdentity,
  AuthzOauthAccessTokenIdentity,
  ResolvedAuthzIdentity,
  AuthzRateLimitState,
  AuthzCheckResponse,
};
export type {
  OAuthScopeDefinition,
  OAuthApp,
  OAuthDomainVerificationResponse,
  CreateOAuthAppRequest,
  UpdateOAuthAppRequest,
  UpdateOAuthScopeRequest,
  SetOAuthScopeMappingRequest,
  OAuthClient,
  Jwk,
  JwksDocument,
  CreateOAuthClientRequest,
  UpdateOAuthClientRequest,
  RotateOAuthClientSecretResponse,
  OAuthGrant,
  OAuthAppSigningKey,
  OAuthAppSigningKeysListResponse,
  OAuthAppSigningKeyRotatedResponse,
};
export type {
  WebhookApp,
  WebhookEventCatalog,
  WebhookEventDefinition,
  CreateWebhookAppRequest,
  UpdateWebhookAppRequest,
  CreateWebhookEventCatalogRequest,
  UpdateWebhookEventCatalogRequest,
  AppendWebhookEventCatalogEventsRequest,
  ArchiveWebhookEventInCatalogRequest,
  TriggerWebhookRequest,
};
export type {
  WebhookEndpoint,
  WebhookDelivery,
  WebhookAppEvent,
  WebhookDeliveryDetails,
  WebhookStats,
  WebhookTimeseriesData,
  WebhookTimeseriesResult,
  CreateWebhookEndpointRequest,
  UpdateWebhookEndpointRequest,
  WebhookAnalytics,
  ReplayTaskStatus,
  ReplayTaskListResponse,
  ReplayTaskCancelResponse,
};
export type {
  Segment,
  ListSegmentsOptions,
  CreateSegmentRequest,
  UpdateSegmentRequest,
  SegmentDataRequest,
  AnalyzedEntity,
};
export type {
  DeploymentInvitation,
  DeploymentWaitlistUser,
  InviteUserRequest,
  UserSocialConnection,
  SessionTicketResponse,
  CreateSessionTicketRequest,
};
export type {
  EmailTemplate,
  SocialConnection,
  UpsertSocialConnectionRequest,
  SmtpConfigRequest,
  SmtpConfigResponse,
  SmtpVerifyResponse,
};
export type { AnalyticsStats, RecentSignup };

// API module namespace exports
export {
  users,
  organizations,
  workspaces,
  apiKeys,
  settings,
  notifications,
  webhooks,
  ai,
  oauth,
  segments,
  sessions,
  invitations,
  analytics,
  utility,
  health,
  gateway,
  credentials,
};
