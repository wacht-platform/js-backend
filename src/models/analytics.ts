export interface RecentSignup {
    user_id: string;
    email: string;
    name: string;
    created_at: string;
    auth_provider: string;
    avatar_url?: string;
}

export interface RecentSignupsResponse {
    signups: RecentSignup[];
}

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
}

export interface AnalyticsStatsOptions {
    from: string;
    to: string;
}
