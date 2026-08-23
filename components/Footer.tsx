
import React from 'react';
import { Twitter, Linkedin, Github, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-extrabold text-white">Lipila</span>
            </div>
            <p className="mb-8 max-w-xs leading-relaxed">
              A Zambian technology company building cloud software and payment bridges for African businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><Linkedin size={20} /></a>
              <a href="https://github.com/Lipila-tech/" className="hover:text-indigo-400 transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-4">
              <li><a href="#products" className="hover:text-white transition-colors">Tipzed</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">SchAdmin</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Limopay</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Custom software</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Blog</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Stay Updated</h4>
            <p className="text-sm mb-4">Questions about a product or payment integration?</p>
            <div className="flex">
              <a href="mailto:service@lipila.tech" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700">Email us</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Lipila Technologies Limited. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
