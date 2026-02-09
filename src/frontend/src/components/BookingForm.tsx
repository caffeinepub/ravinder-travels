import { useState } from 'react';
import { useSubmitBookingRequest } from '../hooks/useSubmitBookingRequest';
import { Calendar, Loader2 } from 'lucide-react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: '',
    pickupLocation: '',
    dropLocation: '',
    dateTime: '',
    notes: '',
  });

  const { mutate: submitBooking, isPending, isSuccess } = useSubmitBookingRequest();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitBooking(formData, {
      onSuccess: () => {
        // Reset form
        setFormData({
          name: '',
          phone: '',
          serviceType: '',
          pickupLocation: '',
          dropLocation: '',
          dateTime: '',
          notes: '',
        });
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-warm">
        {isSuccess && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 text-primary rounded-lg">
            <p className="font-semibold">Booking request submitted successfully!</p>
            <p className="text-sm mt-1">We'll contact you shortly with a quote.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="serviceType" className="block text-sm font-medium mb-2">
              Service Type <span className="text-destructive">*</span>
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            >
              <option value="">Select a service</option>
              <option value="Taxi">Taxi Service</option>
              <option value="Travel">Travel Package</option>
              <option value="Car Rental">Car Rental</option>
              <option value="Pickup-Drop">Pickup & Drop</option>
            </select>
          </div>

          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium mb-2">
              Pickup Location <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              placeholder="Enter pickup location"
            />
          </div>

          <div>
            <label htmlFor="dropLocation" className="block text-sm font-medium mb-2">
              Drop Location <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="dropLocation"
              name="dropLocation"
              value={formData.dropLocation}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              placeholder="Enter drop location"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="dateTime" className="block text-sm font-medium mb-2">
              Preferred Date & Time <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                id="dateTime"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium mb-2">
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
              placeholder="Any special requirements or additional information..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-6 px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Booking Request'
          )}
        </button>
      </form>
    </div>
  );
}

