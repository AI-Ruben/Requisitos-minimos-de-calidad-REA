
import React from 'react';

interface RequirementCardProps {
  required: number;
  total: number;
}

export const RequirementCard: React.FC<RequirementCardProps> = ({ required, total }) => {
  const percentage = ((required / total) * 100).toFixed(1);
  return (
    <div className="bg-amber-100 border border-amber-300 text-amber-800 p-4 rounded-lg mb-8 text-center">
      <p>
        <strong>Requisito de Validación:</strong> El REA debe cumplir <strong>{required} de {total} ítems</strong> para considerarse válido ({percentage}% de cumplimiento)
      </p>
    </div>
  );
};
