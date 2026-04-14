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
import type { DeploymentB2bSettingsUpdates } from "./models/b2b-settings";
import type {
  JwtTemplate,
  CreateJwtTemplateRequest,
  UpdateJwtTemplateRequest,
  CustomSigningKey,
} from "./models/jwt-template";
import type {
  User,
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
  CreateOrganizationRoleRequest,
  UpdateOrganizationRoleRequest,
} from "./models/organization";
import type {
  Workspace,
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
  CreateWorkspaceRoleRequest,
  UpdateWorkspaceRoleRequest,
} from "./models/workspace";
import type {
  AiAgent,
  AiAgentWithDetails,
  AgentDetailsResponse,
  ActorProject,
  AgentThread,
  CreateAiAgentRequest,
  CreateActorProjectRequest,
  CreateAgentThreadRequest,
  AiKnowledgeBaseDocument,
  BinaryFileResponse,
  SkillFileResponse,
  SkillTreeEntry,
  SkillTreeResponse,
  SkillScope,
  AiKnowledgeBaseWithDetails,
  KnowledgeBaseListResponse,
  AiSettings,
  UpdateAiSettingsRequest,
  ActorMcpServerConnectResponse,
  ActorMcpServerSummary,
  CreateMcpServerRequest,
  CreateProjectTaskBoardItemRequest,
  CursorPage,
  ExecuteAgentRequest,
  ExecuteAgentResponse,
  McpServer,
  McpServerCreateResponse,
  McpServerDiscoveryResponse,
  DiscoverMcpServerAuthRequest,
  McpServerConfig,
  McpAuthConfig,
  AppendProjectTaskBoardItemJournalRequest,
  ProjectTaskBoard,
  ProjectTaskBoardItem,
  ProjectTaskBoardItemAssignment,
  ProjectTaskBoardItemEvent,
  TaskWorkspaceFileContent,
  TaskWorkspaceListing,
  ThreadEvent,
  ThreadMessagesResponse,
  ThreadTaskGraph,
  ThreadTaskGraphSummary,
  ThreadTaskEdge,
  ThreadTaskNode,
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
  UseExternalServiceToolConfiguration,
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
} from "./models/api-key";
import type {
  ApiKey,
  ApiKeyWithSecret,
  CreateApiKeyRequest,
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
} from "./models/oauth";
import type {
  WebhookApp,
  CreateWebhookAppRequest,
  UpdateWebhookAppRequest,
  TriggerWebhookRequest,
  WebhookEndpoint,
  WebhookDelivery,
  WebhookAppEvent,
  WebhookDeliveryDetails,
  WebhookTimeseriesData,
  CreateWebhookEndpointRequest,
  UpdateWebhookEndpointRequest,
  WebhookAnalytics,
} from "./models/webhook";
import type {
  Segment,
  CreateSegmentRequest,
  UpdateSegmentRequest,
  SegmentFilter,
  SegmentEvaluationResult,
} from "./models/segment";
import type {
  EmailTemplate,
  SocialConnection,
  SmtpConfigRequest,
  SmtpConfigResponse,
  SmtpVerifyResponse,
} from "./models";
import type {
  AnalyticsStats,
  RecentSignup,
  RecentSignupOrganization,
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
export type { DeploymentB2bSettingsUpdates };
export type {
  JwtTemplate,
  CreateJwtTemplateRequest,
  UpdateJwtTemplateRequest,
  CustomSigningKey,
};
export type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UpdatePasswordRequest,
};
export type { UserEmail, AddEmailRequest, UpdateEmailRequest };
export type { UserPhone, AddPhoneRequest, UpdatePhoneRequest };
export type {
  Organization,
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
  CreateOrganizationRoleRequest,
  UpdateOrganizationRoleRequest,
};
export type { Workspace, CreateWorkspaceRequest, UpdateWorkspaceRequest };
export type {
  WorkspaceMember,
  AddWorkspaceMemberRequest,
  UpdateWorkspaceMemberRequest,
};
export type {
  WorkspaceRole,
  CreateWorkspaceRoleRequest,
  UpdateWorkspaceRoleRequest,
};
export type {
  AiAgent,
  AiAgentWithDetails,
  AgentDetailsResponse,
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
  UseExternalServiceToolConfiguration,
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
  AiSettings,
  UpdateAiSettingsRequest,
  CursorPage,
  AppendProjectTaskBoardItemJournalRequest,
  ProjectTaskBoard,
  ProjectTaskBoardItem,
  CreateProjectTaskBoardItemRequest,
  UpdateProjectTaskBoardItemRequest,
  ProjectTaskBoardItemAssignment,
  ProjectTaskBoardItemEvent,
  TaskWorkspaceListing,
  TaskWorkspaceFileContent,
  ThreadEvent,
  ThreadMessagesResponse,
  ThreadTaskGraph,
  ThreadTaskNode,
  ThreadTaskEdge,
  ThreadTaskGraphSummary,
};
export type {
  Notification,
  CreateNotificationRequest,
  CallToAction,
  NotificationSeverity,
  NotificationStats,
};
export type { ApiAuthApp, CreateApiAuthAppRequest, UpdateApiAuthAppRequest };
export type {
  ApiKey,
  ApiKeyWithSecret,
  CreateApiKeyRequest,
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
};
export type {
  WebhookApp,
  CreateWebhookAppRequest,
  UpdateWebhookAppRequest,
  TriggerWebhookRequest,
};
export type {
  WebhookEndpoint,
  WebhookDelivery,
  WebhookAppEvent,
  WebhookDeliveryDetails,
  WebhookTimeseriesData,
  CreateWebhookEndpointRequest,
  UpdateWebhookEndpointRequest,
  WebhookAnalytics,
};
export type {
  Segment,
  CreateSegmentRequest,
  UpdateSegmentRequest,
  SegmentFilter,
  SegmentEvaluationResult,
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
  SmtpConfigRequest,
  SmtpConfigResponse,
  SmtpVerifyResponse,
};
export type { AnalyticsStats, RecentSignup, RecentSignupOrganization };

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
};
