// src/components/todos/TodoItem.js
import React from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { FaEdit, FaTrash, FaCheck, FaHourglass } from 'react-icons/fa';
import Button from '../ui/Button';

const TodoItem = ({ todo }) => {
  const { deleteTodo, updateTodo, setCurrentTodo } = useTodoContext();

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work':
        return '💼';
      case 'personal':
        return '👤';
      case 'shopping':
        return '🛒';
      default:
        return '📝';
    }
  };

  // Toggle completed status
  const toggleCompleted = () => {
    updateTodo(todo._id, { completed: !todo.completed });
  };

  // Handle edit button click
  const handleEdit = () => {
    setCurrentTodo(todo);
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Is the todo overdue?
  const isOverdue = todo.dueDate && !todo.completed && new Date() > new Date(todo.dueDate);

  return (
    <div 
      className={`border rounded-lg p-4 mb-3 shadow-sm transition-all ${
        todo.completed 
          ? 'bg-gray-50 opacity-75' 
          : isOverdue 
            ? 'bg-red-50 border-red-200' 
            : 'bg-white'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleCompleted}
            className={`w-6 h-6 mr-3 rounded-full border flex items-center justify-center ${
              todo.completed 
                ? 'bg-green-500 text-white border-green-500' 
                : 'border-gray-300 hover:border-blue-500'
            }`}
          >
            {todo.completed && <FaCheck className="w-3 h-3" />}
          </button>
          
          <div>
            <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </h3>
            
            {todo.description && (
              <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {todo.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="text-gray-600 hover:text-blue-600"
          >
            <FaEdit />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteTodo(todo._id)}
            className="text-gray-600 hover:text-red-600"
          >
            <FaTrash />
          </Button>
        </div>
      </div>
      
      <div className="mt-3 flex flex-wrap items-center text-sm gap-2">
        <span className={`px-2 py-1 rounded-full ${getPriorityColor(todo.priority)}`}>
          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
        </span>
        
        <span className="flex items-center px-2 py-1 bg-gray-100 rounded-full">
          <span className="mr-1">{getCategoryIcon(todo.category)}</span>
          {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
        </span>
        
        {todo.dueDate && (
          <span className={`flex items-center px-2 py-1 rounded-full ${
            isOverdue ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
          }`}>
            <FaHourglass className="mr-1" />
            {formatDate(todo.dueDate)}
          </span>
        )}
      </div>
    </div>
  );
};

export default TodoItem;