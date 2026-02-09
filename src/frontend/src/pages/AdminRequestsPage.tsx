import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserRole } from '../hooks/useQueries';
import { useAdminBookingRequests } from '../hooks/useAdminBookingRequests';
import LoginButton from '../components/LoginButton';
import { ArrowLeft, Calendar, MapPin, Phone, User, FileText } from 'lucide-react';

interface AdminRequestsPageProps {
  onBackToHome: () => void;
}

export default function AdminRequestsPage({ onBackToHome }: AdminRequestsPageProps) {
  const { identity } = useInternetIdentity();
  const { data: userRole, isLoading: roleLoading } = useGetCallerUserRole();
  const { data: requests, isLoading: requestsLoading, error } = useAdminBookingRequests();

  const isAuthenticated = !!identity;
  const isAdmin = userRole === 'admin';

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full bg-card rounded-lg shadow-warm p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
          <p className="text-muted-foreground mb-6">
            Please log in to view booking requests.
          </p>
          <LoginButton />
          <button
            onClick={onBackToHome}
            className="mt-4 text-primary hover:underline flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full bg-card rounded-lg shadow-warm p-8 text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to view this page. Admin access is required.
          </p>
          <button
            onClick={onBackToHome}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Booking Requests</h1>
          </div>
          <LoginButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 mb-6">
            <p className="font-semibold">Error loading requests</p>
            <p className="text-sm mt-1">{error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
        )}

        {requestsLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading booking requests...</p>
          </div>
        ) : requests && requests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((request, index) => (
              <div key={index} className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-warm transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {request.serviceType}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium">{request.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span>{request.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span>{request.dateTime}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-start gap-2 text-sm mb-2">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-xs text-muted-foreground">Pickup</p>
                        <p>{request.pickupLocation}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-xs text-muted-foreground">Drop</p>
                        <p>{request.dropLocation}</p>
                      </div>
                    </div>
                  </div>
                  
                  {request.notes && (
                    <div className="flex items-start gap-2 text-sm pt-2 border-t border-border">
                      <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-xs text-muted-foreground mb-1">Notes</p>
                        <p className="text-muted-foreground">{request.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">No booking requests yet</p>
            <p className="text-muted-foreground">Requests will appear here once customers submit the booking form.</p>
          </div>
        )}
      </main>
    </div>
  );
}

