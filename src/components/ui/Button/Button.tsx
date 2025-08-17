import React from 'react';
import './Button.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'|'inlining';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const buttonClasses = `
    ubikha-button
    ubikha-button--${variant}
    ubikha-button--${size}
    ${fullWidth ? 'ubikha-button--full-width' : ''}
    ${loading ? 'ubikha-button--loading' : ''}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {loading && <span className="ubikha-button-spinner"></span>}
      <span className={loading ? 'ubikha-button-content--loading' : ''}>
        {children}
      </span>
    </button> 
  );
};
