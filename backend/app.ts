import express from "express"
import { AppError } from "./utils/AppError";
import authRoutes from "./route/auth.route"
import { errorHandler } from "./middleware/error.middleware";

const app=express()

app.use(express.json())

app.use("/api/auth",authRoutes)
app.use(errorHandler)
export default app