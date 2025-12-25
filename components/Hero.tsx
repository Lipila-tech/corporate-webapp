
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TAGLINES } from '../constants';

const Hero: React.FC = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        setIsVisible(true);
      }, 500); // Wait for fade out before switching
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100 rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-6 animate-bounce">
              <Sparkles className="w-4 h-4 mr-2" />
              Empowering African Enterprises
            </div>
            <h1 className="text-5md lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 h-[180px] lg:h-[260px] flex flex-col justify-center">
              Modern Solutions for <br />
              <span 
                className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {TAGLINES[taglineIndex]}
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Lipila Technologies builds scalable SaaS platforms, high-performance payment systems, and bespoke software solutions that drive growth for finance, retail, and education.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#solutions"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center group"
              >
                Our Solutions
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#careers"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all text-center"
              >
                Join Our Team
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-6 text-slate-400">
              <span className="text-sm font-medium">TRUSTED BY TEAMS AT:</span>
              <div className="flex space-x-4 grayscale opacity-60">
                <span className="font-bold text-xl">GOA Veterinary Consultants</span>
                <span className="font-bold text-xl">VetICare</span>
                <span className="font-bold text-xl">SchAdmin</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10 w-full aspect-square max-w-md mx-auto">
              <img
                src="../assets/images/banner.png"
                alt="Technology Illustration"
                className="rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4 animate-pulse">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <ArrowRight />
                </div>
                <div>
                  <div className="font-bold text-slate-900">+12% Conversion</div>
                  <div className="text-xs text-slate-500">Powered by Lipila Payments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
