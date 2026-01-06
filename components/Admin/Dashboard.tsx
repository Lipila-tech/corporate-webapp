
import React, { useState, useEffect } from 'react';
import { 
  Users, Briefcase, UserPlus, Database, Search, 
  LogOut, CheckCircle, XCircle, Clock, Trash2, Plus, FileText, X,
  MessageSquare, Mail, User, Calendar, Shield, ShieldAlert
} from 'lucide-react';
import { db } from '../../services/api';
import { Contact, ApplicationFormData, EmployeeData, Customer, UserRole } from '../../types';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [currentUser, setCurrentUser] = useState<EmployeeData | null>(null);
  const [activeTab, setActiveTab] = useState<'applications' | 'employees' | 'customers' | 'messages'>('applications');
  const [applications, setApplications] = useState<ApplicationFormData[]>([]);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [messages, setMessages] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form states
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ 
    email: '', 
    role: '', 
    password: '', 
    systemRole: ''
  });
  const [newCustomer, setNewCustomer] = useState({ name: '', company: '', email: '', status: 'lead' as const });

useEffect(() => {
  const initializeDashboard = async () => {
    try {
      // 1. Fetch the user details from the API
      const user = await db.getCurrentUser();
      setCurrentUser(user);
      
      // 2. Refresh your other data (Applications, Customers, etc.)
      await refreshData(); 
    } catch (error) {
      console.error("Failed to load dashboard data", error);
      // Optional: If 401, trigger logout
      // onLogout();
    }
  };

  initializeDashboard();
}, []);
  const isAdmin = currentUser?.system_role === 'admin';

  const refreshData = async () => {
    try {
      // We run these in parallel using Promise.all for better performance
      const [apps, emps, custs, msgs] = await Promise.all([
        db.getApplications(),
        db.getEmployees(),
        db.getCustomers(),
        db.getMessages()
      ]);

      setApplications(apps);
      setEmployees(emps);
      setCustomers(custs);
      setMessages(msgs);
    } catch (error) {
      console.error("Error refreshing data:", error);
      // Optional: Add a notification or error state here
    }
};

  const handleUpdateApplicationStatus = (id: string, status: ApplicationFormData['status']) => {
    if (!isAdmin) return alert('Restricted: Admin role required for this action.');
    db.updateApplicationStatus(id, status);
    refreshData();
  };

  const handleUpdateMessageStatus = (id: string, status: Contact['status']) => {
    if (!isAdmin) return alert('Restricted: Admin role required for this action.');
    db.updateMessageStatus(id, status);
    refreshData();
  };

  const handleDeleteMessage = (id: string) => {
    if (!isAdmin) return alert('Restricted: Admin role required for this action.');
    if (confirm('Are you sure you want to delete this message?')) {
      db.deleteMessage(id);
      refreshData();
    }
  };

  const handleDeleteEmployee = (id: string) => {
    if (!isAdmin) return alert('Restricted: Admin role required for this action.');
    if (id === currentUser?.id) return alert('You cannot delete your own account.');
    if (confirm('Remove employee from team?')) {
      db.deleteEmployee(id);
      refreshData();
    }
  };

  const handleDeleteCustomer = (id: string) => {
    if (!isAdmin) return alert('Restricted: Admin role required for this action.');
    if (confirm('Remove customer record?')) {
      db.deleteCustomer(id);
      refreshData();
    }
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    db.addEmployee(newEmployee);
    setNewEmployee({ email: '', role: '', system_role: '' });
    setShowAddEmployee(false);
    refreshData();
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    db.addCustomer(newCustomer);
    setNewCustomer({ name: '', company: '', email: '', status: 'lead' });
    setShowAddCustomer(false);
    refreshData();
  };

  const filteredData = () => {
    const term = searchTerm.toLowerCase();

    switch(activeTab) {
      case 'applications':
        // Standard built-in type guard: Array.isArray()
        return Array.isArray(applications) 
          ? applications.filter(a => a.fullName.toLowerCase().includes(term) || a.email.toLowerCase().includes(term))
          : [];

      case 'employees':
        return Array.isArray(employees)
          ? employees.filter(e => e.system_role.toLowerCase().includes(term) || e.email.toLowerCase().includes(term))
          : [];

      case 'customers':
        return Array.isArray(customers)
          ? customers.filter(c => c.name.toLowerCase().includes(term) || c.company.toLowerCase().includes(term))
          : [];

      case 'messages':
        return Array.isArray(messages)
          ? messages.filter(m => m.name.toLowerCase().includes(term) || m.message.toLowerCase().includes(term))
          : [];

      default:
        return [];
    }
};


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className={`fixed md:static w-64 bg-slate-900 text-white flex flex-col p-4 md:p-6 h-screen md:h-auto z-30 md:z-auto transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">L</div>
            <span className="font-extrabold text-xl tracking-tight hidden sm:inline">Lipila HQ</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 hover:bg-slate-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'applications', label: 'Applications', icon: <Briefcase size={20} /> },
            { id: 'employees', label: 'Team', icon: <Users size={20} /> },
            { id: 'customers', label: 'Customers', icon: <UserPlus size={20} /> },
            { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span className="font-bold hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mb-6 px-2 py-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
              {currentUser?.email.charAt(0)}
            </div>
            <div className="overflow-hidden hidden sm:block">
              <p className="text-xs font-bold text-white truncate">{currentUser?.role}</p>
              <div className="flex items-center text-[10px] text-slate-400">
                {isAdmin ? <Shield size={10} className="mr-1 text-emerald-400" /> : <Shield size={10} className="mr-1 text-amber-400" />}
                <span className="capitalize">{currentUser?.system_role}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-2 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all text-sm"
          >
            <LogOut size={16} />
            <span className="font-bold hidden sm:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 w-full md:w-auto">
        <header className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6 md:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 capitalize">{activeTab}</h1>
            <p className="text-slate-500 text-sm mt-1 hidden sm:block">Manage and monitor Lipila's growth metrics.</p>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 w-full sm:w-auto">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-slate-200 rounded-lg"
              title="Toggle menu"
            >
              <Users size={20} className="text-slate-900" />
            </button>
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {isAdmin && (
              <>
                {activeTab === 'employees' && (
                  <button 
                    onClick={() => setShowAddEmployee(true)}
                    className="bg-indigo-600 text-white px-3 md:px-4 py-2 rounded-xl font-bold flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
                  >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                )}
                {activeTab === 'customers' && (
                  <button 
                    onClick={() => setShowAddCustomer(true)}
                    className="bg-indigo-600 text-white px-3 md:px-4 py-2 rounded-xl font-bold flex items-center space-x-1 md:space-x-2 text-sm md:text-base"
                  >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                )}
              </>
            )}
          </div>
        </header>

        {!isAdmin && (
          <div className="mb-10 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center space-x-4">
            <ShieldAlert className="text-amber-500" />
            <div>
              <p className="text-sm font-bold text-amber-900">Read-Only Access</p>
              <p className="text-xs text-amber-700">You can view data but cannot perform write or delete operations.</p>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10">
          <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 font-medium text-xs md:text-base">Pending Apps</span>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="md:w-5 md:h-5" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900">
            {Array.isArray(applications) 
              ? applications.filter(a => a.status === 'pending').length 
              : 0}
          </div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 font-medium text-xs md:text-base">Active Team</span>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Users size={16} className="md:w-5 md:h-5" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900">{employees.length}</div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 font-medium text-xs md:text-base">Customers</span>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Database size={16} className="md:w-5 md:h-5" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900">{customers.length}</div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 font-medium text-xs md:text-base">New Messages</span>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare size={16} className="md:w-5 md:h-5" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900">
              {Array.isArray(messages) 
                ? messages.filter(m => m.status === 'new').length 
                : 0}
            </div>
          </div>
        </div>

        {/* Data View */}
        <div className="bg-white rounded-xl md:rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          {activeTab === 'messages' ? (
            <div className="p-4 md:p-8 space-y-4 md:space-y-6">
              {filteredData().map((msg: any) => (
                <div key={msg.id} className={`p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all ${msg.status === 'new' ? 'bg-indigo-50/50 border-indigo-100' : 'bg-white border-slate-100'}`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4 mb-4">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm flex-shrink-0">
                        <User className="text-slate-400" size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{msg.name}</div>
                        <div className="text-xs text-slate-500 flex items-center truncate">
                          <Mail size={12} className="mr-1 flex-shrink-0" /> <span className="truncate">{msg.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-wrap">
                      <div className="text-xs text-slate-400 flex items-center whitespace-nowrap">
                        <Calendar size={12} className="mr-1" /> {new Date(msg.date_sent).toLocaleDateString()}
                      </div>
                      {isAdmin && (
                        <>
                          <button 
                            onClick={() => handleUpdateMessageStatus(msg.id, 'read')}
                            className={`p-1.5 md:p-2 rounded-lg transition-colors flex-shrink-0 ${msg.status === 'new' ? 'text-indigo-600 hover:bg-indigo-100' : 'text-slate-300'}`}
                            title="Mark as read"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1.5 md:p-2 text-slate-300 hover:text-red-600 rounded-lg transition-colors flex-shrink-0"
                            title="Delete message"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed break-words">
                    {msg.message}
                  </p>
                </div>
              ))}
              {filteredData().length === 0 && (
                <div className="py-16 md:py-20 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Mail size={24} />
                  </div>
                  <p className="text-slate-400 font-medium">No messages found.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm md:text-base">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Name / Role</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Contact</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Status / Date</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeTab === 'applications' && filteredData().map((app: any) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 md:px-6 py-4 md:py-6">
                        <div className="font-bold text-slate-900 truncate">{app.fullName}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-tight truncate">{app.jobTitle}</div>
                      </td>
                      <td className="px-3 md:px-6 py-4 md:py-6 text-sm text-slate-600">
                        <div className="truncate">{app.email}</div>
                        {(app.portfolioUrl || app.githubUrl) && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {app.portfolioUrl && <a href={app.portfolioUrl} target="_blank" className="text-indigo-600 text-xs hover:underline">Portfolio</a>}
                            {app.portfolioUrl && app.githubUrl && <span className="text-slate-300 text-xs">|</span>}
                            {app.githubUrl && <a href={app.githubUrl} target="_blank" className="text-indigo-600 text-xs hover:underline">GitHub</a>}
                          </div>
                        )}
                      </td>
                      <td className="px-3 md:px-6 py-4 md:py-6">
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap inline-block ${
                          app.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                          app.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {app.status}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1 hidden md:block">
                          {new Date(app.dateSubmitted).toLocaleString([], {
                            dateStyle: 'short',
                            timeStyle: 'short'
                          })}
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-4 md:py-6 text-right">
                        <div className="flex justify-end items-center space-x-1 flex-wrap gap-1">
                          {/* NEW: View Letter Button */}
                          {app.coverLetter && (
                            <button 
                              onClick={() => { setSelectedLetter(app.coverLetter); setShowLetterModal(true); }}
                              className="px-2 md:px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center whitespace-nowrap"
                            >
                              <FileText size={14} className="mr-1" />
                              <span className="hidden sm:inline">Letter</span>
                            </button>
                          )}

                          {isAdmin && (
                            <div className="flex space-x-1 border-l pl-1 md:pl-2 border-slate-200">
                              <button 
                                onClick={() => handleUpdateApplicationStatus(app.id, 'accepted')}
                                className="p-1 md:p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Accept"
                              >
                                <CheckCircle size={16} className="md:w-[18px] md:h-[18px]" />
                              </button>
                              <button 
                                onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')}
                                className="p-1 md:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <XCircle size={16} className="md:w-[18px] md:h-[18px]" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {activeTab === 'employees' && filteredData().map((emp: any) => (
                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 md:px-6 py-4 md:py-6">
                        <div className="flex items-center space-x-2">
                          <div className="font-bold text-slate-900 truncate">{emp.role}</div>
                          {emp.system_role === 'admin' ? <Shield size={12} className="text-emerald-500 flex-shrink-0" /> : <Shield size={12} className="text-amber-500 flex-shrink-0" />}
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-tight truncate">{emp.system_role}</div>
                      </td>
                      <td className="px-3 md:px-6 py-4 md:py-6 text-sm text-slate-600 truncate">{emp.email}</td>
                      <td className="px-3 md:px-6 py-4 md:py-6">
                        <div className="text-sm font-medium text-slate-600 capitalize truncate">{emp.role}</div>
                        <div className="text-xs text-slate-400">{new Date(emp.date_added).toLocaleDateString()}</div>
                      </td>
                      <td className="px-3 md:px-6 py-4 md:py-6 text-right">
                        {currentUser?.system_role ==='admin' && emp.id !== currentUser?.id && (
                          <button onClick={() => handleDeleteEmployee(emp.id)} className="p-1.5 md:p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} className="md:w-[18px] md:h-[18px]" /></button>
                        )}
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'customers' && filteredData().map((cust: any) => (
                    <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 md:px-6 py-4 md:py-6">
                        <div className="font-bold text-slate-900 truncate">{cust.name}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-tight truncate">{cust.company}</div>
                      </td>
                      <td className="px-3 md:px-6 py-4 md:py-6 text-sm text-slate-600 truncate">{cust.email}</td>
                      <td className="px-3 md:px-6 py-4 md:py-6">
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap inline-block ${
                          cust.status === 'active' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {cust.status}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-4 md:py-6 text-right">
                        {currentUser?.system_role ==='admin' && (
                          <button onClick={() => handleDeleteCustomer(cust.id)} className="p-1.5 md:p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} className="md:w-[18px] md:h-[18px]" /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {filteredData().length === 0 && activeTab !== 'messages' && (
            <div className="py-16 md:py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Database size={24} />
              </div>
              <p className="text-slate-400 font-medium">No records found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showAddEmployee && (
        <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl md:rounded-[2rem] w-full max-w-md p-6 md:p-8 animate-in zoom-in duration-300 shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-6">New Employee</h3>
            <form onSubmit={handleAddEmployee} className="space-y-4">
            {/*<div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Full Name</label>
                <input 
                  type="text" placeholder="Mwansa Zulu" required 
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                  value={newEmployee.name} onChange={e => setNewEmployee({...newEmployee, name: e.target.value})}
                />
              </div>*/}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Work Email</label>
                <input 
                  type="email" placeholder="m.zulu@lipila.co.zm" required 
                  className="w-full px-4 md:px-5 py-2 md:py-3 bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl text-sm"
                  value={newEmployee.email} onChange={e => setNewEmployee({...newEmployee, email: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Job Title/Role</label>
                <input 
                  type="text" placeholder="Software Engineer" required 
                  className="w-full px-4 md:px-5 py-2 md:py-3 bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl text-sm"
                  value={newEmployee.role} onChange={e => setNewEmployee({...newEmployee, role: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">System Access Role</label>
                <select 
                  className="w-full px-4 md:px-5 py-2 md:py-3 bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl text-sm"
                  value={newEmployee.system_role}
                  onChange={e => setNewEmployee({...newEmployee, system_role: e.target.value as UserRole})}
                >
                  <option value="viewer">Viewer (Read-Only)</option>
                  <option value="admin">Administrator (Full Access)</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <button type="button" onClick={() => setShowAddEmployee(false)} className="flex-1 py-2 md:py-3 font-bold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2 md:py-3 bg-indigo-600 text-white rounded-lg md:rounded-xl font-bold hover:bg-indigo-700 transition-colors">Add Team Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddCustomer && (
        <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl md:rounded-[2rem] w-full max-w-md p-6 md:p-8 animate-in zoom-in duration-300 shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-6">New Customer Lead</h3>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <input 
                type="text" placeholder="Contact Name" required 
                className="w-full px-4 md:px-5 py-2 md:py-3 bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl text-sm"
                value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
              />
              <input 
                type="text" placeholder="Company" required 
                className="w-full px-4 md:px-5 py-2 md:py-3 bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl text-sm"
                value={newCustomer.company} onChange={e => setNewCustomer({...newCustomer, company: e.target.value})}
              />
              <input 
                type="email" placeholder="Email" required 
                className="w-full px-4 md:px-5 py-2 md:py-3 bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl text-sm"
                value={newCustomer.email} onChange={e => setNewCustomer({...newCustomer, email: e.target.value})}
              />
              <select 
                className="w-full px-4 md:px-5 py-2 md:py-3 bg-slate-50 border border-slate-200 rounded-lg md:rounded-xl text-sm"
                value={newCustomer.status} onChange={e => setNewCustomer({...newCustomer, status: e.target.value as any})}
              >
                <option value="lead">Lead</option>
                <option value="active">Active Client</option>
              </select>
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <button type="button" onClick={() => setShowAddCustomer(false)} className="flex-1 py-2 md:py-3 font-bold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2 md:py-3 bg-indigo-600 text-white rounded-lg md:rounded-xl font-bold hover:bg-indigo-700 transition-colors">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Cover Letter Modal */}
      {showLetterModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center text-sm md:text-base">
                <FileText className="w-4 h-4 md:w-5 md:h-5 mr-2 text-indigo-600" />
                Cover Letter
              </h3>
              <button 
                onClick={() => setShowLetterModal(false)}
                className="p-1.5 md:p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={18} className="md:w-5 md:h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="px-4 md:px-8 py-6 md:py-8 overflow-y-auto text-slate-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
              {selectedLetter || "No cover letter provided."}
            </div>

            <div className="px-4 md:px-6 py-3 md:py-4 border-t border-slate-100 bg-slate-50/50 text-right">
              <button 
                onClick={() => setShowLetterModal(false)}
                className="px-4 md:px-6 py-2 md:py-2 bg-slate-900 text-white rounded-lg md:rounded-xl font-bold hover:bg-slate-800 transition-all text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
