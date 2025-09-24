import React, { useState, useEffect } from 'react';
import { useBrand } from '../context/BrandContext';
import { generateEditOptions } from '../utils/aiUtils';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Palette, Type, Image, Sparkles } from 'lucide-react';

const EditModal: React.FC = () => {
  const { state, setEditingElement, setVisualContent, setCurrentStep } = useBrand();
  const [editOptions, setEditOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (state.editingElement) {
      loadEditOptions();
    }
  }, [state.editingElement]);

  const loadEditOptions = async () => {
    if (!state.editingElement || !state.visualContent) return;
    
    setIsLoading(true);
    try {
      const options = await generateEditOptions(
        state.editingElement, 
        state.visualContent
      );
      setEditOptions(options);
    } catch (error) {
      console.error("Fout bij laden edit opties:", error);
    }
    setIsLoading(false);
  };

  const handleOptionSelect = (option: any) => {
    if (!state.visualContent) return;

    const updatedContent = { ...state.visualContent };
    
    switch(state.editingElement) {
      case 'logo':
        updatedContent.logoUrl = option;
        break;
      case 'colors':
        updatedContent.colorPalette = option;
        break;
      case 'typography':
        updatedContent.typography = option;
        break;
    }

    setVisualContent(updatedContent);
    handleClose();
  };

  const handleClose = () => {
    setEditingElement(undefined);
    setCurrentStep('results');
  };

  const getEditTitle = () => {
    switch(state.editingElement) {
      case 'logo': return 'Logo aanpassen';
      case 'colors': return 'Kleurenpalet aanpassen';
      case 'typography': return 'Typografie aanpassen';
      default: return 'Wat wil je aanpassen?';
    }
  };

  const getEditIcon = () => {
    switch(state.editingElement) {
      case 'logo': return Image;
      case 'colors': return Palette;
      case 'typography': return Type;
      default: return Sparkles;
    }
  };

  if (!state.editingElement) {
    return (
      <Dialog open={state.currentStep === 'editing'} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Wat wil je aanpassen?</DialogTitle>
            <DialogDescription>
              Kies een element om nieuwe varianten te genereren
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card 
              className="p-6 cursor-pointer hover:shadow-soft transition-all duration-200 border-2 hover:border-primary"
              onClick={() => setEditingElement('logo')}
            >
              <div className="text-center">
                <Image className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Logo</h3>
                <p className="text-sm text-muted-foreground">
                  Genereer nieuwe logo varianten
                </p>
              </div>
            </Card>

            <Card 
              className="p-6 cursor-pointer hover:shadow-soft transition-all duration-200 border-2 hover:border-primary"
              onClick={() => setEditingElement('colors')}
            >
              <div className="text-center">
                <Palette className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Kleur</h3>
                <p className="text-sm text-muted-foreground">
                  Ontdek nieuwe kleurenpaletten
                </p>
              </div>
            </Card>

            <Card 
              className="p-6 cursor-pointer hover:shadow-soft transition-all duration-200 border-2 hover:border-primary"
              onClick={() => setEditingElement('typography')}
            >
              <div className="text-center">
                <Type className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Lettertype</h3>
                <p className="text-sm text-muted-foreground">
                  Probeer verschillende lettertypen
                </p>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const EditIcon = getEditIcon();

  return (
    <Dialog open={state.currentStep === 'editing'} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center mb-2">
            <EditIcon className="w-6 h-6 text-primary mr-3" />
            <DialogTitle className="text-2xl font-bold">{getEditTitle()}</DialogTitle>
          </div>
          <DialogDescription>
            Kies een van de onderstaande opties of ga terug naar de vorige versie
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-primary animate-pulse mx-auto mb-4" />
              <p className="text-muted-foreground">Nieuwe opties genereren...</p>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            {state.editingElement === 'logo' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {editOptions.map((option, index) => (
                  <Card 
                    key={index}
                    className="p-4 cursor-pointer hover:shadow-soft transition-all duration-200 border-2 hover:border-primary"
                    onClick={() => handleOptionSelect(option)}
                  >
                    <div className="bg-secondary rounded-lg p-6 mb-4">
                      <img src={option} alt={`Logo optie ${index + 1}`} className="w-full h-auto" />
                    </div>
                    <p className="text-center text-sm font-medium">Optie {index + 1}</p>
                  </Card>
                ))}
              </div>
            )}

            {state.editingElement === 'colors' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {editOptions.map((palette, index) => (
                  <Card 
                    key={index}
                    className="p-4 cursor-pointer hover:shadow-soft transition-all duration-200 border-2 hover:border-primary"
                    onClick={() => handleOptionSelect(palette)}
                  >
                    <div className="space-y-2 mb-4">
                      {palette.map((color: string, colorIndex: number) => (
                        <div key={colorIndex} className="flex items-center space-x-2">
                          <div 
                            className="w-8 h-8 rounded border"
                            style={{ backgroundColor: color }}
                          />
                          <span className="font-mono text-xs">{color}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-sm font-medium">Palet {index + 1}</p>
                  </Card>
                ))}
              </div>
            )}

            {state.editingElement === 'typography' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {editOptions.map((typo, index) => (
                  <Card 
                    key={index}
                    className="p-6 cursor-pointer hover:shadow-soft transition-all duration-200 border-2 hover:border-primary"
                    onClick={() => handleOptionSelect(typo)}
                  >
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Heading</p>
                        <h3 className="text-xl font-bold" style={{ fontFamily: typo.headingFont }}>
                          {typo.headingFont}
                        </h3>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Body</p>
                        <p style={{ fontFamily: typo.bodyFont }}>
                          {typo.bodyFont}
                        </p>
                      </div>
                    </div>
                    <p className="text-center text-sm font-medium mt-4">Combinatie {index + 1}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={() => setEditingElement(undefined)}
          >
            Terug naar opties
          </Button>
          <Button 
            variant="outline" 
            onClick={handleClose}
          >
            Behoud huidige versie
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;