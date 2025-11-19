export class WachtError extends Error {
    constructor(
        public message: string,
        public status?: number,
        public details?: any
    ) {
        super(message);
        this.name = 'WachtError';
    }
}

export class ApiError extends WachtError {
    constructor(
        status: number,
        message: string,
        details?: any
    ) {
        super(message, status, details);
        this.name = 'ApiError';
    }
}
