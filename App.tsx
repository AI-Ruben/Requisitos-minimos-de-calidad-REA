import React, { useState, useMemo, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import jsPDF from 'jspdf';
import { Header } from './components/Header';
import { RequirementCard } from './components/RequirementCard';
import { StatsSection } from './components/StatsSection';
import { CategorySection } from './components/CategorySection';
import { ResultSection } from './components/ResultSection';
import { FooterActions } from './components/FooterActions';
import { ResourceAnalyzer } from './components/ResourceAnalyzer';
import { readFileAsText } from './utils/fileReader';
import { categories as categoriesData, TOTAL_ITEMS, REQUIRED_ITEMS } from './constants/data';
import type { Category, CheckedItems, CategoryStats } from './types';

const App: React.FC = () => {
  const [categories] = useState<Category[]>(categoriesData);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [analysisStatus, setAnalysisStatus] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
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
      setAnalysisError(null);
    }
  }, []);

  const handleAnalyze = useCallback(async (file: File) => {
    setAnalysisStatus("Iniciando análisis...");
    setAnalysisError(null);
    setCheckedItems({});

    try {
      const resourceContent = await readFileAsText(file);
      
      if (resourceContent.length > 800000) {
        throw new Error("El archivo HTML es demasiado grande para ser procesado. Por favor, intente con un recurso más pequeño.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

      for (const [index, category] of categories.entries()) {
        setAnalysisStatus(`Analizando Categoría ${index + 1}/${categories.length}: ${category.name.split(': ')[1]}`);
        
        const criteriaJson = JSON.stringify({
          id: category.id,
          name: category.name,
          criteria: category.criteria.map((crit, cIdx) => ({
            name: crit.name,
            items: crit.items.map((item, iIdx) => ({
              id: `${category.id}-c${cIdx}-i${iIdx}`,
              text: item.text,
              description: item.description,
            })),
          })),
        });

        const prompt = `
          You are an expert in instructional design, evaluating an Open Educational Resource's HTML content.
          Analyze the provided HTML to see if it meets the criteria for the category: "${category.name}".

          **Resource Content:**
          \`\`\`html
          ${resourceContent}
          \`\`\`

          **Evaluation Criteria for category "${category.name}":**
          \`\`\`json
          ${criteriaJson}
          \`\`\`

          **Instructions:**
          Based *only* on the HTML content, determine which criteria are met.
          Your response MUST be a single, valid JSON object with one key: "checkedItems".
          The value for "checkedItems" is an object where each key is a criterion ID (e.g., "${category.id}-c0-i0") and its value is a boolean.
          Mark \`true\` if met, \`false\` if not met or if you cannot determine from the content.
          Do not add markdown, comments, or explanations.
        `;
        
        const genAIResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });

        const jsonString = genAIResponse.text.trim();
        const result = JSON.parse(jsonString);

        if (result.checkedItems && typeof result.checkedItems === 'object') {
          setCheckedItems(prev => ({ ...prev, ...result.checkedItems }));
        } else {
          throw new Error(`La respuesta de la IA para la categoría "${category.name}" no tuvo el formato esperado.`);
        }
      }

    } catch (error) {
      console.error("Error during AI analysis:", error);
      let errorMessage = "Ocurrió un error inesperado durante el análisis.";
      if (error instanceof Error) {
        if (error.message.includes("token")) {
          errorMessage = "El archivo del recurso es demasiado grande para ser procesado, incluso por categoría. Por favor, intente con un recurso más pequeño.";
        } else {
          errorMessage = error.message;
        }
      }
      setAnalysisError(errorMessage);
    } finally {
      setAnalysisStatus(null);
    }
  }, [categories]);


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
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Title Page
    doc.setFontSize(22);
    doc.text("Informe de Evaluación de REA", pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 20;

    // Summary Section
    const isValid = totalChecked >= REQUIRED_ITEMS;
    doc.setFontSize(18);
    doc.text("Resumen de Resultados", 15, yPos);
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(isValid ? '#28a745' : '#dc3545');
    doc.text(`Resultado Final: ${isValid ? 'REA VÁLIDO' : 'REA NO VÁLIDO'}`, 15, yPos);
    doc.setTextColor(0); // Reset color
    yPos += 7;
    doc.text(`Puntuación Total: ${totalChecked} / ${TOTAL_ITEMS} ítems`, 15, yPos);
    yPos += 10;

    doc.setFontSize(14);
    doc.text("Puntuación por Categoría:", 15, yPos);
    yPos += 8;
    doc.setFontSize(12);
    categories.forEach(category => {
        const stats = categoryStats[category.id];
        doc.text(`- ${category.name.split(': ')[1]}: ${stats.checked} / ${stats.total}`, 20, yPos);
        yPos += 7;
    });

    // Detailed Breakdown
    doc.addPage();
    yPos = 20;
    doc.setFontSize(18);
    doc.text("Desglose Detallado de Ítems", 15, yPos);
    yPos += 15;

    const checkPageBreak = (spaceNeeded: number) => {
        if (yPos + spaceNeeded > doc.internal.pageSize.getHeight() - 20) {
            doc.addPage();
            yPos = 20;
        }
    };

    categories.forEach(category => {
        checkPageBreak(15);
        doc.setFontSize(16);
        doc.text(category.name, 15, yPos);
        yPos += 10;

        category.criteria.forEach((criterion, cIdx) => {
            checkPageBreak(10);
            doc.setFontSize(14);
            doc.text(criterion.name, 20, yPos);
            yPos += 8;

            criterion.items.forEach((item, iIdx) => {
                const checkboxId = `${category.id}-c${cIdx}-i${iIdx}`;
                const isChecked = !!checkedItems[checkboxId];
                const symbol = isChecked ? '✔' : '✖';
                const color = isChecked ? '#28a745' : '#dc3545';
                
                const splitText = doc.splitTextToSize(item.text, pageWidth - 32 - 25);
                const textHeight = (splitText.length * 5) + 3;
                checkPageBreak(textHeight);

                doc.setFontSize(12);
                doc.setTextColor(color);
                doc.text(symbol, 25, yPos);
                doc.setTextColor(0);
                
                doc.text(splitText, 32, yPos);
                yPos += textHeight;
            });
             yPos += 2;
        });
        yPos += 5;
    });

    doc.save(`evaluacion-REA-${new Date().toISOString().split('T')[0]}.pdf`);
  }, [totalChecked, categories, categoryStats, checkedItems]);

  return (
    <div className="container mx-auto max-w-5xl">
      <Header />
      <main>
        <ResourceAnalyzer 
          onAnalyze={handleAnalyze} 
          analysisStatus={analysisStatus} 
          error={analysisError}
        />
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
