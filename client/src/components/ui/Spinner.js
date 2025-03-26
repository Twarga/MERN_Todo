// src/components/ui/Spinner.js
import React from 'react';

const Spinner = ({ size = 'md' }) => {
  let spinnerSize;
  
  switch (size) {
    case 'sm':
      spinnerSize = 'w-5 h-5';
      break;
    case 'md':
      spinnerSize = 'w-8 h-8';
      break;
    case 'lg':
      spinnerSize = 'w-12 h-12';
      break;
    default:
      spinnerSize = 'w-8 h-8';
  }
  
  return (
    <div className="flex justify-center items-center">
      <div className={`${spinnerSize} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
    </div>
  );
};

export default Spinner;