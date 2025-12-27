import React, { useState } from 'react';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import { ProposalInputs, GeneratedResult, ToneType, LoadingState } from './types';
import { generateProposal } from './services/geminiService';
import { Send, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<ProposalInputs>({
    jobPost: '',
    background: '',
    rate: '',
    portfolio: '',
    approach: '',
    tone: ToneType.PROFESSIONAL,
  });

  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoadingState(LoadingState.GENERATING);
    setError(null);
    try {
      const data = await generateProposal(inputs);
      setResult(data);
      setLoadingState(LoadingState.COMPLETE);
    } catch (err) {
      setError("Failed to generate proposal. Please check your API key and try again.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-2 rounded-lg">
                <Send className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">ProposalPro <span className="text-emerald-400">AI</span></h1>
              <p className="text-xs text-slate-400 hidden sm:block">Elite Upwork Proposal Specialist</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 py-1.5 px-3 rounded-full border border-slate-700/50">
             <Sparkles className="w-3 h-3 text-indigo-400" />
             <span>Powered by Gemini 3</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:h-[calc(100vh-4rem)]">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          
          {/* Left Column - Input */}
          <div className="w-full lg:w-5/12 h-full">
            <InputForm 
              inputs={inputs}
              setInputs={setInputs}
              onSubmit={handleSubmit}
              isLoading={loadingState === LoadingState.GENERATING}
            />
          </div>

          {/* Right Column - Output */}
          <div className="w-full lg:w-7/12 h-full flex flex-col">
            {error && (
               <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-lg flex items-center gap-2">
                 <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 {error}
               </div>
            )}
            <OutputDisplay result={result} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
