import React from 'react';
import { ArrowUpRight, CreditCard, GraduationCap, Sparkles } from 'lucide-react';

const PRODUCTS = [
  {
    name: 'Tipzed',
    label: 'For creators',
    description: 'A platform that helps Zambian creators earn from the content and communities they build.',
    href: 'https://tipzed.space',
    icon: Sparkles,
  },
  {
    name: 'SchAdmin',
    label: 'For schools',
    description: 'Cloud-based school management that keeps administrators, teachers, learners, and families connected.',
    href: 'https://schadmin.cloud',
    icon: GraduationCap,
  },
  {
    name: 'Limopay',
    label: 'For businesses and developers',
    description: 'Our payment gateway makes it easier to add mobile money payments to apps and business systems.',
    href: 'https://sandbox.lipila.tech',
    icon: CreditCard,
  },
];

const Products: React.FC = () => (
  <section id="products" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-14">
        <p className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3">Our products</p>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Tools built for African realities</h2>
        <p className="text-xl text-slate-600">We turn real challenges into simple cloud products that people can use every day.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRODUCTS.map(({ name, label, description, href, icon: Icon }) => (
          <a key={name} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-7"><Icon /></div>
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-2">{label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{name}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
            <span className="font-bold text-slate-900 inline-flex items-center">Learn more <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Products;
