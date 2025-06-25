import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import corsMiddleware from "./middlewares/corsMiddleware.js"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(corsMiddleware)

// routes

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)
export default app

