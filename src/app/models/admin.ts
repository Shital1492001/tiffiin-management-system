interface roleDetails {
  organization_id: string;
  organization_name: string;
  approval_status: string;
}

export interface admin {
  username: string;
  password: string;
  email: string;
  contact_number: string;
  address: string;
  //   created_at: Date;
  //   updated_at: Date;
  role_id: string;
  role_specific_details: roleDetails;
  _id: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
export interface allAdminStatusResponses {
  statuscode: number;
  data: admin[];
  pagination: Pagination;
}
