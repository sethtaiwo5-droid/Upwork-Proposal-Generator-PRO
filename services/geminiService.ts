import { GoogleGenAI } from "@google/genai";
import { ProposalInputs, GeneratedResult } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProposal = async (inputs: ProposalInputs): Promise<GeneratedResult> => {
  try {
    const userPrompt = `
**Job Post URL or Full Description:**
${inputs.jobPost}

**Your Background:**
${inputs.background}

**Your Rate:**
${inputs.rate}

**Relevant Portfolio:**
${inputs.portfolio}

**Your Approach/Strategy:**
${inputs.approach || "Decide based on best practices for this job type."}

**Tone Preference:**
${inputs.tone}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balance creativity and professional structure
        maxOutputTokens: 2000,
      },
    });

    const text = response.text || "";
    
    // Parse the output based on the separator defined in system instruction
    const sections = text.split('---').map(s => s.trim()).filter(s => s.length > 0);
    
    // Default empty structure
    const result: GeneratedResult = {
      rawText: text,
      sections: {
        proposal: "Could not generate proposal section.",
        analysis: "Could not generate analysis.",
        alternatives: "No alternatives generated.",
        checklist: "No checklist generated."
      }
    };

    // Attempt to map sections more intelligently by header detection
    // The model is instructed to output specific headers.
    
    // Helper to find content between headers
    const findSection = (fullText: string, header: string, nextHeader?: string) => {
        const start = fullText.indexOf(header);
        if (start === -1) return "";
        const contentStart = start + header.length;
        
        if (nextHeader) {
            const end = fullText.indexOf(nextHeader, contentStart);
            if (end === -1) return fullText.slice(contentStart).trim();
            return fullText.slice(contentStart, end).trim();
        }
        return fullText.slice(contentStart).trim();
    };

    if (text) {
        result.sections.proposal = findSection(text, '## PROPOSAL', '## ANALYSIS');
        result.sections.analysis = findSection(text, '## ANALYSIS', '## ALTERNATIVE ANGLES');
        result.sections.alternatives = findSection(text, '## ALTERNATIVE ANGLES', '## SUBMISSION CHECKLIST');
        result.sections.checklist = findSection(text, '## SUBMISSION CHECKLIST');
    }

    return result;

  } catch (error) {
    console.error("Error generating proposal:", error);
    throw error;
  }
};
