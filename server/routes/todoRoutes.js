const express = require('express');
const router = express.Router();
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoStats,
  getTodosByDateRange,
  toggleTodoCompletion,
  getTodosCount
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

// Apply auth middleware to all routes
router.use(protect);

// Stats routes
router.get('/stats', getTodoStats);
router.get('/date-range', getTodosByDateRange);
router.get('/count', getTodosCount);

// CRUD routes
router.route('/')
  .get(getTodos)
  .post(createTodo);

router.route('/:id')
  .get(getTodoById)
  .put(updateTodo)
  .delete(deleteTodo);

// Toggle completion
router.patch('/:id/toggle', toggleTodoCompletion);

module.exports = router;