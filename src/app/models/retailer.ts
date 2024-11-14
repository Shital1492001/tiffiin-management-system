export interface Approval {
  approval_status: string;
  organization_id: string;
  istrendy: boolean;
}
export interface RetailerResponse {
  _id: string;
  username: string;
  password: string;
  email: string;
  contact_number: string;
  address: string;
  role_id: string;
  role_specific_details: {
    organization_id: string;
    approval: Approval;
  };
  created_at: '2024-11-10T17:39:45.641Z';
  updated_at: '2024-11-10T17:39:45.641Z';
}
