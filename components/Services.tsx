
import React from 'react';
import { SERVICES, INDUSTRIES, ICON_MAP } from '../constants';
import { Check } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3">What We Do</h2>
          <p className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Technology That Solves Real Business Problems
          </p>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We design and build the systems behind modern businesses — helping you save time, reduce costs, and serve your customers better.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                {ICON_MAP[service.icon]}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              
              <div className="space-y-3 mb-8">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center text-sm font-medium text-slate-700">
                    <Check className="w-4 h-4 mr-2 text-emerald-500" />
                    {benefit}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Category: {service.category}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-indigo-50 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-md text-center lg:text-left">
            <h4 className="text-2xl font-bold text-slate-900 mb-2">Industries We Empower</h4>
            <p className="text-slate-600">Tailored solutions that understand the nuances of the Zambian economic landscape.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {INDUSTRIES.map((industry) => (
              <div key={industry.name} className="flex flex-col items-center group">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm transition-all mb-2">
                  {industry.icon}
                </div>
                <span className="text-sm font-bold text-slate-600">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
