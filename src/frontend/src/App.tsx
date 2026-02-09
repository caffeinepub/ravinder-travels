import { useState } from 'react';
import MarketingPage from './pages/MarketingPage';
import AdminRequestsPage from './pages/AdminRequestsPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'marketing' | 'admin'>('marketing');

  // Simple view switching based on state
  if (currentView === 'admin') {
    return <AdminRequestsPage onBackToHome={() => setCurrentView('marketing')} />;
  }

  return <MarketingPage onNavigateToAdmin={() => setCurrentView('admin')} />;
}

