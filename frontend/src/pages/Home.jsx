import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MedicineCard } from '../components/MedicineCard';
import { 
  ShieldCheck, Truck, Users, Activity, Award, 
  ArrowRight, PhoneCall, CheckCircle2, ChevronRight, Stethoscope
} from 'lucide-react';

export const Home = () => {
  const [featuredMedicines, setFeaturedMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedMedicines();
  }, []);

  const fetchFeaturedMedicines = async () => {
    try {
      const res = await axios.get('/api/medicines/?featured=true');
      setFeaturedMedicines(res.data.results || res.data || []);
    } catch (err) {
      console.error('Failed to load featured medicines:', err);
    } finally {
      setLoading(false);
    }
  };

  const whyChooseUsCards = [
    {
      title: 'Quality Products',
      desc: 'Formulated in WHO-GMP certified facilities adhering to strict pharmacopeia standards.',
      icon: ShieldCheck,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'Reliable Supply',
      desc: 'Robust cold-chain logistics and nationwide distribution networks ensuring zero supply disruption.',
      icon: Truck,
      color: 'text-violet-600 bg-violet-50',
    },
    {
      title: 'Professional Support',
      desc: 'Dedicated B2B account managers assisting hospital buyers, clinics, and pharmacies.',
      icon: Users,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      title: 'Healthcare Focus',
      desc: 'Specialized therapeutic focus spanning gynecology, general medicine, cardiology, and pediatric formulations.',
      icon: Stethoscope,
      color: 'text-fuchsia-600 bg-fuchsia-50',
    },
    {
      title: 'Trusted Relationships',
      desc: 'Long-term transparent partnership contracts with medical practitioners and institutional buyers.',
      icon: Award,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Regulatory Compliance',
      desc: 'Complete batch documentation, COA certificates, and full regulatory traceability.',
      icon: Activity,
      color: 'text-purple-700 bg-purple-50',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="gradient-hero text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-purple-200 border border-white/20">
              <Award className="w-4 h-4 text-purple-300" />
              <span>Leading B2B Pharmaceutical Partner</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-sans">
              Healthcare Solutions <br />
              <span className="text-purple-300">You Can Trust</span>
            </h1>

            <p className="text-lg sm:text-xl text-purple-100/90 leading-relaxed font-light">
              Delivering quality pharmaceutical products and reliable healthcare formulations to medical professionals, clinics, hospitals, pharmacies, and distribution businesses.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                to="/medicines"
                className="flex items-center justify-center space-x-2 bg-purple-500 hover:bg-purple-400 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-purple-900/40 transition-all text-base"
              >
                <span>Explore Medicines</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/20 transition-all text-base"
              >
                <PhoneCall className="w-5 h-5 text-purple-300" />
                <span>Contact B2B Team</span>
              </Link>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/15 text-xs text-purple-200">
              <div>
                <div className="font-bold text-white text-lg sm:text-xl">50+</div>
                <div>Formulations</div>
              </div>
              <div>
                <div className="font-bold text-white text-lg sm:text-xl">1,200+</div>
                <div>Healthcare Partners</div>
              </div>
              <div>
                <div className="font-bold text-white text-lg sm:text-xl">WHO-GMP</div>
                <div>Certified Standards</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT SUMMARY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-purple-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 text-purple-700 text-xs font-bold uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-md">
              <span>About Famivaa Healthcare</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Dedicated B2B Partner to the Medical Profession
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Famivaa Healthcare is a B2B pharmaceutical company that supplies medicines and healthcare products directly to doctors, clinics, hospitals, medical stores, pharmacies, distributors, and registered healthcare businesses.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              We operate strictly under pharmaceutical compliance regulations, upholding institutional standards for product efficacy, packaging security, and dependable supply chains.
            </p>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                'Hospitals & Clinics Supply',
                'Pharmacies & Retail Stores',
                'Wholesale Distributors',
                'Institutional Procurement'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-purple-600 font-bold hover:text-purple-700 text-sm group"
              >
                <span>Read Full Corporate Profile</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-purple-100">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
                alt="Famivaa Healthcare Laboratory"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="font-bold text-base">State-of-the-Art Formulations</p>
                  <p className="text-xs text-purple-200">Purity, Efficacy & Patient Safety First</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Famivaa Healthcare
          </h2>
          <p className="text-slate-600 text-sm">
            Built on core principles of medical excellence, batch consistency, and professional trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUsCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-purple-100/80 shadow-sm hover:shadow-md hover:border-purple-300 transition-all space-y-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED MEDICINES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-purple-100 pb-4">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Catalogue Spotlight</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Featured Formulations</h2>
          </div>
          <Link
            to="/medicines"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-purple-600 hover:text-purple-700"
          >
            <span>Browse All Medicines</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-purple-100/50 rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMedicines.slice(0, 4).map((med) => (
              <MedicineCard key={med.id} medicine={med} />
            ))}
          </div>
        )}
      </section>

      {/* 5. CONTACT CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 rounded-3xl p-8 lg:p-12 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Interested in Our Pharmaceutical Products?
            </h2>
            <p className="text-purple-200 text-sm leading-relaxed">
              Connect with our B2B trade desk for product samples, wholesale catalog requests, hospital rate contracts, or dealership inquiries.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-7 py-3 rounded-xl transition shadow-lg shadow-purple-950/50"
              >
                Contact Famivaa Healthcare
              </Link>
              <Link
                to="/medicines"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3 rounded-xl border border-white/20 transition"
              >
                View Complete Catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
