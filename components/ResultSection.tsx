
import React from 'react';

interface ResultSectionProps {
  totalChecked: number;
  requiredItems: number;
  totalItems: number;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ totalChecked, requiredItems, totalItems }) => {
  const isValid = totalChecked >= requiredItems;
  const percentage = ((totalChecked / totalItems) * 100).toFixed(1);

  const validMessage = `Excelente. Este REA cumple con los requisitos mínimos de calidad establecidos por la consejería de educación de Navarra. Requiere ${requiredItems} de ${totalItems} ítems y tiene ${totalChecked}.`;
  const invalidMessage = `Este REA necesita mejoras. Faltan ${requiredItems - totalChecked} ítem(s) para alcanzar el nivel de validación (${requiredItems} de ${totalItems} ítems).`;

  const borderClass = isValid ? 'border-green-500' : 'border-red-500';
  const badgeClass = isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  const icon = isValid ? '✅' : '❌';
  const title = isValid ? 'REA VÁLIDO' : 'REA NO VÁLIDO';

  return (
    <section className={`bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 ${borderClass}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <span>{icon}</span>
          <span>{title}</span>
        </h3>
        <span className={`px-4 py-1.5 text-sm font-semibold rounded-full ${badgeClass}`}>
          {totalChecked}/{totalItems} ítems ({percentage}%)
        </span>
      </div>
      <p className="text-gray-700">
        {isValid ? validMessage : invalidMessage}
      </p>
    </section>
  );
};
