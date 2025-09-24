import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for our brand data
export interface BrandContent {
  coreValues: string[];
  brandStory: string;
  missionVision: string;
  toneOfVoice: string;
}

export interface VisualContent {
  logoUrl: string;
  colorPalette: string[];
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  moodboardUrls: string[];
}

export interface BrandState {
  userInput: string;
  audioFile?: File;
  uploadedFile?: File;
  currentStep: 'input' | 'loading' | 'results' | 'editing';
  brandContent?: BrandContent;
  visualContent?: VisualContent;
  isLoading: boolean;
  editingElement?: string;
}

interface BrandContextType {
  state: BrandState;
  setUserInput: (input: string) => void;
  setAudioFile: (file?: File) => void;
  setUploadedFile: (file?: File) => void;
  setCurrentStep: (step: BrandState['currentStep']) => void;
  setBrandContent: (content: BrandContent) => void;
  setVisualContent: (content: VisualContent) => void;
  setIsLoading: (loading: boolean) => void;
  setEditingElement: (element?: string) => void;
  resetState: () => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

const initialState: BrandState = {
  userInput: '',
  currentStep: 'input',
  isLoading: false,
};

export const BrandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BrandState>(initialState);

  const setUserInput = (input: string) => 
    setState(prev => ({ ...prev, userInput: input }));
  
  const setAudioFile = (file?: File) => 
    setState(prev => ({ ...prev, audioFile: file }));
  
  const setUploadedFile = (file?: File) => 
    setState(prev => ({ ...prev, uploadedFile: file }));
  
  const setCurrentStep = (step: BrandState['currentStep']) => 
    setState(prev => ({ ...prev, currentStep: step }));
  
  const setBrandContent = (content: BrandContent) => 
    setState(prev => ({ ...prev, brandContent: content }));
  
  const setVisualContent = (content: VisualContent) => 
    setState(prev => ({ ...prev, visualContent: content }));
  
  const setIsLoading = (loading: boolean) => 
    setState(prev => ({ ...prev, isLoading: loading }));
  
  const setEditingElement = (element?: string) => 
    setState(prev => ({ ...prev, editingElement: element }));
  
  const resetState = () => setState(initialState);

  return (
    <BrandContext.Provider value={{
      state,
      setUserInput,
      setAudioFile,
      setUploadedFile,
      setCurrentStep,
      setBrandContent,
      setVisualContent,
      setIsLoading,
      setEditingElement,
      resetState,
    }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};