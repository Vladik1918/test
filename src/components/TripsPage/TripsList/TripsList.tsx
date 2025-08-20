import { Link } from "react-router-dom";
import type { ITrip } from "../../../features/trips/types";
import type { IUser } from "../../../features/auth/types";

interface TripsListProps {
  trips: ITrip[];
  user: IUser;
  onEdit: (trip: ITrip) => void;
  onDelete: (tripId: string) => void;
}

export const TripsList = ({
  trips,
  user,
  onEdit,
  onDelete,
}: TripsListProps) => {
  if (trips.length === 0) return <p>No trips found</p>;

  return (
    <ul>
      {trips.map((trip) => {
        const isOwner = trip.ownerId === user.uid;
        const isCollaborator =
          Array.isArray(trip.collaborators) &&
          trip.collaborators.includes(user.uid);
        if (!isOwner && !isCollaborator) return null;

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
            <p>Role: {isOwner ? "Owner" : "Collaborator"}</p>

            {isOwner && (
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => onEdit(trip)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(trip.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
