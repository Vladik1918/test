import type { IInvite } from "../features/inviteTrips/types";
import type { IUser } from "../features/auth/types";
import type { ITrip } from "../features/trips/types";

export const validateInvite = (
  email: string,
  trip: ITrip,
  user: IUser | null,
  invites: IInvite[]
): string | null => {
  switch (true) {
    case trip.ownerId !== user?.uid:
      return "Only owner can manage access";
    case !email:
      return "Email is required";
    case email === user?.email:
      return "You cannot invite yourself";
    case invites.some((i) => i.email === email && !i.accepted):
      return "Invite already sent";
    default:
      return null;
  }
};
