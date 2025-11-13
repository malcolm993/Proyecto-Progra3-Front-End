import React from 'react';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`} style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{ 
          display: 'block', 
          marginBottom: '8px',
          fontWeight: '500',
          color: error ? '#dc3545' : '#333'
        }}>
          {label}
          {required && <span style={{ color: '#dc3545' }}> *</span>}
        </label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: `1px solid ${error ? '#dc3545' : '#d9d9d9'}`,
          borderRadius: '6px',
          fontSize: '16px',
          transition: 'border-color 0.2s',
          backgroundColor: disabled ? '#f5f5f5' : 'white',
          cursor: disabled ? 'not-allowed' : 'text',
          color: '#333'
        }}
        onFocus={(e) => {
          if (!disabled) {
            e.target.style.borderColor = error ? '#dc3545' : '#1890ff';
          }
        }}
        onBlur={(e) => {
          if (!disabled) {
            e.target.style.borderColor = error ? '#dc3545' : '#d9d9d9';
          }
        }}
      />
      
      {error && (
        <div style={{ 
          color: '#dc3545', 
          fontSize: '14px', 
          marginTop: '4px' 
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;