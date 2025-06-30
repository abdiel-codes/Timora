import express from "express";
import { createGroupTasks, getGroupTasks, deleteGroupTask } from "../controllers/groupTasks/index.js";
import { verifyToken } from "../controllers/auth/index.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, roleMiddleware("user"), getGroupTasks);
router.get("/:id", verifyToken, roleMiddleware("user"), getGroupTasks);
router.post("/", verifyToken, roleMiddleware("user"), createGroupTasks);
//router.put("/:id", verifyToken, roleMiddleware("user"), updateGroupTask);
router.delete("/:id", verifyToken, roleMiddleware("user"), deleteGroupTask);

export default router;
