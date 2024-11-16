interface roleDetails {
    organization_id: string;
    organization_Name:string;
    approval_status: string;
  }
  
  export interface Admin {
    username: string;
    password: string;
    email: string;
    contact_number: string;
    address: string;
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
    data: Admin[];
  pagination: Pagination;
  }

  export interface AdminRegister {
    // data:Admin[];
    message: string;
    statuscode: number;
    _id: string;
    token: string;
  }