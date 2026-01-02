
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
            <p className="text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
              Driving Digital Transformation from the heart of Zambia.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Founded with the vision to bridge the technological gap in Southern Africa, Lipila Technologies Limited has grown from a small consultancy to a multi-product tech house. We pride ourselves on local knowledge combined with global engineering standards.
            </p>
            
            <ul className="space-y-4">
              {[
                "Local expertise with global standards",
                "Customer-centric software architecture",
                "Robust security and data privacy",
                "Scalable infrastructure for growing businesses"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="mt-1 mr-3 text-emerald-500">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 p-6 bg-indigo-600 rounded-2xl text-white">
              <div className="text-3xl font-bold mb-1">3</div>
              <div className="text-indigo-100 text-sm">Active Enterprises Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
