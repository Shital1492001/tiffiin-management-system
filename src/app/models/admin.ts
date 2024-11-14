interface roleDetails {
    organization_id: string;
    approval_status: string;
  }
  
  export interface admin {
    username: string;
    password: string;
    email: string;
    contact_number: string;
    address: string;
    role_id: string;
    role_specific_details: roleDetails;
    _id: string;
  }
  
  export interface allAdminStatusResponses {
    statuscode: number;
    data: admin[];
  }

  export interface AdminRegister {
    // data:Admin[];
    message: string;
    statuscode: number;
    _id: string;
    token: string;
  }