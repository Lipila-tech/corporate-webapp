
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { db } from '../services/api';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (field: keyof FormState, value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    // Immediate validation feedback if field was already touched
    if (touched[field]) {
      const error = validate(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validate(field, formState[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Validation Logic (Remains synchronous)
  const newErrors: FormErrors = {};
  const fields: (keyof FormState)[] = ['name', 'email', 'message'];
  
  fields.forEach(field => {
    const error = validate(field, formState[field]);
    if (error) newErrors[field] = error;
  });

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    return;
  }

  // 2. Begin Async Submission
  setSubmitting(true); // Ensure you have a 'submitting' state defined
  
  try {
    // 3. Save to Django API
    await db.addMessage(formState);

    // 4. Success handling
    setSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
    }, 5000);

  } catch (error) {
    console.error("Message failed to send:", error);
    alert("Sorry, we couldn't send your message right now. Please try again later.");
  } finally {
    setSubmitting(false);
  }
};

  const renderError = (field: keyof FormState) => {
    if (touched[field] && errors[field]) {
      return (
        <div className="flex items-center mt-1 text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          {errors[field]}
        </div>
      );
    }
    return null;
  };

  const getInputClass = (field: keyof FormState) => {
    const baseClass = "w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200";
    if (touched[field] && errors[field]) {
      return `${baseClass} border-red-300 focus:ring-red-200 bg-red-50/30`;
    }
    if (touched[field] && !errors[field] && formState[field]) {
      return `${baseClass} border-emerald-200 focus:ring-emerald-100 bg-emerald-50/10`;
    }
    return `${baseClass} border-slate-200 focus:ring-indigo-500`;
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
                  <div className="text-xl font-bold">lipilatechnologies@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-400">
                  <Phone />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Call Our Office</div>
                  <div className="text-xl font-bold">+260 965 604 023 - +260 963741815</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-400">
                  <MapPin />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Visit Us</div>
                  <div className="text-xl font-bold">Kitwe, Zambia</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white p-8 rounded-3xl text-slate-900 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    className={getInputClass('name')}
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                  />
                  {renderError('name')}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className={getInputClass('email')}
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                  />
                  {renderError('email')}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">How can we help?</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className={getInputClass('message')}
                    placeholder="Tell us about your project..."
                    value={formState.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                  ></textarea>
                  {renderError('message')}
                </div>
                <button
                    type="submit"
                    // Disable if already submitted OR if currently sending
                    disabled={submitted || submitting}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all duration-300 transform active:scale-[0.98] ${
                      submitted 
                        ? 'bg-emerald-500 text-white cursor-default' 
                        : submitting
                          ? 'bg-indigo-400 text-white cursor-wait' // Lighter color and wait cursor during API call
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                    }`}
                  >
                    {submitted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2 animate-in zoom-in duration-300" />
                        Message Sent!
                      </>
                    ) : submitting ? (
                      <>
                        <span className="animate-spin mr-3 text-2xl">🌀</span>
                        Sending Your message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
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
