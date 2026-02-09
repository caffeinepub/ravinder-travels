import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useGetCallerUserRole } from './useQueries';
import type { BookingRequest } from '../backend';

export function useAdminBookingRequests() {
  const { actor, isFetching: actorFetching } = useActor();
  const { data: userRole, isLoading: roleLoading } = useGetCallerUserRole();

  const isAdmin = userRole === 'admin';

  return useQuery<BookingRequest[]>({
    queryKey: ['adminBookingRequests'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllBookingRequests();
    },
    enabled: !!actor && !actorFetching && !roleLoading && isAdmin,
    retry: false,
  });
}

