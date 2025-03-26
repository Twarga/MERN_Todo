// src/components/todos/TodoList.js
import React, { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import TodoItem from './TodoItem';
import Spinner from '../ui/Spinner';

const TodoList = () => {
  const { todos, loading } = useTodoContext();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  if (loading) {
    return <Spinner />;
  }
  
  if (todos.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No todos yet. Add your first todo above!</p>
      </div>
    );
  }
  
  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'high') return todo.priority === 'high';
    if (filter === 'medium') return todo.priority === 'medium';
    if (filter === 'low') return todo.priority === 'low';
    return true;
  });
  
  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === 'priority') {
      const priorityValues = { high: 3, medium: 2, low: 1 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    }
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });
  
  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Todos</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
        
        <div className="text-sm text-gray-600 flex items-center">
          Showing {filteredTodos.length} of {todos.length} todos
        </div>
      </div>
      
      <div>
        {sortedTodos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;