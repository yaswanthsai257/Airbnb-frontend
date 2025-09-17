// src/components/icons/Navicons.tsx

import React from 'react';

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="currentColor" {...props}>
    <path d="M54.5 28.3L33.3 11.2c-.7-.6-1.9-.6-2.6 0L9.5 28.3c-.5.4-.5 1.2 0 1.6l1.8 1.4c.5.4 1.2.1 1.4-.4L32 6.5l19.3 24.4c.3.4.9.7 1.4.4l1.8-1.4c.5-.4.5-1.2 0-1.6z" fill="#000"/>
    <path d="M51.2 33.3H12.8c-1.1 0-2 .9-2 2v22.4c0 1.1.9 2 2 2h38.4c1.1 0 2-.9 2-2V35.3c0-1.1-.9-2-2-2z" fill="#000"/>
    <path d="M34.7 54.4h-5.4V42.8c0-.8.7-1.5 1.5-1.5h2.4c.8 0 1.5.7 1.5 1.5v11.6z" fill="#FFF"/>
    <path d="M34.7 54.4h-5.4V42.8c0-.8.7-1.5 1.5-1.5h2.4c.8 0 1.5.7 1.5 1.5v11.6z" fill="none"/>
    <rect x="29.3" y="44.3" fill="#E53935" width="5.4" height="10.1"/>
  </svg>
);

export const ExperienceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 64 64" fill="currentColor" {...props}>
        <path d="M32 2C18.7 2 8 12.7 8 26c0 7.4 3.3 14 8.5 18.5l14.4 15.1 1.1 1.2c.4.4 1 .4 1.4 0l15.5-16.3C52.7 40 56 33.4 56 26 56 12.7 45.3 2 32 2z" fill="#FF5A5F" />
        <path d="M32 40.5c-8 0-14.5-6.5-14.5-14.5S24 11.5 32 11.5 46.5 18 46.5 26 40 40.5 32 40.5z" fill="#FFF" />
        <path d="M39 53H25c-1.1 0-2-.9-2-2v-9h18v9c0 1.1-.9 2-2 2z" fill="#FFF"/>
        <rect x="27" y="44" width="10" height="2" fill="#FFB4B6"/>
        <rect x="27" y="48" width="10" height="2" fill="#FFB4B6"/>
  </svg>
);

export const ServiceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 64 64" fill="currentColor" {...props}>
        <path d="M50 42h-2V25c0-8.8-7.2-16-16-16S16 16.2 16 25v17h-2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h36c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" fill="#B0B0B0"/>
        <path d="M32 58c2.8 0 5-2.2 5-5h-10c0 2.8 2.2 5 5 5z" fill="#B0B0B0"/>
        <path d="M32 9c-8.8 0-16 7.2-16 16v17h32V25c0-8.8-7.2-16-16-16z" fill="#D3D3D3"/>
        <circle cx="32" cy="7" r="3" fill="#B0B0B0" />
    </svg>
);