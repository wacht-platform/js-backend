/**
 * Notification model (response). Mirrors the backend `Notification` response.
 */
export interface Notification {
  id: string;
  deployment_id: string;
  user_id?: string;
  organization_id?: string;
  workspace_id?: string;
  title: string;
  body: string;
  ctas?: CallToAction[];
  severity: NotificationSeverity;
  is_read: boolean;
  read_at?: string;
  is_archived: boolean;
  archived_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  expires_at?: string;
}

/**
 * Call to action for notifications
 */
export interface CallToAction {
  label: string;
  payload: string;
}

/**
 * Notification severity levels
 */
export type NotificationSeverity = 'info' | 'success' | 'warning' | 'error';

/**
 * Request to create a notification
 */
export interface CreateNotificationRequest {
  /** Single user ID */
  user_id?: string;
  /** Multiple user IDs for bulk notification */
  user_ids?: string[];
  /** Organization ID for org-wide notifications */
  organization_id?: string;
  /** Workspace ID for workspace-wide notifications */
  workspace_id?: string;
  title: string;
  body: string;
  /** Convenience single-CTA: paired with `action_label` when `ctas` is omitted. */
  action_url?: string;
  /** Label for the `action_url` CTA. Defaults to "View" on the backend. */
  action_label?: string;
  ctas?: CallToAction[];
  severity?: NotificationSeverity;
  metadata?: Record<string, unknown>;
  /** Expiration time in hours */
  expires_hours?: number;
}

/**
 * Notification stats
 */
export interface NotificationStats {
  total_sent: number;
  total_delivered: number;
  total_failed: number;
}
