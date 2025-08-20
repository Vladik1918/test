// src/pages/TripsPage.tsx
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { fetchTrips } from "../features/trips/tripsThunks";
import { TripForm } from "./TripForm";
import { TripsList } from "../components/TripsPage/TripsList/TripsList";

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Trips</h1>

      <TripForm />

      {loading && <p>Loading trips...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <TripsList trips={trips} user={user} />
    </div>
  );
};
