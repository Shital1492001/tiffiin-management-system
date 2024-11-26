interface RoleDetails {
  organization_id: string;
  org_location: string;
  approval_status: string;
}


export interface AllAdminStatusResponses {
  statusCode: number;
  data: Admin[];
  pagination: Pagination;
}



export interface Admin extends TableItem{
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
  statusCode: number;
  data: Admin[];
  pagination: Pagination;
}

export interface UserByToken {
  statusCode: number;
  data: Admin;
}

export interface AdminRegister {
  // data:Admin[];
  message: string;
  statusCode: number;
  _id: string;
  token: string;
}

export interface TableItem {
  username: string;
  email: string;
  contact_number: string;
  status: string;
}