import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 60px)' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;