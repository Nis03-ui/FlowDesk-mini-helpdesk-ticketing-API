
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";

import { AppError } from "../utils/AppError";
import { env } from "../config/env";
import { handlePrismaError } from "../utils/PrismaError";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let normalizedError = err;

    // Log the original error for server-side debugging
    console.error(err);

    // 1. Normalize Zod errors
    if (err instanceof ZodError) {
        normalizedError = new AppError(
            "Validation failed",
            400,
            "VALIDATION_ERROR",
            err.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }))
        );
    }

    // 2. Normalize Prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const appError = handlePrismaError(err);

        if (appError) {
            normalizedError = appError;
        }
    }

    // 3. One response path for all known application errors
    if (normalizedError instanceof AppError) {
        return res.status(normalizedError.statusCode).json({
            success: false,
            message: normalizedError.message,
            errorCode: normalizedError.errorCode,
            details: normalizedError.details,
        });
    }

    // 4. Unexpected errors
    let message = "Internal server error";

    if (env.NODE_ENV === "development" && normalizedError instanceof Error) {
        message = normalizedError.message;
    }

    // 5. Safe response for unexpected errors
    return res.status(500).json({
        success: false,
        message,
        errorCode: "INTERNAL_SERVER_ERROR",
    });
}