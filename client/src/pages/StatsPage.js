import React from 'react';
import { useTodoContext } from '../context/TodoContext';

const StatsPage = () => {
  const { todos } = useTodoContext();
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Todo Statistics</h1>
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <p>Total Todos: {todos.length}</p>
        <p>Completed Todos: {todos.filter(todo => todo.completed).length}</p>
      </div>
    </div>
  );
};

export default StatsPage;