// src/pages/TripDetailsPage.tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { fetchTrips } from "../features/trips/tripsThunks";
import { TripHeader } from "../components/TripDetails/TripHeader/TripHeder";
import { AddPlaceForm } from "../components/TripDetails/AddPlaceForm/AddPlaceForm";
import { PlacesList } from "../components/TripDetails/PlacesList/PlaceList";

export interface IPlace {
  id: string;
  locationName: string;
  notes?: string;
  dayNumber: number;
}

export const TripDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { trips } = useAppSelector((state) => state.trips);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user && id) {
      dispatch(fetchTrips({ userId: user.uid }));
    }
  }, [user, id, dispatch]);

  const trip = trips.find((t) => t.id === id);
  if (!trip) return <p>Trip not found</p>;

  const isOwner = trip.ownerId === user?.uid;
  const isCollaborator = trip.collaborators?.includes(user!.uid);
  const canEdit = isOwner || isCollaborator;

  const [places, setPlaces] = useState<IPlace[]>([]);
  const [locationName, setLocationName] = useState("");
  const [notes, setNotes] = useState("");
  const [dayNumber, setDayNumber] = useState(1);

  const handleAddPlace = () => {
    if (!locationName || dayNumber < 1) {
      return alert("Location and dayNumber >= 1 required");
    }

    const newPlace: IPlace = {
      id: crypto.randomUUID(),
      locationName,
      notes,
      dayNumber,
    };

    setPlaces([...places, newPlace].sort((a, b) => a.dayNumber - b.dayNumber));
    setLocationName("");
    setNotes("");
    setDayNumber(1);
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

      <PlacesList places={places} />

      {isOwner && (
        <Link to={`/trips/${id}/access`} className="text-blue-500 underline mt-4 block">
          Manage Access
        </Link>
      )}
    </div>
  );
};
