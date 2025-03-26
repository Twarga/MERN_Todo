import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const RegisterForm = () => {
  const { register, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [passwordError, setPasswordError] = useState('');
  
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
    
    // Clear password error when typing in password fields
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordError('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Register user
    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
      
      {error && (
        <div style={{ backgroundColor: '#FECACA', color: '#7F1D1D', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            required
          />
        </div>
        
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
        
        <div style={{ marginBottom: '1rem' }}>
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
            minLength="6"
            required
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            required
          />
          {passwordError && (
            <p style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {passwordError}
            </p>
          )}
        </div>
        
        <Button
          type="submit"
          style={{ width: '100%', padding: '0.75rem', backgroundColor: '#4F46E5', color: 'white', fontWeight: '500', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;