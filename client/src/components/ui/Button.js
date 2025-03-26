// src/components/ui/Button.js
import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  // Base styles
  let buttonClasses = 'font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ';
  
  // Variant styles
  switch (variant) {
    case 'primary':
      buttonClasses += 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 ';
      break;
    case 'secondary':
      buttonClasses += 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 ';
      break;
    case 'success':
      buttonClasses += 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 ';
      break;
    case 'danger':
      buttonClasses += 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 ';
      break;
    case 'outline':
      buttonClasses += 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 ';
      break;
    default:
      buttonClasses += 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 ';
  }
  
  // Size styles
  switch (size) {
    case 'sm':
      buttonClasses += 'px-3 py-1 text-sm ';
      break;
    case 'md':
      buttonClasses += 'px-4 py-2 ';
      break;
    case 'lg':
      buttonClasses += 'px-6 py-3 text-lg ';
      break;
    default:
      buttonClasses += 'px-4 py-2 ';
  }
  
  // Add any custom classes
  buttonClasses += className;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;