/**
 * Notification model
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
  severity?: NotificationSeverity;
  metadata?: Record<string, unknown>;
  expires_in_hours?: number;
  created_at: string;
  updated_at: string;
}

/**
 * Call to action for notifications
 */
export interface CallToAction {
  label: string;
  url: string;
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
  ctas?: CallToAction[];
  severity?: string;
  metadata?: Record<string, unknown>;
  /** Expiration time in hours */
  expires_in_hours?: number;
}

/**
 * Notification stats
 */
export interface NotificationStats {
  total_sent: number;
  total_delivered: number;
  total_failed: number;
}
