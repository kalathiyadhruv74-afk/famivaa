import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, Award, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-purple-950 text-purple-200 pt-16 pb-8 border-t border-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-purple-900/80">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <Logo variant="dark" />
            </Link>
            <p className="text-sm text-purple-300/80 leading-relaxed">
              Famivaa Healthcare is a leading B2B pharmaceutical manufacturer and supplier dedicated to supplying high-grade medicinal formulations to medical practitioners, hospital networks, pharmacies, and distributors.
            </p>
            <div className="flex items-center space-x-2 text-xs text-purple-400 font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4 text-purple-400" />
              <span>GMP & ISO Standard Formulations</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-semibold tracking-wide">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-300 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-300 transition-colors">About Famivaa Healthcare</Link>
              </li>
              <li>
                <Link to="/medicines" className="hover:text-purple-300 transition-colors">Pharmaceutical Products</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-300 transition-colors">B2B Product Inquiry</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-purple-300 transition-colors">Client Partner Login</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: B2B Target Audience */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-semibold tracking-wide">Our Partner Network</h3>
            <ul className="space-y-2 text-sm text-purple-300/80">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Hospitals & Surgical Centers</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Medical Clinics & Practitioners</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Retail Medical Stores & Pharmacies</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Wholesale Pharmaceutical Distributors</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Healthcare Institutions & Procurement</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Business Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-semibold tracking-wide">Corporate Contact</h3>
            <div className="space-y-3 text-sm text-purple-200">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span>Famivaa Towers, Plot 42, Pharma Innovation Park, Bandra-Kurla Complex, Mumbai, MH 400051</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>+91 22 4900 8800 / +91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>enquiry@famivaa.com</span>
              </div>
              <div className="flex items-center space-x-3 text-purple-300 text-xs pt-1">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:30 PM IST</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom B2B Regulatory & Copyright Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-purple-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">Famivaa Healthcare Pvt Ltd</strong>. All rights reserved.
          </div>
          <div className="text-center md:text-right text-[11px] max-w-xl text-purple-400/80">
            Disclaimer: Famivaa Healthcare is a B2B pharmaceutical company. Product information on this site is provided for healthcare professionals, institutions, and trade partners. No direct-to-consumer sales or prescription medicine orders are processed on this portal.
          </div>
        </div>
      </div>
    </footer>
  );
};
