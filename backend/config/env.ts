import dotenv from "dotenv";

dotenv.config();

type NodeEnv = "development" | "production" | "test";

export const env = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: (process.env.NODE_ENV as NodeEnv) || "development",
};