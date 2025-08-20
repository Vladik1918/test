export interface IAccessInvite {
  id: string;
  tripId: string;
  email: string;
  token: string;
  status: "pending" | "accepted" | "revoked"; 
  createdAt: string;
}

export interface AccessInvitesState {
  invites: IAccessInvite[];
  loading: boolean;
  error: string | null;
}
