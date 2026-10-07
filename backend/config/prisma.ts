import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env";

const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL,
});

export const prisma = new PrismaClient({
    adapter,
});

export async function testDatabaseConnection() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}