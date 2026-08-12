import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, User, Phone, MapPin, Pill, MessageSquare, 
  LogOut, Clock, CheckCircle2, AlertCircle, Edit, Save, Shield
} from 'lucide-react';

export const UserDashboard = () => {
  const { user, loading: authLoading, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile Edit State
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    company_name: '',
    phone: '',
    city: '',
    state: '',
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (authLoading) return;

    if (user) {
      if (user.profile) {
        setProfileForm({
          full_name: user.profile.full_name || '',
          company_name: user.profile.company_name || '',
          phone: user.profile.phone || '',
          city: user.profile.city || '',
          state: user.profile.state || '',
        });
      }
      fetchUserEnquiries();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchUserEnquiries = async () => {
    try {
      const res = await axios.get('/api/user/enquiries/');
      setEnquiries(res.data.results || res.data || []);
    } catch (err) {
      console.error('Failed to load user enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      setEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">Completed</span>;
      case 'contacted':
        return <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-1 rounded-full">In Contact</span>;
      default:
        return <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">New Submission</span>;
    }
  };

  if (!authLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-16">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-3xl p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-sky-500/20 text-sky-300 text-xs font-bold px-3 py-1 rounded-full border border-sky-500/30">
            <Shield className="w-3.5 h-3.5" />
            <span>Verified B2B Account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome back, {user?.profile?.full_name || user?.email}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {user?.profile?.company_name} • <span className="text-teal-400 font-semibold">{user?.profile?.business_type_display || 'Healthcare Business'}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/medicines"
            className="flex items-center space-x-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition"
          >
            <Pill className="w-4 h-4" />
            <span>Browse Products</span>
          </Link>

          <Link
            to="/contact"
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-xs border border-white/20 transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>New Inquiry</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Business Profile Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Business Profile</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="text-xs font-semibold text-sky-600 hover:underline flex items-center space-x-1"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>{editing ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleProfileSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.full_name}
                  onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Company Name</label>
                <input
                  type="text"
                  value={profileForm.company_name}
                  onChange={(e) => setProfileForm({ ...profileForm, company_name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">State</label>
                  <input
                    type="text"
                    value={profileForm.state}
                    onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 rounded-lg text-xs transition flex items-center justify-center space-x-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="flex items-center space-x-3 text-slate-700">
                <User className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Name</span>
                  <span className="font-semibold text-slate-900 text-sm">{user?.profile?.full_name || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700">
                <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Company / Clinic</span>
                  <span className="font-semibold text-slate-900">{user?.profile?.company_name || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Number</span>
                  <span className="font-semibold text-slate-900">{user?.profile?.phone || 'N/A'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                  <span className="font-semibold text-slate-900">
                    {user?.profile?.city ? `${user.profile.city}, ${user.profile.state}` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2.5 rounded-xl text-xs transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout of Account</span>
            </button>
          </div>

        </div>

        {/* Right Column: Submitted B2B Enquiries */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">My Product Enquiries</h2>
              <p className="text-xs text-slate-500">Track status of commercial requests sent to Famivaa Healthcare</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full">
              {enquiries.length} Enquiries
            </span>
          </div>

          {loading ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-24 bg-slate-100 rounded-2xl"></div>
              ))}
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
              <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No enquiries submitted yet</p>
              <p className="text-xs text-slate-500">Explore our product catalogue and request wholesale quotes or samples.</p>
              <Link
                to="/medicines"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-sky-600 hover:underline"
              >
                <span>Browse Products Catalogue</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3 hover:border-sky-300 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div>
                      <span className="text-xs font-bold text-slate-900">
                        {enq.medicine_name_text || enq.medicine_details?.brand_name || 'General B2B Inquiry'}
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        Submitted: {new Date(enq.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div>{getStatusBadge(enq.status)}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                    "{enq.message}"
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
