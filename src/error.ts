/**
 * Custom error class for Wacht SDK errors
 */
export class WachtError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'WachtError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * API error response from the backend
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Validation error for request parameters
 */
export class ValidationError extends WachtError {
  constructor(message: string, details?: unknown) {
    super(message, 400, details);
    this.name = 'ValidationError';
  }
}

/**
 * Authentication error
 */
export class AuthenticationError extends WachtError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

/**
 * Authorization error
 */
export class AuthorizationError extends WachtError {
  constructor(message: string = 'Authorization failed') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

/**
 * Not found error
 */
export class NotFoundError extends WachtError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Conflict error
 */
export class ConflictError extends WachtError {
  constructor(message: string) {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

/**
 * Rate limit error
 */
export class RateLimitError extends WachtError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}

/**
 * Server error
 */
export class ServerError extends WachtError {
  constructor(message: string = 'Internal server error') {
    super(message, 500);
    this.name = 'ServerError';
  }
}

/**
 * Parse an API error and return the appropriate WachtError
 */
export function parseApiError(statusCode: number, data: unknown): WachtError {
  const apiError = data as ApiError;
  const message = apiError.message || 'An error occurred';

  switch (statusCode) {
    case 400:
      return new ValidationError(message, apiError.details);
    case 401:
      return new AuthenticationError(message);
    case 403:
      return new AuthorizationError(message);
    case 404:
      return new NotFoundError(message);
    case 409:
      return new ConflictError(message);
    case 429:
      return new RateLimitError(message);
    case 500:
    case 502:
    case 503:
      return new ServerError(message);
    default:
      return new WachtError(message, statusCode, apiError.details);
  }
}
