/**
 * API Error Response Utility
 * Standardizes error responses across all API routes
 */

export interface ApiErrorResponse {
  success: false;
  error: string;
  code: string;
  details?: any;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export class ApiError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown, context?: string) => {
  console.error(`[API Error${context ? ` - ${context}` : ''}]`, error);

  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      body: {
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
      } as ApiErrorResponse,
    };
  }

  if (error instanceof Error) {
    return {
      statusCode: 500,
      body: {
        success: false,
        error: error.message || 'Internal server error',
        code: 'INTERNAL_ERROR',
      } as ApiErrorResponse,
    };
  }

  return {
    statusCode: 500,
    body: {
      success: false,
      error: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
    } as ApiErrorResponse,
  };
};

export const successResponse = <T,>(data: T): ApiSuccessResponse<T> => ({
  success: true,
  data,
});
