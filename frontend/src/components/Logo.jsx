import React from 'react';

export const LogoIcon = ({ className = 'w-11 h-11' }) => (
  <span className={`block ${className}`}>
    <img src="/famivaa-logo-transparent.png" alt="" className="h-full w-full scale-125 object-contain" />
  </span>
);

export const Logo = ({ variant = 'default', className = '' }) => {
  const dark = variant === 'dark';
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <LogoIcon />
      <div className="flex flex-col">
        <span className={`text-[1.35rem] font-extrabold leading-none tracking-[-0.04em] ${dark ? 'text-white' : 'text-[#171225]'}`}>
          Famivaa
        </span>
        <span className={`mt-1 text-[8px] font-bold uppercase tracking-[0.32em] ${dark ? 'text-violet-300' : 'text-violet-700'}`}>
          Healthcare
        </span>
      </div>
    </div>
  );
};

export default Logo;
