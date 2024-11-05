export interface Login {
  email: string | null;
  password: string | null;
}
export interface Token {
  token: string;
  message: string;
  statuscode: number;
  success: boolean;
  _id: string;
}
