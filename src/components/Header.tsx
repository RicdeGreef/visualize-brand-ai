import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-6 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-foreground">brand.me</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Hoe het werkt
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Voorbeelden
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Prijzen
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;