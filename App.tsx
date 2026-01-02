import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
// Pointing to your new API service
import { db } from './services/api'; 

const App: React.FC = () => {
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Helper to check if a token exists in storage
  const checkAuthStatus = () => {
    const token = localStorage.getItem('access_token');
    setIsAdminLoggedIn(!!token);
  };

  useEffect(() => {
    // Initial check on mount
    checkAuthStatus();
    
    // Listen for hash changes for routing
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      } else {
        setView('public');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    db.logout(); // Clears tokens from localStorage
    setIsAdminLoggedIn(false);
    window.location.hash = ''; // Redirect to public view
  };

  // 1. Admin View Logic
  if (view === 'admin') {
    if (!isAdminLoggedIn) {
      // Pass checkAuthStatus so Login can trigger a state update after API success
      return <Login onLogin={checkAuthStatus} />;
    }
    return <Dashboard onLogout={handleLogout} />;
  }

  // 2. Public View Logic
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Careers />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
      
      {/* Hidden Admin Entry Link */}
      <div className="fixed bottom-4 left-4 z-50 opacity-0 hover:opacity-100 transition-opacity">
        <a href="#admin" className="text-[10px] text-slate-300">Admin Login</a>
      </div>
    </div>
  );
};

export default App;