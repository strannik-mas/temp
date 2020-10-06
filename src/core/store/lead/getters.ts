import {GetterTree} from 'vuex';
import {Lead, LeadDetails, LeadsState} from '@/core/store/lead/types';
import {RootState} from '../types';

function getLead(state: LeadsState, leadId: number) {
    const leadArrRequests: Array<Lead> | undefined = state.requests_leads;
    const leadArrHistory: Array<Lead> | undefined = state.hisory_leads;
    let lead: Lead | undefined;
    if (leadArrRequests !== undefined) {
        lead = leadArrRequests.find((l: Lead) => l.id === leadId);
    }
    if (lead === undefined && leadArrHistory !== undefined) {
        lead = leadArrHistory.find((l: Lead) => l.id === leadId);
    }
    return lead;
}

export const getters: GetterTree<LeadsState, RootState> = {
    activeLeads(state): Array<Lead>|undefined {
        return state.requests_leads;
    },
    historyLeads(state): Array<Lead>|undefined {
        return state.hisory_leads;
    },
    getLeadById(state): (leadId: number) => Lead|undefined {
        return (leadId: number) => getLead(state, leadId);
    },
    getLeadDetails(state): (leadId: number) => LeadDetails|undefined {
        return (leadId: number) => {
            // console.log(leadId);
            let details: LeadDetails | undefined;
            const lead: Lead|undefined = getLead(state, leadId);
            // console.log(lead);
            if (lead !== undefined) {
                details = lead.details;
            }
            return details;
        };
    },
    getFilesForLead(state): (leadId: number) => Array<File>|undefined {
        return (leadId: number) => {
            // console.log(leadId);
            let files: Array<File> | undefined;
            const lead: Lead|undefined = getLead(state, leadId);
            // console.log(lead);
            if (lead !== undefined && lead.details !== undefined) {
                files = lead.details.files;
            }
            return files;
        };
    },
};
