import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const ProfilePage = () => {
  const { user, updateProfile, deleteAccount, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        name: user.name || '',
        email: user.email || ''
      }));
    }
    
    // Clear any errors when component unmounts
    return () => clearError();
  }, [user, clearError]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear password error when typing in password fields
    if (['newPassword', 'confirmNewPassword'].includes(e.target.name)) {
      setPasswordError('');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    // Check if we're updating password
    if (formData.newPassword) {
      // Validate password match
      if (formData.newPassword !== formData.confirmNewPassword) {
        setPasswordError('New passwords do not match');
        return;
      }
    }



// Update profile
try {
  await updateProfile({
    name: formData.name,
    currentPassword: formData.password,
    newPassword: formData.newPassword || undefined
  });
  
  setMessage('Profile updated successfully');
  
  // Clear password fields
  setFormData(prevState => ({
    ...prevState,
    password: '',
    newPassword: '',
    confirmNewPassword: ''
  }));
} catch (err) {
  console.error('Profile update error:', err);
}
};

const handleDeleteAccount = async () => {
const confirmed = window.confirm(
  'Are you sure you want to delete your account? This action cannot be undone and all your todos will be permanently deleted.'
);

if (confirmed) {
  try {
    await deleteAccount();
    navigate('/login');
  } catch (err) {
    console.error('Error deleting account:', err);
  }
}
};

return (
<div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
  <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>User Profile</h1>
  
  <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
    {message && (
      <div style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1.5rem' }}>
        {message}
      </div>
    )}
    
    {error && (
      <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1.5rem' }}>
        {error}
      </div>
    )}
    
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '0.25rem' }}
          required
        />
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '0.25rem', backgroundColor: '#F3F4F6' }}
          disabled
        />
        <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#6B7280' }}>
          Email cannot be changed
        </p>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem' }}>
          Change Password
        </h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Current Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '0.25rem' }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '0.25rem' }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '0.25rem' }}
          />
          {passwordError && (
            <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#DC2626' }}>
              {passwordError}
            </p>
          )}
        </div>
      </div>
      
      <div>
        <Button
          type="submit"
          style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.25rem',
            border: 'none',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Update Profile
        </Button>
      </div>
    </form>
    
    <div style={{ marginTop: '3rem', borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#DC2626', marginBottom: '1rem' }}>
        Danger Zone
      </h2>
      <Button
        type="button"
        onClick={handleDeleteAccount}
        style={{
          backgroundColor: '#DC2626',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.25rem',
          border: 'none',
          fontWeight: '500',
          cursor: 'pointer'
        }}
      >
        Delete Account
      </Button>
      <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
        This will permanently delete your account and all your todos.
      </p>
    </div>
  </div>
</div>
);
};

export default ProfilePage;