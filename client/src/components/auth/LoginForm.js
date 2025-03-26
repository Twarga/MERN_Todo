import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const LoginForm = () => {
  const { login, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  useEffect(() => {
    // Redirect if authenticated
    if (isAuthenticated) {
      navigate('/');
    }
    
    // Clear any errors when component unmounts
    return () => clearError();
  }, [isAuthenticated, navigate, clearError]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Log In</h2>
      
      {error && (
        <div style={{ backgroundColor: '#FECACA', color: '#7F1D1D', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            required
          />
        </div>
        
        <Button
          type="submit"
          style={{ width: '100%', padding: '0.75rem', backgroundColor: '#4F46E5', color: 'white', fontWeight: '500', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;