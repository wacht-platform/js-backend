export interface GenerateTokenRequest {
    session_id: string;
    // Add other fields as needed
    [key: string]: any;
}

export interface GenerateTokenResponse {
    token: string;
    expires_at: string;
}
