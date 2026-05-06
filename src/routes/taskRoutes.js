const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { authLimiter } = require('../middleware/rateLimit');

const router = express.Router();

router.use(authLimiter, protect);

router.route('/').get(getTasks).post(createTask);
router.route('/:id',).put(updateTask).delete(deleteTask);

module.exports = router;