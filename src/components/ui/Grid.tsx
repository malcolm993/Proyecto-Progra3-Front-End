import React from 'react';

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ 
  children, 
  columns = 3, 
  gap = 16,
  className = '' 
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
        gap: `${gap}px`
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Grid;