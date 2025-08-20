// src/features/trips/types.ts
export interface ITrip {
  id: string;
  title: string;
  description?: string;
  ownerId: string;          
  collaborators: string[];    
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export interface TripsState {
  trips: ITrip[];
  loading: boolean;
  error: string | null;
}
