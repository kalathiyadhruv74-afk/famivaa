import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, MessageSquare } from 'lucide-react';

export const MedicineCard = ({ medicine }) => {
  const { isAdmin } = useAuth();
  const imageUrl = medicine.effective_image_url || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80";

  return (
    <div className="bg-white rounded-2xl border border-purple-100/90 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      <div>
        {/* Top Image Container */}
        <div className="relative h-48 bg-purple-50/50 overflow-hidden">
          <img
            src={imageUrl}
            alt={medicine.brand_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {medicine.category_details && (
              <span className="bg-purple-950/85 backdrop-blur-md text-purple-100 text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {medicine.category_details.name}
              </span>
            )}
            <span className="bg-purple-700/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
              {medicine.dosage_form}
            </span>
          </div>

          {medicine.is_featured && (
            <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
              FEATURED
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
              {medicine.brand_name}
            </h3>
            <p className="text-xs font-semibold text-purple-700 mt-0.5">
              {medicine.generic_name}
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-purple-50/40 p-2.5 rounded-xl border border-purple-100/60 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Composition:</span>
              <span className="font-semibold text-slate-700 truncate max-w-[170px]" title={medicine.composition}>
                {medicine.composition}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Packaging:</span>
              <span className="font-semibold text-slate-700">{medicine.packaging}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {medicine.short_description}
          </p>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-5 pt-0 mt-2">
        {isAdmin ? (
          <Link
            to={`/medicines/${medicine.slug}`}
            className="flex items-center justify-center space-x-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 py-2.5 px-3 rounded-xl text-xs font-semibold transition w-full"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-500" />
          </Link>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/medicines/${medicine.slug}`}
              className="flex items-center justify-center space-x-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 py-2.5 px-3 rounded-xl text-xs font-semibold transition"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-500" />
            </Link>
            <Link
              to={`/contact?product=${encodeURIComponent(medicine.brand_name)}`}
              className="flex items-center justify-center space-x-1.5 bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-3 rounded-xl text-xs font-semibold shadow-sm transition shadow-purple-600/20"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enquire</span>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};
