// src/pages/TripsPage.tsx
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { fetchTrips } from "../features/trips/tripsThunks";
import { TripForm } from "./TripForm";
import { Link } from "react-router-dom";

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

      {trips.length === 0 && !loading && <p>No trips found</p>}

      <ul>
        {trips.map(trip => {
          const isOwner = trip.ownerId === user.uid;
          const isCollaborator = trip.collaborators?.includes(user.uid);
          if (!isOwner && !isCollaborator) return null; // лише свої поїздки

          return (
            <li key={trip.id} className="border p-2 mb-2 rounded">
              <Link to={`/trips/${trip.id}`} className="text-blue-500 underline">
                {trip.title}
              </Link>
              <p>{trip.description}</p>
              <p>
                {trip.startDate && `From: ${trip.startDate} `}
                {trip.endDate && `To: ${trip.endDate}`}
              </p>
              <p>
                Role: {isOwner ? "Owner" : "Collaborator"}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
