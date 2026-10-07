
import { Prisma } from "../generated/prisma/client";
import { AppError } from "./AppError";

export function handlePrismaError(
    err: Prisma.PrismaClientKnownRequestError
):AppError|undefined {
    if (err.code === "P2002") {
        return new AppError(
            "Email already exists",
            409,
            "EMAIL_ALREADY_EXISTS"
        );
    }else if(err.code==="P2025"){
        return new AppError(
            "Record Not found",
            404,
            "NOT_FOUND"
        )
    }else if(err.code === "P2003"){
        return new AppError(
            "Foreign-key constraint failure",
            400,
            "INVALID_REFERENCE"
        )
    }else if(err.code === "P2014"){
        return new AppError(
            "Required relation violation",
            400,
            "INVALID_RELATION"
        )
    }else if(err.code === "P2021"){
        return new AppError(
            "Table does not exist",
            500,
            "DATABASE_ERROR"
        )
    }else if(err.code === "P2022"){
        return new AppError(
            "Column does not exist",
            500,
            "DATABASE_ERROR"
        )
    }


}