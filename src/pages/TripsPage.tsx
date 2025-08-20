import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { fetchTrips } from "../features/trips/tripsThunks";
import { TripForm } from "./TripForm";
import { TripsList } from "../components/TripsPage/TripsList/TripsList";
import type { ITrip } from "../features/trips/types";
import { db } from "../api/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export const TripsPage = () => {
  const dispatch = useAppDispatch();
  const { trips, loading, error } = useAppSelector(state => state.trips);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchTrips({ userId: user.uid }));
    }
  }, [user, dispatch]);

  if (!user) return <p>Please login to view your trips</p>;

  const handleEdit = async (trip: ITrip) => {
    const newTitle = prompt("Enter new title", trip.title);
    if (!newTitle) return;

    try {
      const tripRef = doc(db, "trips", trip.id);
      await updateDoc(tripRef, { title: newTitle });
      // Після зміни знову завантажуємо trips
      dispatch(fetchTrips({ userId: user.uid }));
    } catch (err) {
      console.error("Failed to update trip:", err);
    }
  };

  const handleDelete = async (tripId: string) => {
    const confirmed = confirm("Are you sure you want to delete this trip?");
    if (!confirmed) return;

    try {
      const tripRef = doc(db, "trips", tripId);
      await deleteDoc(tripRef);
      dispatch(fetchTrips({ userId: user.uid }));
    } catch (err) {
      console.error("Failed to delete trip:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Trips</h1>

      <TripForm />

      {loading && <p>Loading trips...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <TripsList
        trips={trips}
        user={user}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
