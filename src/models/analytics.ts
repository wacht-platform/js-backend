/**
 * Analytics stats summary
 */
export interface AnalyticsStats {
  total_users: number;
  active_users: number;
  total_organizations: number;
  total_workspaces: number;
  new_users_today: number;
  new_users_this_week: number;
  new_users_this_month: number;
  daily_metrics?: DailyAuthMetric[];
}

/**
 * Day-wise auth activity
 */
export interface DailyAuthMetric {
  day: string;
  signins: number;
  signups: number;
}

/**
 * Recent signup
 */
export interface RecentSignup {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email_address?: string;
  phone_number?: string;
  created_at: string;
}

/**
 * Recent signup organization
 */
export interface RecentSignupOrganization {
  id: string;
  name: string;
  created_at: string;
}
