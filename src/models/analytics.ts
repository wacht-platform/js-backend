/**
 * Analytics stats summary
 */
export interface AnalyticsStats {
  unique_signins: number;
  signups: number;
  organizations_created: number;
  workspaces_created: number;
  total_signups: number;
  unique_signins_change?: number;
  signups_change?: number;
  organizations_created_change?: number;
  workspaces_created_change?: number;
  daily_metrics: DailyAuthMetric[];
  recent_signups: RecentSignup[];
  recent_signins: RecentSignup[];
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
  name?: string;
  email?: string;
  method?: string;
  date: string;
}
