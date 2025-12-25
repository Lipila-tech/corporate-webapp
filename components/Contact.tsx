
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900/20 skew-x-12 transform origin-top pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1">
            <h2 className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-4">Contact Us</h2>
            <p className="text-4xl lg:text-5xl font-extrabold mb-8">Let's build something <span className="text-indigo-400">extraordinary</span> together.</p>
            
            <div className="space-y-8 mt-12">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-400">
                  <Mail />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Email Support</div>
                  <div className="text-xl font-bold">hello@lipila.co.zm</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-400">
                  <Phone />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Call Our Office</div>
                  <div className="text-xl font-bold">+260 970 000 000</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-400">
                  <MapPin />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Visit Us</div>
                  <div className="text-xl font-bold">123 Innovative Way, Lusaka, Zambia</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white p-8 rounded-3xl text-slate-900 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">How can we help?</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    placeholder="Tell us about your project..."
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all ${submitted ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  {submitted ? 'Message Sent!' : 'Send Message'}
                  <Send className={`ml-2 w-5 h-5 ${submitted ? 'hidden' : 'block'}`} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
