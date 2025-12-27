import React from 'react';
import { ProposalInputs, ToneType } from '../types';
import { TONE_OPTIONS } from '../constants';
import { Briefcase, User, DollarSign, Link as LinkIcon, PenTool, LayoutTemplate } from 'lucide-react';

interface InputFormProps {
  inputs: ProposalInputs;
  setInputs: React.Dispatch<React.SetStateAction<ProposalInputs>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ inputs, setInputs, onSubmit, isLoading }) => {
  const handleChange = (field: keyof ProposalInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = inputs.jobPost.length > 10 && inputs.background.length > 10;

  return (
    <div className="bg-slate-850 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700 h-full overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <LayoutTemplate className="w-6 h-6 text-emerald-400" />
          Project Details
        </h2>
        <p className="text-slate-400 text-sm">Provide the raw material, and AI will craft the masterpiece.</p>
      </div>

      <div className="space-y-6">
        
        {/* Job Post */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            Job Post / Description <span className="text-red-400">*</span>
          </label>
          <textarea
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[120px] resize-y"
            placeholder="Paste the full job description here..."
            value={inputs.jobPost}
            onChange={(e) => handleChange('jobPost', e.target.value)}
          />
        </div>

        {/* Background */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            Your Background <span className="text-red-400">*</span>
          </label>
          <textarea
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[80px] resize-y"
            placeholder="e.g. 5 years React experience, specialized in SaaS..."
            value={inputs.background}
            onChange={(e) => handleChange('background', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rate */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Your Rate/Budget
            </label>
            <input
              type="text"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="e.g. $50/hr or $1000 fixed"
              value={inputs.rate}
              onChange={(e) => handleChange('rate', e.target.value)}
            />
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <PenTool className="w-4 h-4 text-emerald-400" />
              Tone Preference
            </label>
            <div className="relative">
              <select
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none transition-all"
                value={inputs.tone}
                onChange={(e) => handleChange('tone', e.target.value)}
              >
                {TONE_OPTIONS.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-emerald-400" />
            Relevant Portfolio Items
          </label>
          <textarea
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[80px] resize-y"
            placeholder="Links to specific work or brief descriptions of relevant past projects..."
            value={inputs.portfolio}
            onChange={(e) => handleChange('portfolio', e.target.value)}
          />
        </div>

        {/* Strategy (Optional) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-emerald-400" />
            Specific Strategy/Approach (Optional)
          </label>
          <textarea
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all min-h-[60px] resize-y"
            placeholder="Any specific angle you want to take? e.g. 'Suggest a paid audit first'"
            value={inputs.approach}
            onChange={(e) => handleChange('approach', e.target.value)}
          />
        </div>

        <button
          onClick={onSubmit}
          disabled={!isFormValid || isLoading}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg 
            ${isFormValid && !isLoading 
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 transform hover:-translate-y-1' 
              : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-70'
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Crafting Proposal...
            </span>
          ) : (
            'Generate Winning Proposal'
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
