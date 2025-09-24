import React from 'react';
import { useBrand } from '../context/BrandContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Edit3, Palette, Type, Target } from 'lucide-react';

const BrandGuide: React.FC = () => {
  const { state, setEditingElement, setCurrentStep } = useBrand();

  if (!state.brandContent || !state.visualContent) {
    return null;
  }

  const handleExport = () => {
    console.log("Brand guide geëxporteerd");
  };

  const handleEdit = () => {
    setEditingElement('general');
    setCurrentStep('editing');
  };

  const { brandContent, visualContent } = state;

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto animate-fade-in">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Jouw Brand Guide
          </h1>
          <p className="text-xl text-muted-foreground">
            Een complete merkidentiteit, speciaal voor jou gegenereerd
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Button onClick={handleExport} size="lg" className="btn-brand">
            <Download className="w-5 h-5 mr-2" />
            Exporteer Brand Guide
          </Button>
          <Button onClick={handleEdit} variant="outline" size="lg">
            <Edit3 className="w-5 h-5 mr-2" />
            Iets aanpassen?
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Brand Story */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Brand Story Section */}
            <Card className="card-elegant">
              <div className="flex items-center mb-6">
                <Target className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Merkverhaal</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Kernwaarden</h3>
                  <div className="flex flex-wrap gap-2">
                    {brandContent.coreValues.map((value, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Brand Story</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {brandContent.brandStory}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Missie & Visie</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {brandContent.missionVision}
                  </p>
                </div>
              </div>
            </Card>

            {/* Tone of Voice */}
            <Card className="card-elegant">
              <h2 className="text-2xl font-bold mb-4">Tone of Voice</h2>
              <p className="text-muted-foreground leading-relaxed">
                {brandContent.toneOfVoice}
              </p>
            </Card>

            {/* Moodboard */}
            <Card className="card-elegant">
              <h2 className="text-2xl font-bold mb-6">Moodboard</h2>
              <div className="grid grid-cols-2 gap-4">
                {visualContent.moodboardUrls.map((url, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={url} 
                      alt={`Sfeerbeeld ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Visual Identity */}
          <div className="space-y-8">
            
            {/* Logo */}
            <Card className="card-elegant text-center">
              <div className="flex items-center justify-center mb-6">
                <Palette className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Logo</h2>
              </div>
              <div className="bg-secondary rounded-lg p-8 mb-4">
                <img 
                  src={visualContent.logoUrl} 
                  alt="Generated Logo"
                  className="max-w-full h-auto mx-auto"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setEditingElement('logo')}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Bewerk logo
              </Button>
            </Card>

            {/* Color Palette */}
            <Card className="card-elegant">
              <h2 className="text-2xl font-bold mb-6">Kleurenpalet</h2>
              <div className="space-y-3">
                {visualContent.colorPalette.map((color, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-lg border border-border"
                      style={{ backgroundColor: color }}
                    />
                    <div>
                      <p className="font-mono text-sm">{color}</p>
                      <p className="text-xs text-muted-foreground">
                        {index === 0 ? 'Primair' : index === 1 ? 'Secundair' : `Accent ${index - 1}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => setEditingElement('colors')}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Bewerk kleuren
              </Button>
            </Card>

            {/* Typography */}
            <Card className="card-elegant">
              <div className="flex items-center mb-6">
                <Type className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Typografie</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Heading Font</p>
                  <p className="text-2xl font-bold" style={{ fontFamily: visualContent.typography.headingFont }}>
                    {visualContent.typography.headingFont}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Body Font</p>
                  <p className="text-base" style={{ fontFamily: visualContent.typography.bodyFont }}>
                    {visualContent.typography.bodyFont}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => setEditingElement('typography')}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Bewerk typografie
              </Button>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="text-center mt-16">
          <Button 
            onClick={() => setCurrentStep('input')} 
            variant="outline"
            size="lg"
          >
            Nieuwe brand guide maken
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrandGuide;