import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const headerStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none'
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const navListStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const navItemStyle = {
    marginLeft: '1.5rem'
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none'
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>Todo App</Link>
        
        <nav style={navStyle}>
          <ul style={navListStyle}>
            {isAuthenticated ? (
              <>
                <li style={navItemStyle}>
                  <Link to="/" style={navLinkStyle}>Home</Link>
                </li>
                <li style={navItemStyle}>
                  <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
                </li>
                <li style={navItemStyle}>
                  <Link to="/stats" style={navLinkStyle}>Statistics</Link>
                </li>
                <li style={navItemStyle}>
                  <Link to="/profile" style={navLinkStyle}>Profile</Link>
                </li>
                <li style={navItemStyle}>
                  <span style={navLinkStyle}>Hello, {user && user.name}</span>
                </li>
                <li style={navItemStyle}>
                  <button 
                    onClick={logout} 
                    style={buttonStyle}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li style={navItemStyle}>
                  <Link to="/login" style={navLinkStyle}>Login</Link>
                </li>
                <li style={navItemStyle}>
                  <Link to="/register" style={navLinkStyle}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;