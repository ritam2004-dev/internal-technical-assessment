import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const taskRouter = express.Router();

// All routes are protected
taskRouter.post("/", authMiddleware, createTask);
taskRouter.get("/", authMiddleware, getTasks);
taskRouter.put("/:id", authMiddleware, updateTask);
taskRouter.delete("/:id", authMiddleware, deleteTask);

export default taskRouter;
