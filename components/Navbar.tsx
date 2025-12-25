
import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'About', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact', href: '#contact' },
    { name: 'Admin', href: '#admin', isSpecial: true },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <img
                src="../assets/images/logo.png"
                alt="Logo"
              />
              </div>
              <span className={`text-2xl font-extrabold tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                Tech
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center font-medium transition-colors ${
                  link.isSpecial 
                  ? 'text-slate-400 hover:text-indigo-600 text-sm' 
                  : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {link.isSpecial && <Lock size={14} className="mr-1" />}
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full p-4 flex flex-col space-y-4 border-t border-slate-100 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center font-medium text-lg px-2 py-1 ${
                link.isSpecial ? 'text-slate-400 border-t border-slate-50 pt-4' : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              {link.isSpecial && <Lock size={18} className="mr-2" />}
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="bg-indigo-600 text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
