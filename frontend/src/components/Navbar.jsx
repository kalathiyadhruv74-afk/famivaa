import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { 
  Pill, Home, Info, PhoneCall, LayoutDashboard, 
  LogOut, LogIn, Menu, X, ShieldAlert, UserCheck
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Medicines', path: '/medicines', icon: Pill },
    { name: 'Contact Us', path: '/contact', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Brand Logo */}
          <Link to="/" className="flex items-center group">
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-purple-50 text-purple-700 shadow-sm font-semibold border border-purple-200/60'
                      : 'text-slate-600 hover:text-purple-900 hover:bg-purple-50/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-purple-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Auth Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {isAdmin ? (
                  <Link
                    to="/admin-dashboard"
                    className="flex items-center space-x-2 bg-purple-950 text-white hover:bg-purple-900 px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm"
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-400" />
                    <span>Admin Panel</span>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 bg-purple-600 text-white hover:bg-purple-700 px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-sm shadow-purple-600/20"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 px-3.5 py-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl text-sm font-medium transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2.5 text-slate-700 hover:text-purple-700 hover:bg-purple-50/70 rounded-xl text-sm font-medium transition"
                >
                  <LogIn className="w-4 h-4 text-purple-500" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition shadow-md shadow-purple-600/20"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>B2B Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-purple-900 hover:bg-purple-50 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-purple-100 px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium ${
                  active ? 'bg-purple-50 text-purple-700 font-semibold border border-purple-100' : 'text-slate-700 hover:bg-purple-50/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-purple-600' : 'text-slate-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-purple-50 space-y-2">
            {user ? (
              <>
                <Link
                  to={isAdmin ? "/admin-dashboard" : "/dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 rounded-xl font-medium shadow-sm"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>{isAdmin ? "Admin Dashboard" : "User Dashboard"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-rose-50 text-rose-600 py-3 rounded-xl font-medium hover:bg-rose-100 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-purple-50 text-purple-800 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-100"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-purple-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-purple-700"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
