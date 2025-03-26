// src/components/todos/TodoForm.js
import React, { useState, useEffect } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import Button from '../ui/Button';

const TodoForm = () => {
  const { addTodo, updateTodo, currentTodo, setCurrentTodo } = useTodoContext();
  
  const [formData, setFormData] = useState({
    text: '',
    description: '',
    priority: 'medium',
    category: 'other',
    dueDate: ''
  });
  
  // If currentTodo is set, populate the form for editing
  useEffect(() => {
    if (currentTodo) {
      setFormData({
        text: currentTodo.text || '',
        description: currentTodo.description || '',
        priority: currentTodo.priority || 'medium',
        category: currentTodo.category || 'other',
        dueDate: currentTodo.dueDate ? new Date(currentTodo.dueDate).toISOString().slice(0, 10) : ''
      });
    }
  }, [currentTodo]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the data
    const todoData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null
    };
    
    if (currentTodo) {
      // Update existing todo
      updateTodo(currentTodo._id, todoData);
    } else {
      // Add new todo
      addTodo(todoData);
    }
    
    // Reset form
    resetForm();
  };
  
  const resetForm = () => {
    setFormData({
      text: '',
      description: '',
      priority: 'medium',
      category: 'other',
      dueDate: ''
    });
    setCurrentTodo(null);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {currentTodo ? 'Edit Todo' : 'Add New Todo'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="text">
            Todo Text
          </label>
          <input
            type="text"
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What needs to be done?"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add details about this task..."
            rows="3"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="dueDate">
              Due Date (Optional)
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          {currentTodo && (
            <Button 
              type="button" 
              variant="secondary" 
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" variant="primary">
            {currentTodo ? 'Update Todo' : 'Add Todo'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;