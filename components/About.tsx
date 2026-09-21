
import React from 'react';
import GoogleImage from './GoogleImage'
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  const img1Url = "https://drive.google.com/file/d/1GgZsG7fvRT-go_d_0Ppg3cAPNOutCMZG/view?usp=drive_link";
  const img2Url = "https://drive.google.com/file/d/1YLCm-201x279qgGyiAYfMeyEyU7tooB3/view?usp=drive_link";

  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 grid grid-cols-2 gap-4">
            {img2Url && <GoogleImage driveUrl={img2Url} alt="Tean work image" className="rounded-2xl shadow-lg mt-8"/>}
            {img1Url && <GoogleImage driveUrl={img1Url} alt="Simple Office Life" className="rounded-2xl shadow-lg"/>}
          </div>
          
          <div className="flex-1">
            <h2 className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3">About Lipila</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Lipila Technologies Limited is a Zambian technology and investigations company. Founded as Pesa Consulting &amp; Investigations in 2013, the company was incorporated in 2014 as Lipila Technologies Limited.
            </p>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Today, we combine cloud-based platforms and the Limopay API gateway with dedicated cybersecurity services, including IT vulnerability assessments, system upgrades, penetration testing, and malware analysis. We also support private and corporate clients through discreet, evidence-led investigations.
            </p>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Our products include Tipzed (helping creators monetize content), SchAdmin (school management system), and Limopay (mobile money integration platform). Each solves real problems for real African businesses.
            </p>
            
            <ul className="space-y-4">
              {[
                "Built in Zambia, with an African perspective",
                "Designed for small businesses and creators",
                "Cloud-based, accessible from anywhere",
                "Practical cybersecurity and investigations support"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-500">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

           {/* <div className="mt-10 p-6 bg-indigo-600 rounded-2xl text-white">
              <div className="text-3xl font-bold mb-1">3</div>
              <div className="text-indigo-100 text-sm">Active Enterprises Served</div>
            </div>*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
