import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BookingRequest } from '../backend';

export function useSubmitBookingRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: BookingRequest) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitBookingRequest(request);
    },
    onSuccess: () => {
      // Invalidate admin requests query so it refetches
      queryClient.invalidateQueries({ queryKey: ['adminBookingRequests'] });
    },
  });
}

