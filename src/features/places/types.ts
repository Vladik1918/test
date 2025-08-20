export interface IPlace {
  id: string;
  tripId: string;
  locationName: string;
  notes?: string;
  dayNumber: number;
}

export interface PlacesState {
  places: IPlace[];
  loading: boolean;
  error: string | null;
}
