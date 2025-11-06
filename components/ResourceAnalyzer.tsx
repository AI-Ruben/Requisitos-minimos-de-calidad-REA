import React, { useState, useCallback } from 'react';

interface ResourceAnalyzerProps {
  onAnalyze: (file: File) => void;
  analysisStatus: string | null;
  error: string | null;
}

export const ResourceAnalyzer: React.FC<ResourceAnalyzerProps> = ({ onAnalyze, analysisStatus, error }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const isLoading = analysisStatus !== null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = useCallback(() => {
    if (isLoading || !file) return;
    onAnalyze(file);
  }, [file, isLoading, onAnalyze]);
  
  const isSubmitDisabled = isLoading || !file;

  return (
    <section className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-xl font-bold text-[#1e3c72] mb-2">Analizador con IA de REA</h2>
      <div className="text-gray-600 mb-4 text-sm">
        <p className="font-semibold">Instrucciones:</p>
        <ul className="list-disc list-inside pl-2">
            <li>Si tienes un archivo <strong>.elp</strong> o <strong>.elpx</strong>, descomprímelo primero.</li>
            <li>Sube el archivo <strong>.html</strong> principal (normalmente llamado <strong>index.html</strong>) para que la IA lo evalúe.</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full">
          <label htmlFor="file-upload" className="w-full cursor-pointer flex items-center justify-center text-sm text-slate-700 border border-slate-300 rounded-lg px-4 py-3 hover:bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            {fileName || "Seleccionar archivo .html"}
          </label>
          <input
            id="file-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            accept=".html"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-[#6080A3] hover:bg-[#4a6482] focus:ring-[#6080A3] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {analysisStatus || 'Analizando...'}
            </>
          ) : (
            '✨ Analizar con IA'
          )}
        </button>
      </div>
      
      {error && <p className="text-red-600 text-sm mt-4 p-3 bg-red-50 rounded-lg">{error}</p>}
    </section>
  );
};
