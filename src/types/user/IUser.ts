export interface IUser {
  username: string;
  company_name: string;
  email: string;
  wallet_address: string;
  isAuthenticated: boolean;
  upstream: number;
  downstream: number;
  supply: number;
  prerequisite: number;
  isOwner: boolean;
}

export interface ILandingUser {
  incomingContract: number;
  incomingRequests: number;
}
