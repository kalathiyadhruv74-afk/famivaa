import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Target, Eye, Stethoscope, Store, Hospital, Truck, CheckCircle2, ArrowRight
} from 'lucide-react';

export const About = () => {
  const targetAudience = [
    { name: 'Doctors & Practitioners', icon: Stethoscope, desc: 'Prescription-ready therapeutic formulations backed by clinical consistency.' },
    { name: 'Clinics & Polyclinics', icon: Building2, desc: 'Direct supply for outpatient dispensaries and clinical treatment protocols.' },
    { name: 'Hospitals & ICUs', icon: Hospital, desc: 'Sterile parenterals, critical care IVs, and high-volume inpatient supplies.' },
    { name: 'Medical Stores & Pharmacies', icon: Store, desc: 'Commercially packaged retail formulations with fast stock replenishment.' },
    { name: 'Wholesale Distributors', icon: Truck, desc: 'Authorized regional dealership and bulk B2B distribution arrangements.' },
  ];

  const values = [
    { title: 'Quality Excellence', desc: 'Every formulation batch undergoes strict chemical and physical quality auditing.' },
    { title: 'Institutional Trust', desc: 'Transparent batch documentation, ethical business practices, and clear regulatory compliance.' },
    { title: 'Supply Reliability', desc: 'Disciplined supply chain workflows preventing medicine shortages in critical settings.' },
    { title: 'Professionalism', desc: 'Responsive corporate support for institutional healthcare purchasing teams.' },
    { title: 'Healthcare Responsibility', desc: 'Commitment to high safety standards and patient welfare through superior therapeutics.' },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Page Header */}
      <section className="bg-purple-950 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-widest bg-purple-900/60 px-3.5 py-1.5 rounded-full border border-purple-800">
            Corporate Profile
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About Famivaa Healthcare
          </h1>
          <p className="max-w-2xl mx-auto text-purple-200 text-base">
            Empowering healthcare professionals and medical businesses with high-grade pharmaceutical formulations and trusted B2B supply solutions.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-purple-100/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              A Trusted B2B Pharmaceutical Partner
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Famivaa Healthcare is a B2B pharmaceutical enterprise specializing in the manufacture, formulation, and commercial distribution of quality medicines. We partner directly with registered doctors, polyclinics, hospitals, medical stores, retail pharmacies, and wholesale distributors.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our core objective is to simplify pharmaceutical procurement for healthcare institutions by offering consistent product availability, transparent batch documentation, and WHO-GMP compliant standards.
            </p>
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-purple-900 text-xs leading-relaxed font-medium">
              Note: Famivaa Healthcare does not sell prescription products directly to individual retail patients via this web portal. Our catalog and services are exclusively designed for licensed healthcare professionals and medical businesses.
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80"
              alt="Pharma Manufacturing"
              className="rounded-2xl h-48 w-full object-cover shadow-sm border border-purple-100"
            />
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80"
              alt="Lab Inspection"
              className="rounded-2xl h-48 w-full object-cover shadow-sm border border-purple-100"
            />
          </div>
        </div>
      </section>

      {/* Target B2B Audience Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Who We Serve</h2>
          <p className="text-slate-600 text-sm">Providing tailored pharmaceutical distribution to diverse healthcare sectors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {targetAudience.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-purple-100 text-center space-y-3 hover:border-purple-400 transition">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-gradient-to-br from-purple-950 to-indigo-950 text-white rounded-3xl p-8 space-y-4 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Our Mission</h3>
          <p className="text-purple-200 text-sm leading-relaxed">
            To provide dependable, accessible, and high-quality pharmaceutical formulations while sustaining strong, ethical, and long-term business partnerships with healthcare professionals and medical institutions.
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-950 to-purple-900 text-white rounded-3xl p-8 space-y-4 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-300">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Our Vision</h3>
          <p className="text-purple-200 text-sm leading-relaxed">
            To be recognized as a premier B2B pharmaceutical brand celebrated for absolute product purity, unyielding supply chain integrity, customer-centric service, and responsible healthcare solutions.
          </p>
        </div>

      </section>

      {/* Corporate Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Our Core Values</h2>
          <p className="text-slate-600 text-sm">The foundation of everything we build at Famivaa Healthcare.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-2">
              <div className="flex items-center space-x-2 text-purple-700 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                <span>{v.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-purple-50 rounded-3xl p-8 text-center space-y-4 border border-purple-100">
          <h3 className="text-2xl font-bold text-purple-950">Partner with Famivaa Healthcare</h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Become a distribution partner or request product catalogues for your hospital or pharmacy network.
          </p>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm shadow-md shadow-purple-600/20"
            >
              <span>Submit B2B Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
