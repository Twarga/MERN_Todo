// client/src/pages/HomePage.js (update)
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/todos/TodoForm';
import TodoList from '../components/todos/TodoList';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>My Todo List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default HomePage;