
import React, { useState, useEffect } from 'react';
import { 
  Users, Briefcase, UserPlus, Database, Search, 
  LogOut, CheckCircle, XCircle, Clock, Trash2, Plus,
  MessageSquare, Mail, User, Calendar
} from 'lucide-react';
import { db, Application, Employee, Customer } from '../../services/database';
import { ContactMessage } from '../../types';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'employees' | 'customers' | 'messages'>('applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', role: '' });
  const [newCustomer, setNewCustomer] = useState({ name: '', company: '', email: '', status: 'lead' as const });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setApplications(db.getApplications());
    setEmployees(db.getEmployees());
    setCustomers(db.getCustomers());
    setMessages(db.getMessages());
  };

  const handleUpdateApplicationStatus = (id: string, status: Application['status']) => {
    db.updateApplicationStatus(id, status);
    refreshData();
  };

  const handleUpdateMessageStatus = (id: string, status: ContactMessage['status']) => {
    db.updateMessageStatus(id, status);
    refreshData();
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      db.deleteMessage(id);
      refreshData();
    }
  };

  const handleDeleteEmployee = (id: string) => {
    if (confirm('Remove employee from team?')) {
      db.deleteEmployee(id);
      refreshData();
    }
  };

  const handleDeleteCustomer = (id: string) => {
    if (confirm('Remove customer record?')) {
      db.deleteCustomer(id);
      refreshData();
    }
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    db.addEmployee(newEmployee);
    setNewEmployee({ name: '', email: '', role: '' });
    setShowAddEmployee(false);
    refreshData();
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    db.addCustomer(newCustomer);
    setNewCustomer({ name: '', company: '', email: '', status: 'lead' });
    setShowAddCustomer(false);
    refreshData();
  };

  const filteredData = () => {
    const term = searchTerm.toLowerCase();
    switch(activeTab) {
      case 'applications': return applications.filter(a => a.fullName.toLowerCase().includes(term) || a.email.toLowerCase().includes(term));
      case 'employees': return employees.filter(e => e.name.toLowerCase().includes(term) || e.role.toLowerCase().includes(term));
      case 'customers': return customers.filter(c => c.name.toLowerCase().includes(term) || c.company.toLowerCase().includes(term));
      case 'messages': return messages.filter(m => m.name.toLowerCase().includes(term) || m.message.toLowerCase().includes(term));
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 fixed h-full z-20">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">L</div>
          <span className="font-extrabold text-xl tracking-tight">Lipila HQ</span>
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
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span className="font-bold">{tab.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={20} />
          <span className="font-bold">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 capitalize">{activeTab}</h1>
            <p className="text-slate-500 mt-1">Manage and monitor Lipila's growth metrics.</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {activeTab === 'employees' && (
              <button 
                onClick={() => setShowAddEmployee(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>Add Employee</span>
              </button>
            )}
            {activeTab === 'customers' && (
              <button 
                onClick={() => setShowAddCustomer(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>Add Customer</span>
              </button>
            )}
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 font-medium">Pending Apps</span>
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                <Clock size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{applications.filter(a => a.status === 'pending').length}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 font-medium">Active Team</span>
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <Users size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{employees.length}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 font-medium">Customer Leads</span>
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <Database size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{customers.length}</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 font-medium">New Messages</span>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{messages.filter(m => m.status === 'new').length}</div>
          </div>
        </div>

        {/* Data View */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          {activeTab === 'messages' ? (
            <div className="p-8 space-y-6">
              {filteredData().map((msg: any) => (
                <div key={msg.id} className={`p-6 rounded-2xl border transition-all ${msg.status === 'new' ? 'bg-indigo-50/50 border-indigo-100' : 'bg-white border-slate-100'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                        <User className="text-slate-400" size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{msg.name}</div>
                        <div className="text-xs text-slate-500 flex items-center">
                          <Mail size={12} className="mr-1" /> {msg.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-slate-400 flex items-center mr-2">
                        <Calendar size={12} className="mr-1" /> {new Date(msg.dateSent).toLocaleDateString()}
                      </div>
                      <button 
                        onClick={() => handleUpdateMessageStatus(msg.id, 'read')}
                        className={`p-2 rounded-lg transition-colors ${msg.status === 'new' ? 'text-indigo-600 hover:bg-indigo-100' : 'text-slate-300'}`}
                        title="Mark as read"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-2 text-slate-300 hover:text-red-600 rounded-lg transition-colors"
                        title="Delete message"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-13">
                    {msg.message}
                  </p>
                </div>
              ))}
              {filteredData().length === 0 && (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Mail size={24} />
                  </div>
                  <p className="text-slate-400 font-medium">No messages found.</p>
                </div>
              )}
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Name / Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status / Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeTab === 'applications' && filteredData().map((app: any) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-6">
                      <div className="font-bold text-slate-900">{app.fullName}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-tight">{app.roleId}</div>
                    </td>
                    <td className="px-6 py-6 text-sm text-slate-600">
                      <div>{app.email}</div>
                      {app.portfolioUrl && (
                        <a href={app.portfolioUrl} target="_blank" className="text-indigo-600 text-xs hover:underline">Portfolio Link</a>
                      )}
                    </td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                        app.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {app.status}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">{new Date(app.dateSubmitted).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleUpdateApplicationStatus(app.id, 'accepted')}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {activeTab === 'employees' && filteredData().map((emp: any) => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-6">
                      <div className="font-bold text-slate-900">{emp.name}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-tight">{emp.role}</div>
                    </td>
                    <td className="px-6 py-6 text-sm text-slate-600">{emp.email}</td>
                    <td className="px-6 py-6">
                      <div className="text-sm font-medium text-slate-600">Added</div>
                      <div className="text-xs text-slate-400">{new Date(emp.dateAdded).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button onClick={() => handleDeleteEmployee(emp.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}

                {activeTab === 'customers' && filteredData().map((cust: any) => (
                  <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-6">
                      <div className="font-bold text-slate-900">{cust.name}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-tight">{cust.company}</div>
                    </td>
                    <td className="px-6 py-6 text-sm text-slate-600">{cust.email}</td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        cust.status === 'active' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {cust.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button onClick={() => handleDeleteCustomer(cust.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {filteredData().length === 0 && activeTab !== 'messages' && (
            <div className="py-20 text-center">
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
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 animate-in zoom-in duration-300">
            <h3 className="text-2xl font-bold mb-6">New Employee</h3>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <input 
                type="text" placeholder="Name" required 
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                value={newEmployee.name} onChange={e => setNewEmployee({...newEmployee, name: e.target.value})}
              />
              <input 
                type="email" placeholder="Email" required 
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                value={newEmployee.email} onChange={e => setNewEmployee({...newEmployee, email: e.target.value})}
              />
              <input 
                type="text" placeholder="Role" required 
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                value={newEmployee.role} onChange={e => setNewEmployee({...newEmployee, role: e.target.value})}
              />
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowAddEmployee(false)} className="flex-1 py-3 font-bold text-slate-600">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold">Add Team Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddCustomer && (
        <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 animate-in zoom-in duration-300">
            <h3 className="text-2xl font-bold mb-6">New Customer Lead</h3>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <input 
                type="text" placeholder="Contact Name" required 
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
              />
              <input 
                type="text" placeholder="Company" required 
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                value={newCustomer.company} onChange={e => setNewCustomer({...newCustomer, company: e.target.value})}
              />
              <input 
                type="email" placeholder="Email" required 
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                value={newCustomer.email} onChange={e => setNewCustomer({...newCustomer, email: e.target.value})}
              />
              <select 
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                value={newCustomer.status} onChange={e => setNewCustomer({...newCustomer, status: e.target.value as any})}
              >
                <option value="lead">Lead</option>
                <option value="active">Active Client</option>
              </select>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowAddCustomer(false)} className="flex-1 py-3 font-bold text-slate-600">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
