import React from 'react';
import { Bug, RefreshCw, SearchCheck, ShieldCheck } from 'lucide-react';

const SERVICES = [
  {
    title: 'IT Vulnerability Assessments',
    description: 'Identify weaknesses across your systems, applications, and infrastructure before they become costly incidents.',
    icon: SearchCheck,
  },
  {
    title: 'Penetration Testing',
    description: 'Assess how systems withstand realistic attack scenarios and turn findings into practical security priorities.',
    icon: ShieldCheck,
  },
  {
    title: 'System Upgrades',
    description: 'Improve outdated or exposed systems with security-focused upgrade and remediation support.',
    icon: RefreshCw,
  },
  {
    title: 'Malware Analysis',
    description: 'Understand suspicious files or activity, contain risk, and support informed response and recovery decisions.',
    icon: Bug,
  },
];

const Cybersecurity: React.FC = () => (
  <section id="cybersecurity" className="py-24 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-14">
        <p className="text-indigo-300 font-bold tracking-wider uppercase text-sm mb-3">Cybersecurity Services</p>
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Strengthen your systems before risk becomes disruption.</h2>
        <p className="text-lg text-slate-300 leading-relaxed">
          Our security services give businesses and organisations a clearer view of their digital risks and a practical path to stronger systems.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map(({ title, description, icon: Icon }) => (
          <article key={title} className="p-6 rounded-3xl bg-slate-800 border border-slate-700">
            <Icon className="w-8 h-8 text-emerald-400 mb-6" />
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-slate-300 leading-relaxed">{description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Cybersecurity;
