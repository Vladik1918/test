// src/pages/TripAccessPage.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks/hooks";

interface IInvite {
  email: string;
  token: string;
}

export const TripAccessPage = () => {
  const { id } = useParams<{ id: string }>();
  const { trips } = useAppSelector(state => state.trips);
  const { user } = useAppSelector(state => state.auth);

  const trip = trips.find(t => t.id === id);
  if (!trip) return <p>Trip not found</p>;

  const isOwner = trip.ownerId === user?.uid;
  if (!isOwner) return <p>Only owner can manage access</p>;

  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState<IInvite[]>([]);

  const handleSendInvite = () => {
    if (!email || email === user!.email) return alert("Invalid email");
    if (invites.find(i => i.email === email)) return alert("Invite already sent");
    setInvites([...invites, { email, token: crypto.randomUUID() }]);
    setEmail("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Access for {trip.title}</h1>

      <div className="mb-4">
        <input placeholder="Collaborator Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mr-2" />
        <button onClick={handleSendInvite} className="bg-blue-600 text-white p-2 rounded">Send Invite</button>
      </div>

      <h2 className="text-xl mb-2">Pending Invites</h2>
      <ul>
        {invites.map(i => (
          <li key={i.token} className="border p-2 mb-1 rounded">{i.email} - token: {i.token}</li>
        ))}
      </ul>
    </div>
  );
};
