export function apiError(
    message: string,
    status: number,
    details?: string
  ) {
    const error = new Error(message) as ApiErrorType;
    error.status = status;
    error.details = details;
    return error;
  }
  
  export interface  ApiErrorType extends Error {
    status: number;
    details?: string;
  }
  