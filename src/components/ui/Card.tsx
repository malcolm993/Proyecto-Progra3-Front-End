import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  actions, 
  className = '', 
  style = {}
}) => {
  return (
    <div style={{
      backgroundColor: '#db8c57e1',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e8e8e8',
      overflow: 'hidden',
      ...style
    }} className={className}>
      
      {/* Header */}
      {title && (
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e8e8e8',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: '18px', 
            fontWeight: '600',
            color: '#333'
          }}>
            {title}
          </h3>
          {actions && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default Card;