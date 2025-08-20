
import type { IInvite } from "../../../pages/TripAccessPage";

export const InvitesList = ({ invites }: { invites: IInvite[] }) => (
  <>
    <h2 className="text-xl mb-2">Pending Invites</h2>
    {invites.length === 0 ? (
      <p className="text-gray-500">No invites yet.</p>
    ) : (
      <ul>
        {invites.map(i => (
          <li key={i.token} className="border p-2 mb-1 rounded">
            {i.email} <span className="text-gray-500">({i.token})</span>
          </li>
        ))}
      </ul>
    )}
  </>
);



