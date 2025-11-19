import { getClient } from '../client';
import {
    DeploymentSettingsResponse,
    AuthenticationSettings,
    DisplaySettings,
    B2BSettings,
    DeploymentRestrictions,
    JwtTemplateListResponse,
    CreateJwtTemplateRequest,
    JwtTemplate,
    UpdateJwtTemplateRequest,
    EmailTemplate,
    SocialConnection,
    ImageUploadResponse,
} from '../models/settings';
import FormData from 'form-data';

/**
 * Fetch deployment settings
 */
export async function fetchDeploymentSettings(): Promise<DeploymentSettingsResponse> {
    const client = getClient();
    const response = await client.get<DeploymentSettingsResponse>('/');
    return response.data;
}

/**
 * Update authentication settings
 */
export async function updateAuthenticationSettings(
    settings: AuthenticationSettings
): Promise<void> {
    const client = getClient();
    await client.patch('/settings/auth-settings', settings);
}

/**
 * Update display settings
 */
export async function updateDisplaySettings(settings: DisplaySettings): Promise<void> {
    const client = getClient();
    await client.patch('/settings/display-settings', settings);
}

/**
 * Update B2B settings
 */
export async function updateB2BSettings(settings: B2BSettings): Promise<void> {
    const client = getClient();
    await client.patch('/settings/b2b-settings', settings);
}

/**
 * Update deployment restrictions
 */
export async function updateDeploymentRestrictions(
    restrictions: DeploymentRestrictions
): Promise<void> {
    const client = getClient();
    await client.patch('/restrictions', restrictions);
}

/**
 * Fetch JWT templates
 */
export async function fetchJwtTemplates(): Promise<JwtTemplateListResponse> {
    const client = getClient();
    const response = await client.get<JwtTemplateListResponse>('/jwt-templates');
    return response.data;
}

/**
 * Create JWT template
 */
export async function createJwtTemplate(
    request: CreateJwtTemplateRequest
): Promise<JwtTemplate> {
    const client = getClient();
    const response = await client.post<JwtTemplate>('/jwt-templates', request);
    return response.data;
}

/**
 * Update JWT template
 */
export async function updateJwtTemplate(
    templateId: string,
    request: UpdateJwtTemplateRequest
): Promise<JwtTemplate> {
    const client = getClient();
    const response = await client.patch<JwtTemplate>(
        `/jwt-templates/${templateId}`,
        request
    );
    return response.data;
}

/**
 * Delete JWT template
 */
export async function deleteJwtTemplate(templateId: string): Promise<void> {
    const client = getClient();
    await client.delete(`/jwt-templates/${templateId}`);
}

/**
 * Fetch email template
 */
export async function fetchEmailTemplate(templateName: string): Promise<EmailTemplate> {
    const client = getClient();
    const response = await client.get<EmailTemplate>(`/email-templates/${templateName}`);
    return response.data;
}

/**
 * Update email template
 */
export async function updateEmailTemplate(
    templateName: string,
    template: EmailTemplate
): Promise<void> {
    const client = getClient();
    await client.patch(`/email-templates/${templateName}`, template);
}

/**
 * Fetch social connections
 */
export async function fetchSocialConnections(): Promise<SocialConnection[]> {
    const client = getClient();
    const response = await client.get<SocialConnection[]>('/social-connections');
    return response.data;
}

/**
 * Upsert social connection
 */
export async function upsertSocialConnection(
    connection: SocialConnection
): Promise<SocialConnection> {
    const client = getClient();
    const response = await client.put<SocialConnection>('/social-connections', connection);
    return response.data;
}

/**
 * Upload image
 */
export async function uploadImage(
    imageType: string,
    fileContent: any,
    fileName: string
): Promise<ImageUploadResponse> {
    const client = getClient();
    const formData = new FormData();
    formData.append('file', fileContent, fileName);

    const response = await client.post<ImageUploadResponse>(
        `/upload/${imageType}`,
        formData,
        {
            headers: {
                // @ts-ignore
                ...formData.getHeaders?.(),
            },
        }
    );
    return response.data;
}
