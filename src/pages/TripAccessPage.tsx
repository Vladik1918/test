// src/pages/TripAccessPage.tsx
import { useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks/hooks";
import { InvitesList } from "../components/TripAccess/InviteLinks/InviteLinks";
import { InviteForm } from "../components/TripAccess/InviteForm/InviteForm";
import { PageMessage } from "../components/TripAccess/Message/Message";

export interface IInvite {
  email: string;
  token: string;
}

export const TripAccessPage = () => {
  const { id } = useParams<{ id: string }>();
  const { trips } = useAppSelector((state) => state.trips);
  const { user } = useAppSelector((state) => state.auth);

  const trip = trips.find((t) => t.id === id);

  if (!trip) return <PageMessage message="Trip not found" />;

  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState<IInvite[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const validateInvite = (email: string): string | null => {
    switch (true) {
      case trip.ownerId !== user?.uid:
        return "Only owner can manage access";
      case !email:
        return "Email is required";
      case email === user?.email:
        return "You cannot invite yourself";
      case invites.some((i) => i.email === email):
        return "Invite already sent";
      default:
        return null;
    }
  };

  const handleSendInvite = () => {
    const error = validateInvite(email);
    if (error) {
      alert(error);
      return;
    }
    setInvites((prev) => [...prev, { email, token: crypto.randomUUID() }]);
    setEmail("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Manage Access for {trip.title}
      </h1>

      <InviteForm
        email={email}
        onEmailChange={handleChange}
        onSend={handleSendInvite}
      />

      <InvitesList invites={invites} />
    </div>
  );
};
