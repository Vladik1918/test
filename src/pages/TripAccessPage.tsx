import { useState, type ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { InvitesList } from "../components/TripAccess/InviteLinks/InviteLinks";
import { InviteForm } from "../components/TripAccess/InviteForm/InviteForm";
import { PageMessage } from "../components/TripAccess/Message/Message";
import { sendInvite, fetchInvites } from "../features/inviteTrips/inviteThunks";

export const TripAccessPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { trips } = useAppSelector((state) => state.trips);
  const { user } = useAppSelector((state) => state.auth);
  const { invites } = useAppSelector((state) => state.invite);

  const trip = trips.find((t) => t.id === id);
  if (!trip) return <PageMessage message="Trip not found" />;

  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const validateInvite = (email: string): string | null => {
    if (trip.ownerId !== user?.uid) return "Only owner can manage access";
    if (!email) return "Email is required";
    if (email === user?.email) return "You cannot invite yourself";
    if (invites.some((i) => i.email === email && !i.accepted)) return "Invite already sent";
    return null;
  };

  const handleSendInvite = () => {
    const error = validateInvite(email);
    if (error) return alert(error);

    dispatch(sendInvite({ tripId: trip.id, email }));
    setEmail("");
  };

  useEffect(() => {
    if (trip) dispatch(fetchInvites({ tripId: trip.id }));
  }, [trip, dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Manage Access for {trip.title}
      </h1>

      <InviteForm email={email} onEmailChange={handleChange} onSend={handleSendInvite} />

      <InvitesList invites={invites} />
    </div>
  );
};
