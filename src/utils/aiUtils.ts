import { BrandContent, VisualContent } from '../context/BrandContext';

// Functie om tekstuele content te genereren
export const generateTextContent = async (userInput: string): Promise<BrandContent> => {
  console.log("Tekst generatie gestart voor:", userInput);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        coreValues: ["Innovatie", "Gemeenschap", "Creativiteit"],
        brandStory: "Ons merk is geboren uit het idee om creatieve geesten samen te brengen en de wereld te inspireren met vernieuwende oplossingen.",
        missionVision: "Onze missie is om ontdekkingen voor iedereen toegankelijk te maken. Onze visie is een wereld waarin elk idee een kans krijgt.",
        toneOfVoice: "Inspirerend, toegankelijk en een tikje rebels. We spreken je aan als een creatieve partner."
      });
    }, 2000); // Simuleer 2 seconden laadtijd
  });
};

// Functie om visuele content te genereren
export const generateVisualContent = async (userInput: string): Promise<VisualContent> => {
  console.log("Visuele generatie gestart voor:", userInput);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        logoUrl: "https://placehold.co/300x200/A8A6FF/000000?text=brand.me",
        colorPalette: ["#000000", "#FFFFFF", "#A8A6FF", "#F5F5F5", "#C0C0C0"],
        typography: {
          headingFont: "Inter",
          bodyFont: "Inter"
        },
        moodboardUrls: [
          "https://placehold.co/400x400/EAEAEA/333333?text=Sfeerbeeld+1",
          "https://placehold.co/400x400/D4D4D4/333333?text=Sfeerbeeld+2",
          "https://placehold.co/400x400/C0C0C0/333333?text=Sfeerbeeld+3",
          "https://placehold.co/400x400/ACACAC/333333?text=Sfeerbeeld+4",
        ]
      });
    }, 3000); // Simuleer 3 seconden laadtijd
  });
};

// Functie om nieuwe elementen te genereren bij bewerking
export const generateEditOptions = async (element: string, currentContent: any): Promise<any[]> => {
  console.log("Bewerking generatie gestart voor:", element);
  
  return new Promise(resolve => {
    setTimeout(() => {
      switch(element) {
        case 'logo':
          resolve([
            "https://placehold.co/300x200/A8A6FF/FFFFFF?text=Option+1",
            "https://placehold.co/300x200/000000/A8A6FF?text=Option+2",
            "https://placehold.co/300x200/F5F5F5/000000?text=Option+3"
          ]);
          break;
        case 'colors':
          resolve([
            ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"],
            ["#6C5CE7", "#A29BFE", "#FD79A8", "#FDCB6E", "#E17055"],
            ["#2D3436", "#636E72", "#B2BEC3", "#DDD", "#FFF"]
          ]);
          break;
        case 'typography':
          resolve([
            { headingFont: "Poppins", bodyFont: "Open Sans" },
            { headingFont: "Montserrat", bodyFont: "Lato" },
            { headingFont: "Playfair Display", bodyFont: "Source Sans Pro" }
          ]);
          break;
        default:
          resolve([]);
      }
    }, 1500);
  });
};