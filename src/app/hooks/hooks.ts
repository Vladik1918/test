import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import type { ITrip } from "../../features/trips/types";
import type { IUser } from "../../features/auth/types";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useTripPermissions = (trip: ITrip ,user: IUser | null) => {
  const isOwner = trip.ownerId === user?.uid;
  const isCollaborator = trip.collaborators?.includes(user!.uid);
  const canEdit = isOwner || isCollaborator;
  return { isOwner, isCollaborator, canEdit };
};
