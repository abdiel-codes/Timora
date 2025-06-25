import express from "express";
import { createTasks, getTasks, updateTask, deleteTask } from "../controllers/tasks/index.js";
import { verifyToken } from "../controllers/auth/index.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, roleMiddleware("user"), getTasks);
router.get("/:id", verifyToken, roleMiddleware("user"), getTasks);
router.post("/", verifyToken, roleMiddleware("user"), createTasks);
router.put("/:id", verifyToken, roleMiddleware("user"), updateTask);
router.delete("/:id", verifyToken, roleMiddleware("user"), deleteTask);

export default router;



