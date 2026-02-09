import { Heart } from 'lucide-react';
import { BUSINESS_CONTACT_EMAIL, BUSINESS_CONTACT_PHONE, BUSINESS_CONTACT_PHONE_RAW } from '@/constants/contact';

export default function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-3">Ravinder Travels</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted travel partner in Delhi, providing reliable taxi services, car rentals, and travel solutions since years.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#booking" className="hover:text-primary transition-colors">Book Now</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Contact Info</h3>
            <address className="text-sm text-muted-foreground not-italic leading-relaxed">
              RK Puram Sector 4<br />
              New Delhi 110022<br />
              <br />
              Phone: <a href={`tel:${BUSINESS_CONTACT_PHONE_RAW}`} className="hover:text-primary transition-colors">{BUSINESS_CONTACT_PHONE}</a><br />
              Email: <a href={`mailto:${BUSINESS_CONTACT_EMAIL}`} className="hover:text-primary transition-colors">{BUSINESS_CONTACT_EMAIL}</a>
            </address>
          </div>
        </div>

        <div className="pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1 flex-wrap">
            © 2026. Built with <Heart className="w-4 h-4 text-primary fill-primary" /> using{' '}
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
