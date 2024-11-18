interface roleDetails {
  organization_id: string;
  approval_status: string;
}

export interface Admin {
  username: string;
  password: string;
  email: string;
  contact_number: string;
  address: string;
  role_id: string;
  role_specific_details: {
    organization_id: string;
    org_location: string;
    approval_status: string;
  };
  _id: string;
}

export interface allAdminStatusResponses {
  statuscode: number;
  data: Admin[];
}

export interface AdminRegister {
  // data:Admin[];
  message: string;
  statuscode: number;
  _id: string;
  token: string;
}
