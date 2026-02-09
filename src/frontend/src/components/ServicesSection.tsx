import { Car, Plane, MapPin, Users } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Car,
      title: 'Taxi Service',
      description: 'Reliable and comfortable taxi rides across Delhi NCR. Available 24/7 for your convenience.',
    },
    {
      icon: Plane,
      title: 'Travel Packages',
      description: 'Customized travel packages for local and outstation trips. Experience hassle-free journeys.',
    },
    {
      icon: Users,
      title: 'Car Rental',
      description: 'Rent a car with or without a driver. Wide range of vehicles to suit your needs.',
    },
    {
      icon: MapPin,
      title: 'Pickup & Drop',
      description: 'Airport transfers, railway station pickups, and point-to-point drop services.',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive travel solutions tailored to your needs. From daily commutes to special occasions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

