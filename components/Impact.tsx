import React from 'react';

const IMPACT = [
  ['Zambia', 'Where we started'],
  ['Africa', 'Where we are going'],
  ['3 products', 'Built for real users'],
];

const Impact: React.FC = () => (
  <section className="py-16 bg-indigo-600 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      {IMPACT.map(([value, label]) => <div key={value}><div className="text-3xl font-extrabold mb-2">{value}</div><div className="text-indigo-100">{label}</div></div>)}
    </div>
  </section>
);

export default Impact;
