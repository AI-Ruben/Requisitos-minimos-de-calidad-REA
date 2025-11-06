
import React from 'react';

interface FooterActionsProps {
  onExportPdf: () => void;
  onExportJson: () => void;
  onReset: () => void;
}

export const FooterActions: React.FC<FooterActionsProps> = ({ onExportPdf, onExportJson, onReset }) => {
  const baseButtonClass = "px-6 py-3 rounded-lg font-bold text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50";

  return (
    <footer className="mt-10 bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-wrap justify-center sm:justify-end gap-4">
        <button
          onClick={onExportPdf}
          className={`${baseButtonClass} bg-green-600 hover:bg-green-700 focus:ring-green-500`}
        >
          📄 Exportar Informe
        </button>
        <button
          onClick={onExportJson}
          className={`${baseButtonClass} bg-sky-600 hover:bg-sky-700 focus:ring-sky-500`}
        >
          💾 Descargar JSON
        </button>
        <button
          onClick={onReset}
          className={`${baseButtonClass} bg-red-600 hover:bg-red-700 focus:ring-red-500`}
        >
          ♻️ Limpiar Formulario
        </button>
      </div>
    </footer>
  );
};
