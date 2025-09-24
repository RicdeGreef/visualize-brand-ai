import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrandProvider, useBrand } from "./context/BrandContext";
import Header from "./components/Header";
import InputScreen from "./components/InputScreen";
import LoadingScreen from "./components/LoadingScreen";
import BrandGuide from "./components/BrandGuide";
import EditModal from "./components/EditModal";

const queryClient = new QueryClient();

const BrandMeApp = () => {
  const { state } = useBrand();

  const renderCurrentScreen = () => {
    switch (state.currentStep) {
      case 'input':
        return <InputScreen />;
      case 'loading':
        return <LoadingScreen />;
      case 'results':
      case 'editing':
        return (
          <>
            <BrandGuide />
            <EditModal />
          </>
        );
      default:
        return <InputScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {renderCurrentScreen()}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrandProvider>
        <Toaster />
        <Sonner />
        <BrandMeApp />
      </BrandProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
