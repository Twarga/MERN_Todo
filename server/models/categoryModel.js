const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      trim: true,
      unique: true
    },
    color: {
      type: String,
      default: '#3498db' // Default blue color
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Category', categorySchema);