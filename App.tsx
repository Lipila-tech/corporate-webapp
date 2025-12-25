
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
import { db } from './services/database';

const App: React.FC = () => {
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    setIsAdminLoggedIn(db.isAdminLoggedIn());
    
    // Check hash for simple routing
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

  if (view === 'admin') {
    if (!isAdminLoggedIn) {
      return <Login onLogin={() => setIsAdminLoggedIn(true)} />;
    }
    return <Dashboard onLogout={() => {
      db.logout();
      setIsAdminLoggedIn(false);
      window.location.hash = '';
    }} />;
  }

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
