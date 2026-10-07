export type ErrorCode =
    | "USER_NOT_FOUND"
    | "EMAIL_ALREADY_EXISTS"
    | "INVALID_CREDENTIALS"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "INVALID_REFERENCE"
    | "INVALID_RELATION"
    | "DATABASE_ERROR"
    |"INTER_SERVER_ERROR"

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly status: string;
    public readonly errorCode: ErrorCode;
    public readonly isOperational: boolean;
    public readonly details?: unknown;

    constructor(
        message: string,
        statusCode: number,
        errorCode: ErrorCode,
        details?: unknown
    ) {
        super(message);

        this.name = "AppError";
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.errorCode = errorCode;
        this.isOperational = true;
        this.details = details;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}