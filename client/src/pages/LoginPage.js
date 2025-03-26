import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Welcome Back</h1>
      <LoginForm />
      <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        Don't have an account? <Link to="/register" style={{ color: '#4F46E5', textDecoration: 'none' }}>Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;