export interface ServiceHealth {
    name: string;
    status: string;
    message?: string;
}

export interface HealthStatus {
    status: string;
    version: string;
    timestamp: string;
    services: ServiceHealth[];
}
