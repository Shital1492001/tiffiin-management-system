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
  //   created_at: Date;
  //   updated_at: Date;
  role_id: string;
  role_specific_details: RoleDetails;
  _id: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
export interface AllAdminStatusResponses {
  statuscode: number;
  data: Admin[];
  pagination: Pagination;
}
