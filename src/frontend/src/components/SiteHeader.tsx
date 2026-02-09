import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { generatedAssetUrl } from '../utils/assetUrl';

interface SiteHeaderProps {
  onNavigateToAdmin: () => void;
  scrollToSection: (id: string) => void;
}

export default function SiteHeader({ onNavigateToAdmin, scrollToSection }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Services', id: 'services' },
    { label: 'Book Now', id: 'booking' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <img 
              src={generatedAssetUrl('ravinder-travels-logo-rt-red.dim_512x512.png')}
              alt="Ravinder Travels Logo" 
              className="h-10 w-10 md:h-12 md:w-12 object-contain"
            />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground">Ravinder Travels</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Your Journey, Our Priority</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onNavigateToAdmin}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigateToAdmin();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
              >
                Admin
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
