import React from 'react';

export const LogoIcon = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topBarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="bodyRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#936ec9" />
        <stop offset="50%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#5b21b6" />
      </linearGradient>
    </defs>
    {/* Top horizontal angled bar */}
    <path
      d="M 25 35 C 25 26 30 22 40 22 L 138 22 C 145 22 148 26 142 35 L 118 64 C 114 69 108 72 100 72 L 40 72 Z"
      fill="url(#topBarGrad)"
    />
    {/* Main flowing curved F body */}
    <path
      d="M 40 72 C 75 72 110 72 120 72 C 128 72 130 78 124 86 L 105 110 C 98 119 88 120 70 120 L 52 120 C 45 120 40 125 42 132 L 62 185 C 65 192 60 198 52 195 L 42 180 C 32 165 25 145 25 120 C 25 90 35 72 40 72 Z"
      fill="url(#bodyRibbonGrad)"
      transform="scale(0.85) translate(8, 12)"
    />
  </svg>
);

export const Logo = ({ variant = "default", className = "" }) => {
  const isDark = variant === "dark";

  return (
    <div className={`inline-flex items-center space-x-3 ${className}`}>
      {/* Icon SVG */}
      <svg
        viewBox="0 0 170 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 shrink-0"
      >
        <defs>
          <linearGradient id="logoTopBar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="logoRibbonBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#936ec9" />
            <stop offset="60%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
        </defs>

        {/* Top slanted bar */}
        <path
          d="M 12 28 C 12 20 18 16 28 16 L 152 16 C 160 16 163 22 155 33 L 126 70 C 121 76 113 80 104 80 L 40 80 Z"
          fill="url(#logoTopBar)"
        />

        {/* Main Ribbon curved F body */}
        <path
          d="M 40 80 C 72 80 108 80 120 80 C 128 80 131 87 124 96 L 102 124 C 95 132 84 135 70 135 C 55 135 48 142 45 156 L 36 182 C 34 188 28 190 24 184 L 14 165 C 6 150 2 132 2 110 C 2 92 18 80 40 80 Z"
          fill="url(#logoRibbonBody)"
        />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <span
          className={`text-2xl font-bold tracking-tight leading-none ${
            isDark ? 'text-white' : 'text-purple-950'
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="text-[#8b5cf6]">Famivaa</span>
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.32em] mt-1 ${
            isDark ? 'text-purple-300' : 'text-[#7c3aed]'
          }`}
        >
          HEALTHCARE
        </span>
      </div>
    </div>
  );
};

export default Logo;
