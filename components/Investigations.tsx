import React from 'react';
import { Globe2, FileSearch, LockKeyhole } from 'lucide-react';

const Investigations: React.FC = () => (
  <section id="investigations" className="py-24 bg-indigo-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-14 items-start">
        <div className="flex-1">
          <p className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3">Investigations &amp; Advisory</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Clarity for complex corporate and private matters.</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Lipila’s investigations practice builds on the company’s origins as Pesa Consulting &amp; Investigations. We work discreetly with private and corporate clients internationally, helping them establish facts, understand exposure, and make responsible decisions.
          </p>
          <a href="#contact" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            Discuss a confidential matter
          </a>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
          {[
            ['Discreet engagement', 'Professional handling of sensitive information.', LockKeyhole],
            ['Evidence-led work', 'Clear findings to support sound decisions.', FileSearch],
            ['International outlook', 'Support for clients beyond Zambia.', Globe2],
          ].map(([title, description, Icon]) => (
            <div key={title as string} className="bg-white rounded-2xl p-6 border border-indigo-100">
              {React.createElement(Icon as React.ElementType, { className: 'w-7 h-7 text-indigo-600 mb-5' })}
              <h3 className="font-bold text-slate-900 mb-2">{title as string}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{description as string}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Investigations;
