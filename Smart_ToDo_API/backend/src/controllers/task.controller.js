import Task from "../models/Task.model.js";

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.userId,
    });

    res
      .status(201)
      .json({ task, message: "Task created successfully", success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Task creation failed",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res
      .status(200)
      .json({ tasks, success: true, message: "Tasks fetched successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to fetch tasks",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res
      .status(200)
      .json({ task, message: "Task updated successfully", success: true });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Task update failed",
      success: false,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task deletion failed",
      error: error.message,
    });
  }
};
