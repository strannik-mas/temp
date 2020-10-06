export interface LeadDetails {
    agents?: Array<any>;
    bids?: Array<any>;
    formData: Array<any>;
    info: Array<any>;
    files?: Array<any>;
}

export interface Lead {
    id: number;
    sphere_id: number;
    created_at: string;
    count_review: number;
    count_interest: number;
    count_bids: number;
    details?: LeadDetails;
}

export interface LeadsState {
    requests_leads?: Array<Lead>;
    hisory_leads?: Array<Lead>;
    error: boolean;
}
