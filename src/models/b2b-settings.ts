/**
 * Deployment B2B (Business-to-Business) settings
 */
export interface DeploymentB2bSettingsUpdates {
  // Organization/Workspace Enablement
  /** Enable organizations feature */
  organizations_enabled?: boolean;
  /** Enable workspaces feature */
  workspaces_enabled?: boolean;
  /** Enable IP allowlist per organization */
  ip_allowlist_per_org_enabled?: boolean;

  // Organization Controls
  /** Allow users to create organizations */
  allow_users_to_create_orgs?: boolean;
  /** Maximum allowed organization members */
  max_allowed_org_members?: number;
  /** Allow organization deletion */
  allow_org_deletion?: boolean;
  /** Enable custom organization roles */
  custom_org_role_enabled?: boolean;
  /** Default organization creator role ID */
  default_org_creator_role_id?: number;
  /** Default organization member role ID */
  default_org_member_role_id?: number;
  /** Limit organization creation per user */
  limit_org_creation_per_user?: boolean;
  /** Organization creation per user count */
  org_creation_per_user_count?: number;
  /** Organization permissions */
  organization_permissions?: string[];

  // Workspace Controls
  /** Maximum allowed workspace members */
  max_allowed_workspace_members?: number;
  /** Allow workspace deletion */
  allow_workspace_deletion?: boolean;
  /** Enable custom workspace roles */
  custom_workspace_role_enabled?: boolean;
  /** Default workspace creator role ID */
  default_workspace_creator_role_id?: number;
  /** Default workspace member role ID */
  default_workspace_member_role_id?: number;
  /** Limit workspace creation per organization */
  limit_workspace_creation_per_org?: boolean;
  /** Workspaces per organization count */
  workspaces_per_org_count?: number;
  /** Workspace permissions */
  workspace_permissions?: string[];
  /** Enable IP allowlist per workspace */
  ip_allowlist_per_workspace_enabled?: boolean;

  // MFA Enforcement
  /** Enforce MFA per organization */
  enforce_mfa_per_org_enabled?: boolean;
  /** Enforce MFA per workspace */
  enforce_mfa_per_workspace_enabled?: boolean;

  // SSO
  /** Enable enterprise SSO */
  enterprise_sso_enabled?: boolean;
}
