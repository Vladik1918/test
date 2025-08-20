import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
  useTripPermissions,
} from "../app/hooks/hooks";
import { fetchTrips } from "../features/trips/tripsThunks";
import {
  addPlace,
  updatePlace,
  deletePlace,
  fetchPlaces,
} from "../features/places/placesThunks";
import { TripHeader } from "../components/TripDetails/TripHeader/TripHeder";
import { AddPlaceForm } from "../components/TripDetails/AddPlaceForm/AddPlaceForm";
import { PlacesList } from "../components/TripDetails/PlacesList/PlaceList";

export const TripDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { trips } = useAppSelector((state) => state.trips);
  const { places, loading: placesLoading } = useAppSelector(
    (state) => state.places
  );
  const { user } = useAppSelector((state) => state.auth);

  // Fetch trips for the user
  useEffect(() => {
    if (user && id) {
      dispatch(fetchTrips({ userId: user.uid }));
    }
  }, [user, id, dispatch]);

  // Find current trip
  const trip = trips.find((t) => t.id === id);
  if (!trip) return <p>Trip not found</p>;

  const { isOwner, canEdit } = useTripPermissions(trip, user);

  // Fetch places for this trip
  useEffect(() => {
    if (trip) dispatch(fetchPlaces({ tripId: trip.id }));
  }, [trip, dispatch]);

  // Local state for new place form
  const [locationName, setLocationName] = useState("");
  const [notes, setNotes] = useState("");
  const [dayNumber, setDayNumber] = useState(1);

  // Add place
  const handleAddPlace = () => {
    if (!locationName || dayNumber < 1) {
      return alert("Location and dayNumber >= 1 required");
    }

    dispatch(addPlace({ tripId: trip.id, locationName, notes, dayNumber }));
    setLocationName("");
    setNotes("");
    setDayNumber(1);
  };

  const handleUpdatePlace = (
    id: string,
    updatedData: Partial<{
      locationName: string;
      notes?: string;
      dayNumber: number;
    }>
  ) => {
    dispatch(updatePlace({ id, ...updatedData }));
  };

  const handleDeletePlace = (id: string) => {
    dispatch(deletePlace({ id }));
  };

  return (
    <div className="p-4">
      <TripHeader title={trip.title} description={trip.description} />

      <h2 className="text-xl mt-6 mb-2">Places</h2>
      {canEdit && (
        <AddPlaceForm
          locationName={locationName}
          notes={notes}
          dayNumber={dayNumber}
          setLocationName={setLocationName}
          setNotes={setNotes}
          setDayNumber={setDayNumber}
          handleAddPlace={handleAddPlace}
        />
      )}

      {placesLoading ? (
        <p>Loading places...</p>
      ) : (
        <PlacesList
          places={places}
          onUpdatePlace={handleUpdatePlace}
          onDeletePlace={handleDeletePlace}
          canEdit={canEdit}
        />
      )}

      {isOwner && (
        <Link
          to={`/trips/${id}/access`}
          className="text-blue-500 underline mt-4 block"
        >
          Manage Access
        </Link>
      )}
    </div>
  );
};
