import React from 'react';

const STORIES = [
  ['Veticare', 'Mobile services', 'Limopay powers payments in this cross-platform app for hailing veterinary professionals.'],
  ['Tipzed', 'Creator economy', 'A home for Zambian creators to build sustainable income from the content they make.'],
  ['SchAdmin', 'Education', 'A practical cloud system that helps schools organise their daily administration.'],
];

const CaseStudies: React.FC = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-12"><p className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3">Built in Zambia</p><h2 className="text-4xl font-extrabold text-slate-900 mb-5">Real products. Real use cases.</h2><p className="text-xl text-slate-600">Our work spans fintech, the creator economy, education, and mobile services.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{STORIES.map(([name, category, description]) => <div key={name} className="rounded-3xl bg-slate-50 p-8 border border-slate-100"><p className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-3">{category}</p><h3 className="text-2xl font-bold text-slate-900 mb-3">{name}</h3><p className="text-slate-600 leading-relaxed">{description}</p></div>)}</div>
    </div>
  </section>
);

export default CaseStudies;
