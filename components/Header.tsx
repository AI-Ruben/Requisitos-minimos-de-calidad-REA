import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-gradient-to-br from-[#4a6482] to-[#6080A3] text-white p-6 sm:p-8 rounded-xl mb-8 shadow-lg">
    <h1 className="text-3xl sm:text-4xl font-bold mb-2">Evaluador de REA</h1>
    <p className="text-lg opacity-95">Herramienta para validar la calidad de Recursos Educativos Abiertos en Navarra</p>
  </header>
);