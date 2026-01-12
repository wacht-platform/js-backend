export interface AuthenticationSettings {
    // Define fields
    [key: string]: any;
}

export interface DisplaySettings {
    // Define fields
    [key: string]: any;
}

export interface B2BSettings {
    // Define fields
    [key: string]: any;
}

export interface DeploymentRestrictions {
    // Define fields
    [key: string]: any;
}

export interface JwtTemplate {
    id: string;
    name: string;
    template: string;
    created_at: string;
    updated_at: string;
}

export interface CreateJwtTemplateRequest {
    name: string;
    template: string;
}

export interface UpdateJwtTemplateRequest {
    name?: string;
    template?: string;
}

export interface EmailTemplate {
    template_name: string;
    template_data: string;
    template_from: string;
    template_reply_to: string;
    template_subject: string;
}

export interface SocialConnection {
    provider: string;
    client_id: string;
    client_secret: string;
    is_active: boolean;
}

export interface ImageUploadResponse {
    url: string;
}

export interface DeploymentSettingsResponse {
    id: string;
    name: string;
    authentication_settings: AuthenticationSettings;
    display_settings: DisplaySettings;
    b2b_settings: B2BSettings;
    restrictions: DeploymentRestrictions;
}

export interface JwtTemplateListResponse {
    data: JwtTemplate[];
}
