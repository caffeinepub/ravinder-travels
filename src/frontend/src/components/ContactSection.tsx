import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { BUSINESS_CONTACT_EMAIL, BUSINESS_CONTACT_PHONE, BUSINESS_CONTACT_PHONE_RAW } from '@/constants/contact';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground">
            We're here to help. Reach out to us for any queries or bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-warm transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              RK Puram Sector 4<br />
              New Delhi 110022
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-warm transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <a 
              href={`tel:${BUSINESS_CONTACT_PHONE_RAW}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {BUSINESS_CONTACT_PHONE}
            </a>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-warm transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <a 
              href={`mailto:${BUSINESS_CONTACT_EMAIL}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {BUSINESS_CONTACT_EMAIL}
            </a>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-warm transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Hours</h3>
            <p className="text-sm text-muted-foreground">
              24/7 Available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
