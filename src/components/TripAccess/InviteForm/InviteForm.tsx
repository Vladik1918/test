import { type ChangeEvent } from 'react';

export const InviteForm = ({
  email,
  onEmailChange,
  onSend,
}: {
  email: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}) => (
  <div className="mb-4">
    <input
      placeholder="Collaborator Email"
      value={email}
      onChange={onEmailChange}
      className="border p-2 mr-2 rounded"
    />
    <button 
      onClick={onSend}
      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
    >
      Send Invite
    </button>
  </div>
);
