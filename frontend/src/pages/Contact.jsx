import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, Mail, Phone, MapPin, Clock, Send, 
  CheckCircle2, AlertCircle, ShieldCheck, Map
} from 'lucide-react';

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const preselectedProduct = searchParams.get('product') || '';
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    business_type: 'medical_store',
    email: '',
    phone: '',
    city: '',
    state: '',
    medicine_name_text: preselectedProduct,
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Auto-fill form if user profile is available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        full_name: user.profile?.full_name || prev.full_name,
        company_name: user.profile?.company_name || prev.company_name,
        business_type: user.profile?.business_type || prev.business_type,
        phone: user.profile?.phone || prev.phone,
        city: user.profile?.city || prev.city,
        state: user.profile?.state || prev.state,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('/api/contact/', formData);
      setSuccess(true);
      setFormData({
        full_name: '',
        company_name: '',
        business_type: 'medical_store',
        email: '',
        phone: '',
        city: '',
        state: '',
        medicine_name_text: '',
        message: '',
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      if (err.response?.data) {
        const errors = err.response.data;
        const firstErrorKey = Object.keys(errors)[0];
        const errorMsg = Array.isArray(errors[firstErrorKey]) ? errors[firstErrorKey][0] : errors[firstErrorKey];
        setError(`${firstErrorKey}: ${errorMsg}`);
      } else {
        setError('Failed to send enquiry. Please check your connection and try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header */}
      <section className="bg-purple-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider bg-purple-900 px-3.5 py-1.5 rounded-full border border-purple-800">
            B2B Trade Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Contact Famivaa Healthcare</h1>
          <p className="text-purple-200 text-sm max-w-xl mx-auto">
            Get in touch with our institutional sales and pharmacy distribution team for rate contracts, product samples, or dealership inquiries.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            
            <div>
              <h2 className="text-2xl font-bold text-slate-900">B2B Product Enquiry Form</h2>
              <p className="text-xs text-slate-500 mt-1">Please fill in your commercial details. Our trade team will respond within 24 hours.</p>
            </div>

            {success && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start space-x-3 text-emerald-800 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Enquiry Submitted Successfully!</span>
                  <span>Thank you for reaching out to Famivaa Healthcare. Our commercial sales representative will contact your business shortly.</span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center space-x-3 text-rose-800 text-sm">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Company / Clinic / Hospital Name *</label>
                  <input
                    type="text"
                    name="company_name"
                    required
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="e.g. Apollo Multi-Specialty Clinic"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Business Type *</label>
                  <select
                    name="business_type"
                    value={formData.business_type}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  >
                    <option value="doctor">Doctor / Practitioner</option>
                    <option value="clinic">Clinic / Polyclinic</option>
                    <option value="hospital">Hospital / Medical Center</option>
                    <option value="medical_store">Medical Store</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="distributor">Wholesale Distributor</option>
                    <option value="healthcare_business">Healthcare Business</option>
                    <option value="other">Other Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. purchasing@apolloclinic.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number *</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g. Maharashtra"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Product Interested In (Optional)</label>
                <input
                  type="text"
                  name="medicine_name_text"
                  value={formData.medicine_name_text}
                  onChange={handleChange}
                  placeholder="e.g. Famipres 500, Famicef-O 200"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Message / Requirements *</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Specify quantity requirements, bulk distribution terms, or specific inquiry details..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-purple-600/20 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Enquiry...' : 'Submit B2B Enquiry'}</span>
              </button>

            </form>

          </div>

          {/* Right Column: Business Contact Cards & Map Mock */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-purple-950 text-white p-8 rounded-3xl space-y-6 shadow-md border border-purple-900">
              <h3 className="text-xl font-bold border-b border-purple-900/80 pb-4">Corporate Office</h3>

              <div className="space-y-4 text-sm text-purple-200">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Headquarters Address</span>
                    <span>Famivaa Towers, Plot 42, Pharma Innovation Park, Bandra-Kurla Complex, Mumbai, MH 400051</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Phone Lines</span>
                    <span>+91 22 4900 8800 (General)</span>
                    <br />
                    <span>+91 98765 43210 (B2B Trade Desk)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Email Enquiries</span>
                    <span>enquiry@famivaa.com</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Business Operating Hours</span>
                    <span>Monday - Saturday: 9:00 AM - 6:30 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Mockup representation */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 text-center">
              <div className="flex items-center justify-center space-x-2 text-slate-800 font-bold text-sm">
                <Map className="w-5 h-5 text-sky-600" />
                <span>Pharma Innovation Park Location</span>
              </div>
              <div className="h-44 bg-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80"
                  alt="Corporate Location Map Representation"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 text-white p-4">
                  <MapPin className="w-8 h-8 text-sky-400 animate-bounce" />
                  <span className="font-bold text-sm mt-1">BKC Pharma Zone, Mumbai</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
