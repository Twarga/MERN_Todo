// src/components/layout/Footer.js
import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '1rem',
    marginTop: 'auto',
    textAlign: 'center'
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;