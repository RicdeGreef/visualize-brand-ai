import React, { useState } from 'react';
import { useBrand } from '../context/BrandContext';
import { generateTextContent, generateVisualContent } from '../utils/aiUtils';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mic, Upload, Sparkles } from 'lucide-react';

const InputScreen: React.FC = () => {
  const { state, setUserInput, setAudioFile, setUploadedFile, setCurrentStep, setBrandContent, setVisualContent, setIsLoading } = useBrand();
  const [isRecording, setIsRecording] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      console.log("Spraakopname gestart");
    } else {
      console.log("Spraakopname gestopt");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      console.log("Bestand geüpload:", file.name);
    }
  };

  const handleGenerate = async () => {
    if (!state.userInput.trim() && !state.uploadedFile && !state.audioFile) {
      return;
    }

    setIsLoading(true);
    setCurrentStep('loading');

    try {
      // Generate both text and visual content
      const [textContent, visualContent] = await Promise.all([
        generateTextContent(state.userInput),
        generateVisualContent(state.userInput)
      ]);

      setBrandContent(textContent);
      setVisualContent(visualContent);
      setCurrentStep('results');
    } catch (error) {
      console.error("Fout bij het genereren van content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isInputValid = state.userInput.trim() || state.uploadedFile || state.audioFile;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto animate-fade-in">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Omschrijf je bedrijf
            <span className="text-gradient block mt-2">of idee</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Laat onze AI een complete merkidentiteit voor je creëren. 
            Beschrijf gewoon je visie en wij doen de rest.
          </p>
        </div>

        {/* Input Card */}
        <Card className="card-elegant max-w-3xl mx-auto">
          <div className="space-y-8">
            
            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Beschrijf je bedrijf, product of idee
              </label>
              <Textarea
                value={state.userInput}
                onChange={handleTextChange}
                placeholder="Bijvoorbeeld: Een duurzame koffieabonnement service die direct werkt met boeren in Ethiopia en Colombia. We willen transparantie en kwaliteit combineren met een premiumervaring..."
                className="min-h-[120px] text-base resize-none border-border focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Input Options */}
            <div className="flex flex-col sm:flex-row gap-4">
              
              {/* Voice Record */}
              <Button
                variant="outline"
                size="lg"
                onClick={handleVoiceRecord}
                className={`flex-1 h-14 ${isRecording ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
              >
                <Mic className={`w-5 h-5 mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
                {isRecording ? 'Stop opname' : 'Spraakopname'}
              </Button>

              {/* File Upload */}
              <div className="flex-1">
                <label htmlFor="file-upload" className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-14"
                    asChild
                  >
                    <span className="cursor-pointer">
                      <Upload className="w-5 h-5 mr-2" />
                      Bestand uploaden
                    </span>
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                />
              </div>
            </div>

            {/* File Status */}
            {state.uploadedFile && (
              <div className="text-sm text-muted-foreground bg-secondary rounded-lg p-3">
                <strong>Bestand:</strong> {state.uploadedFile.name}
              </div>
            )}

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!isInputValid || state.isLoading}
              size="lg"
              className="w-full h-14 btn-brand text-lg font-semibold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Genereer mijn merkidentiteit
            </Button>
          </div>
        </Card>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">AI-Gestuurd</h3>
            <p className="text-muted-foreground text-sm">
              Geavanceerde AI analyseert je input en creëert een unieke merkidentiteit
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Veelzijdige Input</h3>
            <p className="text-muted-foreground text-sm">
              Tekst, spraak of bestanden - gebruik wat voor jou het beste werkt
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Compleet Pakket</h3>
            <p className="text-muted-foreground text-sm">
              Logo, kleuren, typografie en brand story in één complete gids
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputScreen;