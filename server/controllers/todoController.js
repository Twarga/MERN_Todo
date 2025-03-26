// server/controllers/todoController.js
const Todo = require('../models/todoModel');

// @desc    Get all todos
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res) => {
  try {
    const { completed, priority, sortBy, search } = req.query;
    const query = { user: req.user.id }; // Add user filter

    // Filter by completion status
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Search text
    if (search) {
      query.$text = { $search: search };
    }

    // Determine sort order
    let sortOption = { createdAt: -1 }; // Default: newest first
    
    if (sortBy === 'priority') {
      sortOption = { priority: 1, createdAt: -1 };
    } else if (sortBy === 'alphabetical') {
      sortOption = { text: 1 };
    } else if (sortBy === 'dueDate') {
      sortOption = { dueDate: 1, createdAt: -1 };
    }

    const todos = await Todo.find(query).sort(sortOption);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if todo belongs to user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to access this todo' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res) => {
  try {
    const { text, description, priority, dueDate, category } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Please add a text field' });
    }

    const todo = await Todo.create({
      text,
      description,
      priority: priority || 'medium',
      dueDate,
      category: category || 'other',
      user: req.user.id // Add user reference
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if todo belongs to user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this todo' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if todo belongs to user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this todo' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get todo statistics
// @route   GET /api/todos/stats
// @access  Private
const getTodoStats = async (req, res) => {
  try {
    const stats = await Todo.aggregate([
      // Match only todos for the current user
      { $match: { user: req.user._id } },
      // Group by priority
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
          },
          incomplete: {
            $sum: { $cond: [{ $eq: ['$completed', false] }, 1, 0] }
          }
        }
      },
      // Add calculated fields
      {
        $project: {
          priority: '$_id',
          count: 1,
          completed: 1,
          incomplete: 1,
          completionRate: {
            $round: [{ $multiply: [{ $divide: ['$completed', '$count'] }, 100] }, 1]
          },
          _id: 0
        }
      },
      // Sort by priority
      { $sort: { priority: 1 } }
    ]);

    // Get category statistics
    const categoryStats = await Todo.aggregate([
      // Match only todos for the current user
      { $match: { user: req.user._id } },
      // Group by category
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
          }
        }
      },
      // Add calculated fields
      {
        $project: {
          category: '$_id',
          count: 1,
          completed: 1,
          incomplete: { $subtract: ['$count', '$completed'] },
          completionRate: {
            $round: [{ $multiply: [{ $divide: ['$completed', '$count'] }, 100] }, 1]
          },
          _id: 0
        }
      },
      // Sort by count (descending)
      { $sort: { count: -1 } }
    ]);

    // Get overall statistics
    const overallStats = {
      total: await Todo.countDocuments({ user: req.user._id }),
      completed: await Todo.countDocuments({ user: req.user._id, completed: true }),
      overdue: await Todo.countDocuments({
        user: req.user._id,
        completed: false,
        dueDate: { $lt: new Date() }
      })
    };

    // Calculate completion rate
    overallStats.completionRate = overallStats.total > 0
      ? Math.round((overallStats.completed / overallStats.total) * 100)
      : 0;

    res.status(200).json({
      priorities: stats,
      categories: categoryStats,
      overall: overallStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get todos by date range
// @route   GET /api/todos/date-range
// @access  Private
const getTodosByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Please provide start and end dates' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Set end date to end of day
    end.setHours(23, 59, 59, 999);

    const todos = await Todo.find({
      user: req.user.id,
      $or: [
        { createdAt: { $gte: start, $lte: end } },
        { dueDate: { $gte: start, $lte: end } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle todo completion
// @route   PATCH /api/todos/:id/toggle
// @access  Private
const toggleTodoCompletion = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if todo belongs to user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this todo' });
    }

    // Toggle the completed status
    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get todos count by priority and completion status
// @route   GET /api/todos/count
// @access  Private
const getTodosCount = async (req, res) => {
  try {
    const counts = await Todo.aggregate([
      // Match only todos for the current user
      { $match: { user: req.user._id } },
      // Group by priority and completion status
      {
        $group: {
          _id: {
            priority: '$priority',
            completed: '$completed'
          },
          count: { $sum: 1 }
        }
      },
      // Reshape the output
      {
        $project: {
          _id: 0,
          priority: '$_id.priority',
          completed: '$_id.completed',
          count: 1
        }
      },
      // Sort by priority and completion status
      { $sort: { priority: 1, completed: 1 } }
    ]);

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoStats,
  getTodosByDateRange,
  toggleTodoCompletion,
  getTodosCount
};