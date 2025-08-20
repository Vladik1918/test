
export interface IInvite {
  id: string;         
  tripId: string;      
  email: string;       
  token: string;       
  createdAt: string;
  expiresAt: string;   
  accepted?: boolean;
}

export interface InviteState {
  invites: IInvite[];
  loading: boolean;
  error: string | null;
}
