import React from 'react';

const QUESTIONS = [
  ['Can you help if we cannot access a mobile money API?', 'Yes. Limopay is designed to bridge that gap so your app or business system can accept mobile money without managing every provider integration yourself.'],
  ['Do I need a technical team to use your products?', 'No. Our SaaS platforms are designed for everyday teams. For custom systems, we explain the process and manage the technical work with you.'],
  ['Who do you work with?', 'We work with creators, schools, small businesses, sole proprietors, startups, and organisations that need practical digital tools.'],
];

const FAQ: React.FC = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12"><p className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3">Questions</p><h2 className="text-4xl font-extrabold text-slate-900">Simple answers</h2></div>
      <div className="space-y-4">{QUESTIONS.map(([question, answer]) => <details key={question} className="bg-white rounded-2xl border border-slate-100 p-6 group"><summary className="font-bold text-lg text-slate-900 cursor-pointer list-none">{question}</summary><p className="text-slate-600 leading-relaxed mt-4">{answer}</p></details>)}</div>
    </div>
  </section>
);

export default FAQ;
