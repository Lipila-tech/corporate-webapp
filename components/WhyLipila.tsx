import React from 'react';
import { Cloud, ShieldCheck, Users } from 'lucide-react';

const REASONS = [
  { title: 'We handle the complexity', text: 'You do not need a large technical team to launch. We connect the moving parts and explain everything clearly.', icon: Cloud },
  { title: 'Built for local payments', text: 'Our payment tools help businesses work with mobile money networks and serve customers where they are.', icon: ShieldCheck },
  { title: 'A partner that understands', text: 'We are based in Zambia and are building with the needs of African businesses and creators in mind.', icon: Users },
];

const WhyLipila: React.FC = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3">Why Lipila</p>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Technology that meets you where you are</h2>
        <p className="text-xl text-slate-600">From your first customer to your next African market, we make digital systems easier to adopt and grow.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REASONS.map(({ title, text, icon: Icon }) => (
          <div key={title} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <Icon className="w-8 h-8 text-indigo-600 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyLipila;
