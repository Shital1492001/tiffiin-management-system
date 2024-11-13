interface RoleDetails {
  organization_id: string;
  organization_name: string;
  approval_status: string;
}

export interface Admin {
  username: string;
  password: string;
  email: string;
  contact_number: string;
  address: string;
  role_id: string;
  role_specific_details: RoleDetails;
  _id: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
export interface AllResponses {
  statuscode: number;
  data: Admin[];
  pagination: Pagination;
}

export interface UserByToken {
  statuscode: number;
  data: Admin;
}
