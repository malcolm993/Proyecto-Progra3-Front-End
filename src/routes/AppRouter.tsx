import React from 'react';
import { HomePage } from '../modules';
import { Layout } from '../components/layout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Pages
import { LoginPage, RegisterPage } from '../modules/auth';
import { EventsPage } from '../modules/events';
import { ProfilePage } from '../modules/profile';
import { NetworkingPage } from '../modules/networking';

// Components
import ProtectedRoute from './ProtectedRoute';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/auth/login" 
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/auth/register" 
          element={
            !isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />
          } 
        />

        {/* Protected Routes */}
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
          
        />

        <Route
          path="/networking"
          element={
            <ProtectedRoute>
              <NetworkingPage />
            </ProtectedRoute>
          }
          
        />

        {/* Admin Routes (solo organizadores) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="organizer">
              <div style={{ padding: '20px' }}>
                <h1>Panel de Administración</h1>
                <p>Esta sección es solo para organizadores</p>
                <p>Aquí podrás gestionar eventos y ver reportes</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>404 - Página No Encontrada</h1>
            <p>La página que buscas no existe.</p>
          </div>
        } />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;