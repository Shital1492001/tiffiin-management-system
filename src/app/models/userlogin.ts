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
  role_id: string;
}
export enum Roles {
  SUPER_ADMIN = '67276c8186b969fac0d57362',
  ADMIN = '672775e4f2a1e38ef52c63c6',
}
