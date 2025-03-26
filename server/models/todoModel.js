const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add a text value'],
      trim: true,
      maxlength: [100, 'Todo cannot be more than 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    completed: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: '{VALUE} is not a valid priority'
      },
      default: 'medium'
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function(value) {
          // Cannot set due date in the past
          return !value || value > new Date();
        },
        message: 'Due date cannot be in the past'
      }
    },
    category: {
      type: String,
      enum: ['work', 'personal', 'shopping', 'other'],
      default: 'other'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true   // We'll uncomment this when we add user authentication
    }
  },
  {
    timestamps: true
  }
);

// Add a virtual field for "overdue" status
todoSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate) return false;
  return !this.completed && new Date() > this.dueDate;
});

// Add text index for search functionality
todoSchema.index({ text: 'text', description: 'text' });

// Add other indexes for performance
todoSchema.index({ user: 1, createdAt: -1 });
todoSchema.index({ completed: 1 });
todoSchema.index({ priority: 1 });
todoSchema.index({ dueDate: 1 }, { sparse: true });

// Pre-save middleware
todoSchema.pre('save', function(next) {
  // Any pre-save operations can go here
  // For example, we could automatically set high priority if the due date is close
  next();
});

module.exports = mongoose.model('Todo', todoSchema);