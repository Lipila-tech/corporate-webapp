
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TAGLINES } from '../constants';
import GoogleImage from './GoogleImage'

const Hero: React.FC = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const bannerUrl = "https://drive.google.com/file/d/18qDDZjO2DVVQoIYKTexjRsPE8njH_hV4/view?usp=drive_link";

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50/50">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-0 w-72 h-72 bg-indigo-200 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs sm:text-sm font-semibold mb-8 animate-pulse shadow-sm border border-indigo-100">
              <Sparkles className="w-4 h-4 mr-2" />
              Empowering African Enterprises
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 min-h-[140px] sm:min-h-[160px] lg:min-h-[200px]">
              Modern Solutions for <br className="hidden sm:block" />
              <span 
                className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {TAGLINES[taglineIndex]}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Running a business today is hard when systems don’t talk to each other, payments fail, or software doesn’t fit your needs. 
              Lipila Technologies helps businesses grow by building reliable SaaS platforms, secure payment systems, and custom software that simply works.
            </p>


            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <a
                href="#solutions"
                className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center justify-center group transform hover:-translate-y-1"
              >
                Our Solutions
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#careers"
                className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-slate-200 transition-all text-center transform hover:-translate-y-1"
              >
                Join Our Team
              </a>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-slate-400">
              <span className="text-xs font-bold tracking-widest uppercase">TRUSTED BY TEAMS AT:</span>
              <div className="flex items-center space-x-6 grayscale opacity-60">
                <span className="font-black text-xl tracking-tighter italic">GOA</span>
                <span className="font-black text-xl tracking-tighter italic">VETICARE</span>
                <span className="font-black text-xl tracking-tighter italic">SCHADMIN</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto relative px-4 sm:px-0 mt-8 lg:mt-0">
            <div className="relative z-10 w-full max-w-xl mx-auto lg:max-w-none">
              <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl bg-white p-2">
               {bannerUrl && <GoogleImage driveUrl={bannerUrl} alt="L-tech Banner" className="rounded-[2rem] w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"/>}
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 sm:-bottom-8 -left-2 sm:-left-8 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 flex items-center space-x-4 animate-bounce hover:animate-none transition-all cursor-default hidden sm:flex">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">+24% Efficiency</div>
                  <div className="text-xs text-slate-500">Real-time SaaS monitoring</div>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
