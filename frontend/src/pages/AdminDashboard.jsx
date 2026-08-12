import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldAlert, Pill, MessageSquare, Users, Plus, Edit, 
  Trash2, CheckCircle2, XCircle, RefreshCw, Eye, Save, X, Search,
  Link as LinkIcon, Upload, Image as ImageIcon, FileText
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('medicines');

  // Data States
  const [medicines, setMedicines] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search/Filter
  const [searchTerm, setSearchTerm] = useState('');

  // Modal / Form States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  
  // Image Upload Mode: 'url' or 'file'
  const [imageInputMode, setImageInputMode] = useState('url');
  const [imageFile, setImageFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  const [medForm, setMedForm] = useState({
    brand_name: '',
    generic_name: '',
    composition: '',
    strength: '',
    dosage_form: 'Tablet',
    packaging: '',
    category_id: '',
    short_description: '',
    description: '',
    indications: '',
    storage_information: 'Store below 25°C in a dry place.',
    manufacturer: 'Famivaa Healthcare',
    marketer: 'Famivaa Healthcare',
    prescription_required: true,
    is_active: true,
    is_featured: false,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
  });

  useEffect(() => {
    if (authLoading) return;
    if (isAdmin) {
      fetchAdminData();
    } else {
      setLoading(false);
    }
  }, [activeTab, isAdmin, authLoading]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'medicines') {
        const [medRes, catRes] = await Promise.all([
          axios.get('/api/admin/medicines/'),
          axios.get('/api/categories/')
        ]);
        setMedicines(medRes.data.results || medRes.data || []);
        setCategories(catRes.data || []);
      } else if (activeTab === 'enquiries') {
        const res = await axios.get('/api/admin/enquiries/');
        setEnquiries(res.data.results || res.data || []);
      } else if (activeTab === 'users') {
        const res = await axios.get('/api/admin/users/');
        setUsersList(res.data || []);
      }
    } catch (err) {
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (JPG, PNG, WEBP).');
    }
  };

  // Medicine Form Submit
  const handleMedSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('brand_name', medForm.brand_name);
      formData.append('generic_name', medForm.generic_name);
      formData.append('composition', medForm.composition);
      formData.append('strength', medForm.strength);
      formData.append('dosage_form', medForm.dosage_form);
      formData.append('packaging', medForm.packaging);
      if (medForm.category_id) {
        formData.append('category_id', medForm.category_id);
      }
      formData.append('short_description', medForm.short_description);
      formData.append('description', medForm.description);
      formData.append('indications', medForm.indications);
      formData.append('storage_information', medForm.storage_information);
      formData.append('manufacturer', medForm.manufacturer);
      formData.append('marketer', medForm.marketer);
      formData.append('prescription_required', medForm.prescription_required);
      formData.append('is_active', medForm.is_active);
      formData.append('is_featured', medForm.is_featured);

      if (imageInputMode === 'file' && imageFile) {
        formData.append('image', imageFile);
      } else if (medForm.image_url) {
        formData.append('image_url', medForm.image_url);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (editingMed) {
        await axios.put(`/api/admin/medicines/${editingMed.id}/`, formData, config);
      } else {
        await axios.post('/api/admin/medicines/', formData, config);
      }

      setShowAddModal(false);
      setEditingMed(null);
      resetMedForm();
      fetchAdminData();
    } catch (err) {
      console.error('Save medicine error:', err);
      alert('Error saving medicine. Please verify form details.');
    }
  };

  const handleEditClick = (med) => {
    setEditingMed(med);
    setMedForm({
      brand_name: med.brand_name || '',
      generic_name: med.generic_name || '',
      composition: med.composition || '',
      strength: med.strength || '',
      dosage_form: med.dosage_form || 'Tablet',
      packaging: med.packaging || '',
      category_id: med.category || '',
      short_description: med.short_description || '',
      description: med.description || '',
      indications: med.indications || '',
      storage_information: med.storage_information || '',
      manufacturer: med.manufacturer || 'Famivaa Healthcare',
      marketer: med.marketer || 'Famivaa Healthcare',
      prescription_required: med.prescription_required,
      is_active: med.is_active,
      is_featured: med.is_featured,
      image_url: med.image_url || '',
    });
    if (med.image) {
      setImageInputMode('file');
      setFilePreview(med.effective_image_url);
    } else {
      setImageInputMode('url');
      setFilePreview(null);
    }
    setImageFile(null);
    setShowAddModal(true);
  };

  const handleDeleteMed = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await axios.delete(`/api/admin/medicines/${id}/`);
        fetchAdminData();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const toggleMedActive = async (med) => {
    try {
      await axios.patch(`/api/admin/medicines/${med.id}/`, { is_active: !med.is_active });
      fetchAdminData();
    } catch (err) {
      console.error('Toggle active error:', err);
    }
  };

  // Enquiry Status Update
  const handleEnquiryStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/api/admin/enquiries/${id}/`, { status: newStatus });
      fetchAdminData();
    } catch (err) {
      console.error('Enquiry status update error:', err);
    }
  };

  // User Active Toggle
  const handleUserToggle = async (userId, currentActive) => {
    try {
      await axios.patch('/api/admin/users/', { user_id: userId, is_active: !currentActive });
      fetchAdminData();
    } catch (err) {
      console.error('User status error:', err);
      alert(err.response?.data?.error || 'Failed to update user status.');
    }
  };

  const resetMedForm = () => {
    setMedForm({
      brand_name: '',
      generic_name: '',
      composition: '',
      strength: '',
      dosage_form: 'Tablet',
      packaging: '',
      category_id: '',
      short_description: '',
      description: '',
      indications: '',
      storage_information: 'Store below 25°C in a dry place.',
      manufacturer: 'Famivaa Healthcare',
      marketer: 'Famivaa Healthcare',
      prescription_required: true,
      is_active: true,
      is_featured: false,
      image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    });
    setImageFile(null);
    setFilePreview(null);
    setImageInputMode('url');
  };

  if (!authLoading && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-md mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
            <span>Admin Control Panel</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Famivaa Executive Console</h1>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('medicines')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'medicines' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Pill className="w-4 h-4 text-sky-600" />
            <span>Medicines Management</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'enquiries' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-teal-600" />
            <span>B2B Enquiries</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'users' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-600" />
            <span>User Accounts</span>
          </button>
        </div>
      </div>

      {/* 1. MEDICINES MANAGEMENT TAB */}
      {activeTab === 'medicines' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search catalog medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border rounded-xl text-xs"
              />
            </div>

            <button
              onClick={() => {
                setEditingMed(null);
                resetMedForm();
                setShowAddModal(true);
              }}
              className="flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Medicine</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Brand Name</th>
                    <th className="p-4">Generic Composition</th>
                    <th className="p-4">Dosage Form</th>
                    <th className="p-4">Strength & Packaging</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medicines
                    .filter((m) =>
                      m.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      m.generic_name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((med) => (
                      <tr key={med.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-bold text-slate-900">{med.brand_name}</td>
                        <td className="p-4 text-slate-600">{med.generic_name}</td>
                        <td className="p-4">
                          <span className="bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded">
                            {med.dosage_form}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">{med.strength} • {med.packaging}</td>
                        <td className="p-4">
                          <button
                            onClick={() => toggleMedActive(med)}
                            className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                              med.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {med.is_active ? 'Active' : 'Disabled'}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleEditClick(med)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMed(med.id)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. ENQUIRIES TAB */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Commercial B2B Enquiries</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4">Client / Company</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Product Interested</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <span className="font-bold text-slate-900 block">{enq.full_name}</span>
                      <span className="text-slate-500 text-[11px]">{enq.company_name}</span>
                    </td>
                    <td className="p-4 font-semibold text-teal-700 capitalize">{enq.business_type}</td>
                    <td className="p-4 space-y-0.5">
                      <div className="text-slate-800 font-medium">{enq.email}</div>
                      <div className="text-slate-500">{enq.phone} • {enq.city}</div>
                    </td>
                    <td className="p-4 font-semibold text-slate-800">
                      {enq.medicine_name_text || enq.medicine_details?.brand_name || 'General Inquiry'}
                    </td>
                    <td className="p-4 max-w-xs truncate text-slate-600" title={enq.message}>
                      {enq.message}
                    </td>
                    <td className="p-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleEnquiryStatus(enq.id, e.target.value)}
                        className="bg-slate-50 border rounded p-1 font-bold text-[11px]"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. USER ACCOUNTS TAB */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Registered B2B User Accounts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4">User Email</th>
                  <th className="p-4">Business Name</th>
                  <th className="p-4">Business Type</th>
                  <th className="p-4">Phone / City</th>
                  <th className="p-4">Role</th>
                  <th className="p-4 text-right">Account Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-slate-900">{u.email}</td>
                    <td className="p-4 text-slate-700">{u.profile?.company_name || 'N/A'}</td>
                    <td className="p-4 text-teal-700 font-semibold">{u.profile?.business_type_display || 'Standard'}</td>
                    <td className="p-4 text-slate-500">{u.profile?.phone || 'N/A'} ({u.profile?.city || '-'})</td>
                    <td className="p-4">
                      {u.is_staff ? (
                        <span className="bg-slate-900 text-white font-bold px-2 py-0.5 rounded text-[10px]">ADMIN</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[10px]">CLIENT</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {!u.is_superuser && (
                        <button
                          onClick={() => handleUserToggle(u.id, u.profile ? true : true)}
                          className="text-xs font-bold text-sky-600 hover:underline"
                        >
                          Toggle Active
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold">{editingMed ? 'Edit Medicine' : 'Add New B2B Medicine'}</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMedSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={medForm.brand_name}
                    onChange={(e) => setMedForm({ ...medForm, brand_name: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Generic Name *</label>
                  <input
                    type="text"
                    required
                    value={medForm.generic_name}
                    onChange={(e) => setMedForm({ ...medForm, generic_name: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Composition Formula *</label>
                  <input
                    type="text"
                    required
                    value={medForm.composition}
                    onChange={(e) => setMedForm({ ...medForm, composition: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Category</label>
                  <select
                    value={medForm.category_id}
                    onChange={(e) => setMedForm({ ...medForm, category_id: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold block mb-1">Dosage Form</label>
                  <input
                    type="text"
                    value={medForm.dosage_form}
                    onChange={(e) => setMedForm({ ...medForm, dosage_form: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Strength</label>
                  <input
                    type="text"
                    value={medForm.strength}
                    onChange={(e) => setMedForm({ ...medForm, strength: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Packaging</label>
                  <input
                    type="text"
                    value={medForm.packaging}
                    onChange={(e) => setMedForm({ ...medForm, packaging: e.target.value })}
                    className="w-full p-2 bg-slate-50 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Short Description</label>
                <textarea
                  rows="2"
                  value={medForm.short_description}
                  onChange={(e) => setMedForm({ ...medForm, short_description: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                ></textarea>
              </div>

              <div>
                <label className="font-bold block mb-1">Full Description</label>
                <textarea
                  rows="3"
                  value={medForm.description}
                  onChange={(e) => setMedForm({ ...medForm, description: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                ></textarea>
              </div>

              <div>
                <label className="font-bold block mb-1">Indications</label>
                <input
                  type="text"
                  value={medForm.indications}
                  onChange={(e) => setMedForm({ ...medForm, indications: e.target.value })}
                  className="w-full p-2 bg-slate-50 border rounded-lg"
                />
              </div>

              {/* DUAL IMAGE INPUT SECTION (Option 1: Image URL | Option 2: Drag & Drop Upload File) */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="font-bold block text-slate-800">Medicine Product Image</label>
                
                {/* Tab Selector */}
                <div className="flex border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => setImageInputMode('url')}
                    className={`flex items-center space-x-2 py-2 px-4 font-bold border-b-2 transition ${
                      imageInputMode === 'url'
                        ? 'border-sky-600 text-sky-600 bg-sky-50/60'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Option 1: Image URL</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setImageInputMode('file')}
                    className={`flex items-center space-x-2 py-2 px-4 font-bold border-b-2 transition ${
                      imageInputMode === 'file'
                        ? 'border-sky-600 text-sky-600 bg-sky-50/60'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Option 2: Drag & Drop / Upload File</span>
                  </button>
                </div>

                {/* Option 1: Image URL Input */}
                {imageInputMode === 'url' && (
                  <div className="space-y-2 pt-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={medForm.image_url}
                      onChange={(e) => {
                        setMedForm({ ...medForm, image_url: e.target.value });
                        setImageFile(null);
                        setFilePreview(null);
                      }}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:bg-white"
                    />
                    {medForm.image_url && (
                      <div className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <img
                          src={medForm.image_url}
                          alt="URL Preview"
                          className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80"; }}
                        />
                        <div className="text-[11px] text-slate-600 min-w-0">
                          <span className="font-bold block text-slate-800">URL Image Live Preview</span>
                          <span className="text-slate-400 truncate block">{medForm.image_url}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Option 2: Drag & Drop File Upload */}
                {imageInputMode === 'file' && (
                  <div className="pt-2">
                    {filePreview ? (
                      <div className="flex items-center justify-between p-3 bg-sky-50 border border-sky-200 rounded-2xl">
                        <div className="flex items-center space-x-3 min-w-0">
                          <img src={filePreview} alt="File Preview" className="w-14 h-14 object-cover rounded-lg border border-sky-300 shrink-0" />
                          <div className="min-w-0">
                            <span className="font-bold text-xs text-slate-900 block truncate">
                              {imageFile ? imageFile.name : 'Uploaded File Preview'}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {imageFile ? (imageFile.size / 1024).toFixed(1) + ' KB' : 'Active Local File'}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setFilePreview(null);
                          }}
                          className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 rounded-lg text-xs font-bold shadow-sm transition"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragging(false);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleFileSelect(e.dataTransfer.files[0]);
                          }
                        }}
                        onClick={() => document.getElementById('medicine-file-input').click()}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition ${
                          dragging ? 'border-sky-500 bg-sky-50/80 shadow-md' : 'border-slate-300 bg-slate-50 hover:bg-slate-100/80'
                        }`}
                      >
                        <input
                          id="medicine-file-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileSelect(e.target.files[0]);
                            }
                          }}
                        />
                        <Upload className="w-8 h-8 text-sky-600 mx-auto mb-2 animate-pulse" />
                        <p className="font-bold text-xs text-slate-800">Drag & Drop product image here</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">or click to browse from device (JPG, PNG, WEBP)</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex space-x-4 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={medForm.is_active}
                    onChange={(e) => setMedForm({ ...medForm, is_active: e.target.checked })}
                  />
                  <span>Active in Catalog</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={medForm.is_featured}
                    onChange={(e) => setMedForm({ ...medForm, is_featured: e.target.checked })}
                  />
                  <span>Featured Product</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md"
              >
                {editingMed ? 'Update Medicine' : 'Save Medicine'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
