
export type Role = 'User' | 'Owner' | 'Collaborator';


export interface IUser {
  uid: string;
  email: string;
  name?: string;
  role: Role;
}


export interface AuthState {
  user: IUser | null;
  idToken: string | null;
  loading: boolean;
  error: string | null;
}
