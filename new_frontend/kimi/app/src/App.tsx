import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AIAssistantPage } from '@/pages/AIAssistantPage';
import { SimulatorPage } from '@/pages/SimulatorPage';
import { ForecastPage } from '@/pages/ForecastPage';
import { PolicyPage } from '@/pages/PolicyPage';
import { AccountPage } from '@/pages/AccountPage';
import './App.css';

// Wrapper component for authenticated pages with Layout
function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Authenticated Routes with Layout */}
        <Route 
          path="/dashboard" 
          element={
            <AuthenticatedLayout>
              <DashboardPage />
            </AuthenticatedLayout>
          } 
        />
        <Route 
          path="/ai-assistant" 
          element={
            <AuthenticatedLayout>
              <AIAssistantPage />
            </AuthenticatedLayout>
          } 
        />
        <Route 
          path="/simulator" 
          element={
            <AuthenticatedLayout>
              <SimulatorPage />
            </AuthenticatedLayout>
          } 
        />
        <Route 
          path="/forecast" 
          element={
            <AuthenticatedLayout>
              <ForecastPage />
            </AuthenticatedLayout>
          } 
        />

        <Route 
          path="/policy" 
          element={
            <AuthenticatedLayout>
              <PolicyPage />
            </AuthenticatedLayout>
          } 
        />
        <Route 
          path="/account" 
          element={
            <AuthenticatedLayout>
              <AccountPage />
            </AuthenticatedLayout>
          } 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
