export interface Location {
    loc: string;
    address: string;
    loc_contact: number;
    loc_email: string;
    admin_id: string;                                
}

export interface Organization {
    org_name : string;
    org_location : Location[]; 
    org_created_at : Date;
    org_updated_at : Date;
    isActive: boolean;

}