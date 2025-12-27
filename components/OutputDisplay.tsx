import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { GeneratedResult } from '../types';
import { Copy, CheckCircle, Zap, ListChecks, Split } from 'lucide-react';

interface OutputDisplayProps {
  result: GeneratedResult | null;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ result }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 border border-dashed border-slate-700 rounded-2xl bg-slate-850/50">
        <Zap className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg text-center font-medium">Ready to dominate the job board?</p>
        <p className="text-sm text-center opacity-60 max-w-xs mt-2">Fill out the project details on the left to generate your elite proposal.</p>
      </div>
    );
  }

  const handleCopy = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2 custom-scrollbar">
      
      {/* Main Proposal Card */}
      <div className="bg-slate-850 rounded-2xl shadow-xl border border-slate-700 overflow-hidden relative group">
        <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center sticky top-0 z-10">
            <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                The Proposal
            </h3>
            <button
                onClick={() => handleCopy(result.sections.proposal, 'proposal')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full transition-colors"
            >
                {copiedSection === 'proposal' ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedSection === 'proposal' ? 'Copied!' : 'Copy Text'}
            </button>
        </div>
        <div className="p-6 md:p-8 text-slate-200 prose prose-invert prose-p:leading-relaxed prose-li:text-slate-300 max-w-none">
            <ReactMarkdown>{result.sections.proposal}</ReactMarkdown>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analysis Card */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h3 className="text-lg font-bold text-indigo-400 mb-4 flex items-center gap-2">
                <ListChecks className="w-5 h-5" />
                Strategy Analysis
            </h3>
            <div className="text-sm text-slate-300 prose prose-invert prose-headings:text-indigo-300 prose-headings:text-sm prose-p:text-slate-400">
                <ReactMarkdown>{result.sections.analysis}</ReactMarkdown>
            </div>
        </div>

        {/* Alternatives Card */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <Split className="w-5 h-5" />
                Alternative Angles
            </h3>
            <div className="text-sm text-slate-300 prose prose-invert prose-headings:text-amber-300 prose-headings:text-sm prose-p:text-slate-400">
                 <ReactMarkdown>{result.sections.alternatives}</ReactMarkdown>
            </div>
        </div>
      </div>

      {/* Checklist Card */}
      <div className="bg-gradient-to-r from-slate-850 to-slate-900 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Submission Checklist
        </h3>
        <div className="text-slate-300 prose prose-invert prose-ul:list-none prose-ul:pl-0 prose-li:flex prose-li:gap-2 prose-li:items-start">
            <ReactMarkdown 
                components={{
                    li: ({node, ...props}) => <li className="flex gap-2"><span className="text-emerald-500 mt-1">✓</span><span {...props} /></li>
                }}
            >
                {result.sections.checklist.replace(/- \[ \]/g, '')}
            </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default OutputDisplay;
