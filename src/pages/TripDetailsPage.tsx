// src/pages/TripDetailsPage.tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { fetchTrips } from "../features/trips/tripsThunks";


interface IPlace {
  id: string;
  locationName: string;
  notes?: string;
  dayNumber: number;
}

export const TripDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { trips } = useAppSelector(state => state.trips);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
  if (user && id) {
    dispatch(fetchTrips({ userId: user.uid }));
  }
}, [user, id, dispatch]);


  const trip = trips.find(t => t.id === id);
  if (!trip) return <p>Trip not found</p>;

  const isOwner = trip.ownerId === user?.uid;
  const isCollaborator = trip.collaborators?.includes(user!.uid);
  const canEdit = isOwner || isCollaborator;

  const [places, setPlaces] = useState<IPlace[]>([]);
  const [locationName, setLocationName] = useState("");
  const [notes, setNotes] = useState("");
  const [dayNumber, setDayNumber] = useState(1);

  // Замість бекенду тут простий локальний state
  const handleAddPlace = () => {
    if (!locationName || dayNumber < 1) return alert("Location and dayNumber >= 1 required");
    setPlaces([...places, { id: crypto.randomUUID(), locationName, notes, dayNumber }].sort((a, b) => a.dayNumber - b.dayNumber));
    setLocationName(""); setNotes(""); setDayNumber(1);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{trip.title}</h1>
      <p>{trip.description}</p>

      <h2 className="text-xl mt-6 mb-2">Places</h2>
      {canEdit && (
        <div className="mb-4 border p-2 rounded">
          <input placeholder="Location" value={locationName} onChange={e => setLocationName(e.target.value)} className="border p-1 mr-2" />
          <input placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} className="border p-1 mr-2" />
          <input type="number" min={1} value={dayNumber} onChange={e => setDayNumber(Number(e.target.value))} className="border p-1 mr-2 w-20" />
          <button onClick={handleAddPlace} className="bg-green-600 text-white p-1 rounded">Add Place</button>
        </div>
      )}

      <ul>
        {places.map(p => (
          <li key={p.id} className="border p-2 mb-1 rounded">
            <p>{p.dayNumber}. {p.locationName} {p.notes && `(${p.notes})`}</p>
          </li>
        ))}
      </ul>

      {isOwner && <Link to={`/trips/${id}/access`} className="text-blue-500 underline mt-4 block">Manage Access</Link>}
    </div>
  );
};
