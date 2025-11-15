import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Layout y componentes
import { Layout } from '../components/layout';
import ProtectedRoute from './ProtectedRoute';

// Pages
import { HomePage } from '../modules';
import { LoginPage, RegisterPage } from '../modules/auth';
import { EventsPage } from '../modules/events';
import { ProfilePage } from '../modules/profile';
import { NetworkingPage } from '../modules/networking';
import { AdminPage } from '../modules/admin';

import { ROUTES } from '../utils/constants';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route 
            path={ROUTES.LOGIN} 
            element={
              !isAuthenticated ? <LoginPage /> : <Navigate to={ROUTES.HOME} replace />
            } 
          />
          <Route 
            path={ROUTES.REGISTER} 
            element={
              !isAuthenticated ? <RegisterPage /> : <Navigate to={ROUTES.HOME} replace />
            } 
          />

          {/* Protected Routes - Accesible para todos los usuarios autenticados */}
          <Route
            path={ROUTES.EVENTS}
            element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.NETWORKING}
            element={
              <ProtectedRoute>
                <NetworkingPage />
              </ProtectedRoute>
            }
          />

          {/* 🔥 RUTAS DE ADMINISTRACIÓN - Para organizers Y admin */}
          <Route
            path={ROUTES.ADMIN.DASHBOARD}
            element={
              <ProtectedRoute requiredRole={['organizer', 'admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* 🔥 RUTAS ESPECÍFICAS POR ROL (opcionales para el futuro) */}
          {/* 
          <Route
            path="/admin/super-admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <SuperAdminPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/events/create"
            element={
              <ProtectedRoute requiredRole="organizer">
                <CreateEventPage />
              </ProtectedRoute>
            }
          />
          */}

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