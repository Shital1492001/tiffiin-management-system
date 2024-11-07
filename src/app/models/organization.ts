export interface Location {
  loc: string;
  address: string;
  loc_contact: number;
  loc_email: string;
  admin_id: string;
}

export interface Organization {
  isActive: boolean;
  org_created_at: Date;
  org_location: Location[];
  org_name: string;
  org_updated_at: Date;
  _id: string;
}
