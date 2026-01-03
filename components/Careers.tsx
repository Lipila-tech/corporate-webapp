import React, { useState, useEffect } from 'react';
import { JOBS, CULTURE_POINTS } from '../constants';
import { Briefcase, MapPin, Clock, Calendar, DollarSign, Terminal, Send, CheckCircle } from 'lucide-react';
import { ApplicationFormData } from '../types';
import { db } from '../services/api';

const Careers: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    roleId: '',
    portfolioUrl: '',
    githubUrl: '',
    coverLetter: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = (jobId: string) => {
    setSelectedJob(jobId);
    setFormData(prev => ({ ...prev, roleId: jobId }));
    const formEl = document.getElementById('application-form');
    formEl?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await db.getJobs();
        setJobs(data);
      } catch (err) {
        console.error("Failed to load jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="text-center py-20">Loading positions...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);
  
  try {
    await db.addApplication(formData);
    
    // 2. Success state updates
    setApplied(true);
    setFormData({
      fullName: '',
      email: '',
      roleId: '',
      portfolioUrl: '',
      githubUrl: '',
      coverLetter: ''
    });
    setSelectedJob(null);
  } catch (error) {
    // 3. Error handling
    console.error("Application submission failed:", error);
    alert("There was an error submitting your application. Please try again.");
  } finally {
    // 4. Always stop the loading spinner
    setSubmitting(false);
  }
};

  return (
    <section id="careers" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Culture Section */}
        <div className="text-center mb-16">
          <h2 className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-3">Careers</h2>
          <p className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Build the Future with Lipila</p>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            At Lipila Technologies, we’re always interested in connecting with curious, driven people who want to build meaningful technology.
            Whether we’re actively hiring or simply starting conversations, we believe great teams grow through shared values and passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {CULTURE_POINTS.map((point, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{point.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>

        {/* Job Listings */}
        <div className="space-y-10 max-w-5xl mx-auto mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-bold text-slate-900">Current Openings</h3>
            <span className="text-sm font-semibold text-slate-500">Showing {jobs.length} positions</span>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-indigo-300 transition-all group">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-2xl font-bold text-slate-900">{job.title}</h4>
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">{job.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-slate-400" /> {job.location}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-slate-400" /> {job.commitment}</span>
                      <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-slate-400" /> Starts {job.startDate}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-indigo-600 font-bold text-lg mb-1">{job.compensation}</div>
                    <button 
                      onClick={() => handleApply(job.id)}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all transform active:scale-95"
                    >
                      Quick Apply
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-8 border-t border-slate-50">
                  <div>
                    <h5 className="font-bold text-slate-900 mb-4 flex items-center">
                      <Terminal className="w-4 h-4 mr-2 text-indigo-500" /> Key Stack
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {(job.technologies || ['Strategy', 'Finance', 'Docs']).map((tech) => (
                        <span key={tech} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-bold">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 mb-4">Requirements</h5>
                    <ul className="space-y-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start">
                          <span className="mr-2 text-indigo-400">•</span> {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 mb-4">Responsibilities</h5>
                    <ul className="space-y-2">
                      {job.responsibilities?.map((res, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start">
                          <span className="mr-2 text-emerald-400">•</span> {res}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div id="application-form" className="max-w-3xl mx-auto bg-white p-10 lg:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
          
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Submit Application</h3>
            <p className="text-slate-500">Our team will review your application and get back to you within 5 business days.</p>
          </div>

          {applied ? (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Application Received!</h4>
              <p className="text-slate-600 mb-8">Thank you for your interest in Lipila Technologies. We've saved your application to our systems.</p>
              <button 
                onClick={() => setApplied(false)}
                className="text-indigo-600 font-bold hover:underline"
              >
                Apply for another role
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="E.g. Mwansa Zulu"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="zulu@example.com"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Applying For</label>
                <select 
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                  value={formData.roleId}
                  onChange={(e) => setFormData({...formData, roleId: e.target.value})}
                >
                  <option value="" disabled>Select a position</option>
                  {JOBS.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Portfolio / CV Link</label>
                  <input 
                    type="url" 
                    placeholder="https://drive.google.com/..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">GitHub / LinkedIn</label>
                  <input 
                    type="url" 
                    placeholder="https://github.com/..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Why Lipila? (Briefly tell us your passion)</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell us what excites you about our mission..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 shadow-xl flex items-center justify-center transition-all disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <span className="animate-spin mr-3">🌀</span>
                    Connecting to Database...
                  </>
                ) : (
                  <>
                    Submit Application <Send className="ml-3 w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Careers;
