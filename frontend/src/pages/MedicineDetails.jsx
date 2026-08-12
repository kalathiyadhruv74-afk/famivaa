import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldAlert, MessageSquare, ArrowLeft, AlertCircle, Thermometer
} from 'lucide-react';

export const MedicineDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedicineDetail();
  }, [slug]);

  const fetchMedicineDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/medicines/${slug}/`);
      setMedicine(res.data);
    } catch (err) {
      console.error('Failed to load medicine detail:', err);
      setError('Medicine not found or unavailable.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-8 bg-purple-100/50 w-1/3 rounded"></div>
        <div className="h-96 bg-purple-100/50 rounded-3xl"></div>
      </div>
    );
  }

  if (error || !medicine) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-slate-600 text-sm">{error || "The requested medicine could not be retrieved."}</p>
        <Link to="/medicines" className="inline-flex items-center space-x-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Catalogue</span>
        </Link>
      </div>
    );
  }

  const imageUrl = medicine.effective_image_url || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-16">
      
      {/* Back Link */}
      <div>
        <Link to="/medicines" className="inline-flex items-center space-x-2 text-sm font-semibold text-purple-600 hover:text-purple-700">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
      </div>

      {/* Main Details Grid */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Image & Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-purple-50/40 border border-purple-100">
            <img
              src={imageUrl}
              alt={medicine.brand_name}
              className="w-full h-80 lg:h-96 object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80";
              }}
            />
            {medicine.prescription_required && (
              <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Rx Required
              </span>
            )}
          </div>

          <div className="bg-purple-50/40 p-4 rounded-2xl border border-purple-100 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Manufacturer:</span>
              <span className="font-bold text-slate-800">{medicine.manufacturer}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Marketer:</span>
              <span className="font-bold text-slate-800">{medicine.marketer}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Quality Standard:</span>
              <span className="font-bold text-purple-700">WHO-GMP & IP/BP Compliant</span>
            </div>
          </div>
        </div>

        {/* Right Column: Specs & Overview */}
        <div className="lg:col-span-7 space-y-6">
          
          <div>
            <div className="flex items-center space-x-2">
              {medicine.category_details && (
                <span className="bg-purple-100 text-purple-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {medicine.category_details.name}
                </span>
              )}
              <span className="bg-purple-950 text-white text-xs font-bold px-3 py-1 rounded-full">
                {medicine.dosage_form}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              {medicine.brand_name}
            </h1>
            <p className="text-base font-bold text-purple-700 mt-1">
              Generic / Composition: {medicine.generic_name}
            </p>
          </div>

          {/* Spec Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-purple-50/40 p-4 rounded-2xl border border-purple-100 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Active Strength</span>
              <span className="font-bold text-slate-800 text-sm">{medicine.strength}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Packaging</span>
              <span className="font-bold text-slate-800 text-sm">{medicine.packaging}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Formulation Type</span>
              <span className="font-bold text-slate-800 text-sm">{medicine.dosage_form}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Composition Formula</h3>
            <p className="text-sm font-medium text-purple-950 bg-purple-50 p-3 rounded-xl border border-purple-100">
              {medicine.composition}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Product Overview</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {medicine.description}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Indications & Usage</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {medicine.indications}
            </p>
          </div>

          <div className="flex items-start space-x-3 bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900">
            <Thermometer className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Storage Instructions:</span>
              <span>{medicine.storage_information}</span>
            </div>
          </div>

          {/* Enquire CTA Button (Rendered only for B2B Clients & Guest Visitors) */}
          {!isAdmin && (
            <div className="pt-2">
              <button
                onClick={() => navigate(`/contact?product=${encodeURIComponent(medicine.brand_name)}`)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-purple-600/25 transition text-base"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Enquire About This Product</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mandatory Professional Medical Disclaimer */}
      <div className="bg-purple-50/60 rounded-2xl p-6 border border-purple-100 flex items-start space-x-4">
        <ShieldAlert className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 space-y-1">
          <span className="font-bold text-purple-950 block text-sm">Regulatory Notice & Professional Disclaimer</span>
          <p className="leading-relaxed">
            Product information provided on this website is intended primarily for healthcare professionals and business partners. It should not be considered a substitute for professional medical advice, diagnosis, or treatment. Famivaa Healthcare supplies formulations only to authorized businesses and medical professionals in compliance with pharmaceutical laws.
          </p>
        </div>
      </div>

    </div>
  );
};
