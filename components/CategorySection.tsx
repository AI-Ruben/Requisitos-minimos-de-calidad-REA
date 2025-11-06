import React, { useState } from 'react';
import type { Category, Criterion, CheckedItems } from '../types';

interface CheckboxItemProps {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (id: string, isChecked: boolean) => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ id, label, isChecked, onChange }) => (
  <label htmlFor={id} className="flex items-start gap-3 p-3 bg-white rounded-md cursor-pointer hover:bg-slate-100 transition-colors">
    <input
      type="checkbox"
      id={id}
      checked={isChecked}
      onChange={(e) => onChange(id, e.target.checked)}
      className="mt-1 h-5 w-5 rounded border-gray-300 text-[#6080A3] focus:ring-[#6080A3] shrink-0"
    />
    <span className={`flex-grow text-sm ${isChecked ? 'font-semibold text-[#6080A3]' : 'text-gray-700'}`}>
      {label}
    </span>
  </label>
);

interface CriterionGroupProps {
  categoryId: string;
  criterion: Criterion;
  criterionIndex: number;
  checkedItems: CheckedItems;
  onCheckboxChange: (id: string, isChecked: boolean) => void;
}

const CriterionGroup: React.FC<CriterionGroupProps> = ({ categoryId, criterion, criterionIndex, checkedItems, onCheckboxChange }) => (
  <div className="mb-5 bg-slate-50 p-4 rounded-lg border-l-4 border-[#6080A3]">
    <h4 className="font-bold text-base text-[#6080A3] mb-3">{criterion.name}</h4>
    <div className="flex flex-col gap-2">
      {criterion.items.map((item, itemIndex) => {
        const checkboxId = `${categoryId}-c${criterionIndex}-i${itemIndex}`;
        return (
          <CheckboxItem
            key={checkboxId}
            id={checkboxId}
            label={item}
            isChecked={!!checkedItems[checkboxId]}
            onChange={onCheckboxChange}
          />
        );
      })}
    </div>
  </div>
);

interface CategorySectionProps {
  category: Category;
  checkedItems: CheckedItems;
  onCheckboxChange: (id: string, isChecked: boolean) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, checkedItems, onCheckboxChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="bg-white rounded-xl shadow-md overflow-hidden">
      <header
        className="bg-gradient-to-br from-[#6080A3] to-[#4a6482] text-white p-5 cursor-pointer flex justify-between items-center hover:from-[#4a6482] hover:to-[#6080A3] transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold">{category.icon} {category.name}</h2>
        <span className={`transform transition-transform duration-300 text-2xl ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </header>
      <div 
        className={`transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        style={{display: 'grid'}}
      >
        <div className="overflow-hidden">
           <div className="p-5">
            {category.criteria.map((criterion, index) => (
              <CriterionGroup
                key={index}
                categoryId={category.id}
                criterion={criterion}
                criterionIndex={index}
                checkedItems={checkedItems}
                onCheckboxChange={onCheckboxChange}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};