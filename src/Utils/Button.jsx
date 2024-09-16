import React from 'react';

const Button = ({
  isLoading = false,
  onClick,          
  className = '',
  buttonText = 'Submit', 
  loadingText = 'Loading...', 
  disabled = false,  
}) => {
  return (
    <button
      type="submit"
      className={isLoading ? `loading-button btn ${className}` : `normal-button btn ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <span>{loadingText}</span> : <span>{buttonText}</span>}
    </button>
  );
};

export default Button;
