const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const Task = require('../models/Task');

const createTask = asyncHandler(async (req, res, next) => {
  const { title, description = '', status = 'pending' } = req.body;

  if (!title || !title.trim()) {
    return next(new AppError('Title is required', 400));
  }

  const task = await Task.create({
    title: title.trim(),
    description: description.trim(),
    status,
    userId: req.user._id
  });

  res.status(201).json(task);
});

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
});

const updateTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, userId: req.user._id });

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  const { title, description, status } = req.body;

  if (typeof title === 'string' && title.trim()) {
    task.title = title.trim();
  }

  if (typeof description === 'string') {
    task.description = description.trim();
  }

  if (status) {
    task.status = status;
  }

  const updatedTask = await task.save();
  res.json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });

  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  res.json({ message: 'Task deleted successfully' });
});

module.exports = { createTask, getTasks, updateTask, deleteTask };