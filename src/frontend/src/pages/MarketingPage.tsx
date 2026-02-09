import SiteHeader from '../components/SiteHeader';
import ServicesSection from '../components/ServicesSection';
import BookingForm from '../components/BookingForm';
import ContactSection from '../components/ContactSection';
import SiteFooter from '../components/SiteFooter';
import { generatedAssetUrl } from '../utils/assetUrl';

interface MarketingPageProps {
  onNavigateToAdmin: () => void;
}

export default function MarketingPage({ onNavigateToAdmin }: MarketingPageProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader onNavigateToAdmin={onNavigateToAdmin} scrollToSection={scrollToSection} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img 
              src={generatedAssetUrl('ravinder-travels-hero.dim_1600x600.png')}
              alt="Ravinder Travels" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Your Trusted Travel Partner in Delhi
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Experience reliable taxi services, comfortable car rentals, and seamless travel solutions across New Delhi and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('booking')}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-warm"
                >
                  Book a Ride
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="px-8 py-4 bg-card text-card-foreground border-2 border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  Our Services
                </button>
              </div>
            </div>
          </div>
        </section>

        <ServicesSection />
        
        <section id="booking" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Ride</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you with a quote shortly.
              </p>
            </div>
            <BookingForm />
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
