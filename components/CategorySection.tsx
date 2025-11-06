import React, { useState } from 'react';
import type { Category, Criterion, CheckedItems, Item } from '../types';

interface CheckboxItemProps {
  id: string;
  item: Item;
  isChecked: boolean;
  onChange: (id: string, isChecked: boolean) => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ id, item, isChecked, onChange }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="flex items-start gap-3 p-3 bg-white rounded-md hover:bg-slate-100 transition-colors">
      <label htmlFor={id} className="flex-grow flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={(e) => onChange(id, e.target.checked)}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-[#6080A3] focus:ring-[#6080A3] shrink-0"
        />
        <span className={`text-sm ${isChecked ? 'font-semibold text-[#6080A3]' : 'text-gray-700'}`}>
          {item.text}
        </span>
      </label>
      <div className="relative flex items-center shrink-0 mt-1">
        <button
          type="button"
          onClick={() => setIsTooltipVisible(!isTooltipVisible)}
          className="flex items-center"
          aria-label={`Más información sobre ${item.text}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </button>
        <div 
          role="tooltip" 
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 p-4 bg-gray-800 text-white text-sm text-center font-normal rounded-lg transition-opacity duration-300 z-10 shadow-lg ${isTooltipVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
            {item.description}
            <svg className="absolute text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
        </div>
      </div>
    </div>
  );
};

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
            item={item}
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
    <section className="bg-white rounded-xl shadow-md">
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
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="min-h-0">
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
