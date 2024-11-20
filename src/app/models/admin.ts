interface RoleDetails {
    organization_id: string;
    org_location: string;
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
  export interface AllAdminStatusResponses {
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
  