import React, { useState, useEffect } from 'react';
import { Sparkles, Palette, Type, Heart } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      icon: Sparkles,
      title: "Analyseren van input...",
      description: "We begrijpen je visie en kernwaarden"
    },
    {
      icon: Heart,
      title: "Ontwikkelen van merkverhaal...",
      description: "Je unieke brand story komt tot leven"
    },
    {
      icon: Palette,
      title: "Creëren van visuele identiteit...",
      description: "Kleuren, logo en stijl worden gegenereerd"
    },
    {
      icon: Type,
      title: "Finaliseren van brand guide...",
      description: "Alles wordt samengebracht in een complete gids"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl mx-auto text-center animate-fade-in">
        
        {/* Main Loading Animation */}
        <div className="relative mb-12">
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            
            {/* Inner pulsing circle */}
            <div className="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full animate-pulse flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Current Step */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center justify-center mb-4">
            {React.createElement(steps[currentStep].icon, {
              className: "w-8 h-8 text-primary mr-3"
            })}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            {steps[currentStep].title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {steps[currentStep].description}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center space-x-4 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isPassed = index < currentStep;
            
            return (
              <div
                key={index}
                className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500
                  ${isActive 
                    ? 'border-primary bg-primary text-white scale-110' 
                    : isPassed 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border text-muted-foreground'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Fun Facts */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Wist je dat?</span> Een consistente merkidentiteit verhoogt de omzet met gemiddeld 23%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;