import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Create Your Account</h1>
      <RegisterForm />
      <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        Already have an account? <Link to="/login" style={{ color: '#4F46E5', textDecoration: 'none' }}>Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;