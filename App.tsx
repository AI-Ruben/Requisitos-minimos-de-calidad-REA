
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { RequirementCard } from './components/RequirementCard';
import { StatsSection } from './components/StatsSection';
import { CategorySection } from './components/CategorySection';
import { ResultSection } from './components/ResultSection';
import { FooterActions } from './components/FooterActions';
import { categories as categoriesData, TOTAL_ITEMS, REQUIRED_ITEMS } from './constants/data';
import type { Category, CheckedItems, CategoryStats } from './types';

const App: React.FC = () => {
  const [categories] = useState<Category[]>(categoriesData);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  
  const totalChecked = useMemo(() => Object.values(checkedItems).filter(Boolean).length, [checkedItems]);
  
  const categoryStats: CategoryStats = useMemo(() => {
    const stats: CategoryStats = {};
    categories.forEach(category => {
      let checkedCount = 0;
      let totalCount = 0;
      category.criteria.forEach(criterion => {
        totalCount += criterion.items.length;
        criterion.items.forEach((_, itemIndex) => {
          const criterionIndex = category.criteria.indexOf(criterion);
          const checkboxId = `${category.id}-c${criterionIndex}-i${itemIndex}`;
          if (checkedItems[checkboxId]) {
            checkedCount++;
          }
        });
      });
      stats[category.id] = { checked: checkedCount, total: totalCount };
    });
    return stats;
  }, [categories, checkedItems]);

  const handleCheckboxChange = useCallback((id: string, isChecked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [id]: isChecked }));
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm('¿Seguro que deseas limpiar todos los datos?')) {
      setCheckedItems({});
    }
  }, []);

  const handleExportJson = useCallback(() => {
    const data = {
      timestamp: new Date().toISOString(),
      totalItems: TOTAL_ITEMS,
      requiredItems: REQUIRED_ITEMS,
      checkedItems: totalChecked,
      results: categories.map(category => ({
        name: category.name,
        id: category.id,
        checked: categoryStats[category.id].checked,
        total: categoryStats[category.id].total,
      }))
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `evaluacion-REA-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [totalChecked, categories, categoryStats]);

  const handleExportPdf = useCallback(() => {
    alert('Función de exportación a PDF disponible en breve. Los datos están listos para exportar.');
  }, []);

  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <main>
        <RequirementCard required={REQUIRED_ITEMS} total={TOTAL_ITEMS} />
        <StatsSection totalChecked={totalChecked} totalItems={TOTAL_ITEMS} categoryStats={categoryStats} categories={categories} />
        
        {totalChecked > 0 && (
          <ResultSection totalChecked={totalChecked} requiredItems={REQUIRED_ITEMS} totalItems={TOTAL_ITEMS} />
        )}

        <div className="space-y-6">
          {categories.map(category => (
            <CategorySection
              key={category.id}
              category={category}
              checkedItems={checkedItems}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
        
        <FooterActions 
          onExportPdf={handleExportPdf}
          onExportJson={handleExportJson}
          onReset={handleReset}
        />
      </main>
    </div>
  );
};

export default App;
