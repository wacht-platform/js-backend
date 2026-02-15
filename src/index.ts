/**
 * Wacht SDK for JavaScript/TypeScript
 *
 * @example
 * ```typescript
 * import { initClient, users } from '@wacht/sdk';
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
import { initClient, getClient, isClientInitialized, WachtClient } from './client';
import { WachtError, parseApiError } from './error';
import {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  ServerError,
} from './error';

// Type imports
import type { WachtConfig, PaginatedResponse, ListOptions } from './client';
import type { DeploymentRestrictionsUpdates, CountryRestrictions, MultiSessionSupport } from './models/deployment-restrictions';
import type { DeploymentB2bSettingsUpdates } from './models/b2b-settings';
import type { JwtTemplate, CreateJwtTemplateRequest, UpdateJwtTemplateRequest, CustomSigningKey } from './models/jwt-template';
import type { User, CreateUserRequest, UpdateUserRequest, UpdatePasswordRequest } from './models/user';
import type { UserEmail, AddEmailRequest, UpdateEmailRequest } from './models/user';
import type { UserPhone, AddPhoneRequest, UpdatePhoneRequest } from './models/user';
import type {
  DeploymentInvitation,
  DeploymentWaitlistUser,
  InviteUserRequest,
  UserSocialConnection,
  SessionTicketResponse,
  CreateSessionTicketRequest,
} from './models/user';
import type { Organization, CreateOrganizationRequest, UpdateOrganizationRequest } from './models/organization';
import type { OrganizationMember, AddOrganizationMemberRequest, UpdateOrganizationMemberRequest } from './models/organization';
import type { OrganizationRole, CreateOrganizationRoleRequest, UpdateOrganizationRoleRequest } from './models/organization';
import type { Workspace, CreateWorkspaceRequest, UpdateWorkspaceRequest } from './models/workspace';
import type { WorkspaceMember, AddWorkspaceMemberRequest, UpdateWorkspaceMemberRequest } from './models/workspace';
import type { WorkspaceRole, CreateWorkspaceRoleRequest, UpdateWorkspaceRoleRequest } from './models/workspace';
import type {
  AiAgent,
  CreateAiAgentRequest,
  UpdateAiAgentRequest,
  AgentIntegration,
  CreateAgentIntegrationRequest,
  UpdateAgentIntegrationRequest,
  AiKnowledgeBaseDocument,
  ExecuteAgentRequest,
  ExecuteAgentResponse,
} from './models/ai';
import type { AiTool, CreateAiToolRequest, UpdateAiToolRequest } from './models/ai';
import type { AiKnowledgeBase, CreateAiKnowledgeBaseRequest, UpdateAiKnowledgeBaseRequest } from './models/ai';
import type { AiExecutionContext, CreateAiExecutionContextRequest, UpdateAiExecutionContextRequest } from './models/ai';
import type { Notification, CreateNotificationRequest, CallToAction, NotificationSeverity, NotificationStats } from './models/notification';
import type { ApiAuthApp, CreateApiAuthAppRequest, UpdateApiAuthAppRequest } from './models/api-key';
import type { ApiKey, ApiKeyWithSecret, CreateApiKeyRequest, RevokeApiKeyRequest, RotateApiKeyRequest } from './models/api-key';
import type {
  RateLimit,
  ApiKeyScopeInfo,
  AuthzPrincipalType,
  AuthzDenyReason,
  AuthzPrincipal,
  AuthzCheckRequest,
  AuthzIdentity,
  AuthzRateLimitState,
  AuthzCheckResponse,
} from './models/api-key';
import type {
  WebhookApp,
  CreateWebhookAppRequest,
  UpdateWebhookAppRequest,
  TriggerWebhookRequest,
  WebhookEndpoint,
  WebhookDelivery,
  WebhookEvent,
  WebhookStats,
  WebhookTimeseriesData,
  CreateWebhookEndpointRequest,
  UpdateWebhookEndpointRequest,
  WebhookEventDefinition,
  WebhookEventFilter,
  HttpMethod,
  WebhookDeliveryAttempt,
  WebhookAnalytics,
} from './models/webhook';
import type { Segment, CreateSegmentRequest, UpdateSegmentRequest, SegmentFilter, SegmentEvaluationResult } from './models/segment';
import type {
  EmailTemplate,
  SocialConnection,
  SmtpConfigRequest,
  SmtpConfigResponse,
  SmtpVerifyResponse,
} from './models';
import type { AnalyticsStats, RecentSignup, RecentSignupOrganization } from './models/analytics';

// API modules - namespace exports
import * as users from './api/users';
import * as organizations from './api/organizations';
import * as workspaces from './api/workspaces';
import * as apiKeys from './api/api-keys';
import * as settings from './api/settings';
import * as notifications from './api/notifications';
import * as webhooks from './api/webhooks';
import * as ai from './api/ai';
import * as segments from './api/segments';
import * as invitations from './api/invitations';
import * as analytics from './api/analytics';
import * as utility from './api/utility';
import * as health from './api/health';
import * as gateway from './api/gateway';

// Client exports
export { initClient, getClient, isClientInitialized, WachtClient };
export type { WachtConfig, PaginatedResponse, ListOptions };

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
export type { DeploymentRestrictionsUpdates, CountryRestrictions, MultiSessionSupport };
export type { DeploymentB2bSettingsUpdates };
export type { JwtTemplate, CreateJwtTemplateRequest, UpdateJwtTemplateRequest, CustomSigningKey };
export type { User, CreateUserRequest, UpdateUserRequest, UpdatePasswordRequest };
export type { UserEmail, AddEmailRequest, UpdateEmailRequest };
export type { UserPhone, AddPhoneRequest, UpdatePhoneRequest };
export type { Organization, CreateOrganizationRequest, UpdateOrganizationRequest };
export type { OrganizationMember, AddOrganizationMemberRequest, UpdateOrganizationMemberRequest };
export type { OrganizationRole, CreateOrganizationRoleRequest, UpdateOrganizationRoleRequest };
export type { Workspace, CreateWorkspaceRequest, UpdateWorkspaceRequest };
export type { WorkspaceMember, AddWorkspaceMemberRequest, UpdateWorkspaceMemberRequest };
export type { WorkspaceRole, CreateWorkspaceRoleRequest, UpdateWorkspaceRoleRequest };
export type { AiAgent, CreateAiAgentRequest, UpdateAiAgentRequest };
export type { AiTool, CreateAiToolRequest, UpdateAiToolRequest };
export type { AiKnowledgeBase, CreateAiKnowledgeBaseRequest, UpdateAiKnowledgeBaseRequest };
export type { AiExecutionContext, CreateAiExecutionContextRequest, UpdateAiExecutionContextRequest };
export type {
  AgentIntegration,
  CreateAgentIntegrationRequest,
  UpdateAgentIntegrationRequest,
  AiKnowledgeBaseDocument,
  ExecuteAgentRequest,
  ExecuteAgentResponse,
};
export type { Notification, CreateNotificationRequest, CallToAction, NotificationSeverity, NotificationStats };
export type { ApiAuthApp, CreateApiAuthAppRequest, UpdateApiAuthAppRequest };
export type { ApiKey, ApiKeyWithSecret, CreateApiKeyRequest, RevokeApiKeyRequest, RotateApiKeyRequest };
export type {
  RateLimit,
  ApiKeyScopeInfo,
  AuthzPrincipalType,
  AuthzDenyReason,
  AuthzPrincipal,
  AuthzCheckRequest,
  AuthzIdentity,
  AuthzRateLimitState,
  AuthzCheckResponse,
};
export type { WebhookApp, CreateWebhookAppRequest, UpdateWebhookAppRequest, TriggerWebhookRequest };
export type {
  WebhookEndpoint,
  WebhookDelivery,
  WebhookEvent,
  WebhookStats,
  WebhookTimeseriesData,
  CreateWebhookEndpointRequest,
  UpdateWebhookEndpointRequest,
  WebhookEventDefinition,
  WebhookEventFilter,
  HttpMethod,
  WebhookDeliveryAttempt,
  WebhookAnalytics,
};
export type { Segment, CreateSegmentRequest, UpdateSegmentRequest, SegmentFilter, SegmentEvaluationResult };
export type {
  DeploymentInvitation,
  DeploymentWaitlistUser,
  InviteUserRequest,
  UserSocialConnection,
  SessionTicketResponse,
  CreateSessionTicketRequest,
};
export type { EmailTemplate, SocialConnection, SmtpConfigRequest, SmtpConfigResponse, SmtpVerifyResponse };
export type { AnalyticsStats, RecentSignup, RecentSignupOrganization };

// API module namespace exports
export { users, organizations, workspaces, apiKeys, settings, notifications, webhooks, ai, segments, invitations, analytics, utility, health, gateway };
