import {MutationTree} from 'vuex';
import {Lead, LeadDetails, LeadsState} from '@/core/store/lead/types';

export const mutations: MutationTree<LeadsState> = {
    updateLeads(state, payload: {leads: Array<Lead>; active: boolean}) {
        if (payload.active) {
            state.requests_leads = payload.leads;
        } else {
            state.hisory_leads = payload.leads;
        }
    },
    addLead(state, payload: Lead) {
        if (state.requests_leads === undefined) {
            state.requests_leads = [];
        }
        state.requests_leads.unshift(payload);
    },
    updateLeadDetails(state, payload: {id: number; leadDetails: LeadDetails; active: boolean}) {
        let leadArr: Array<Lead>|undefined;
        if (payload.active) {
            leadArr = state.requests_leads;
        } else {
            leadArr = state.hisory_leads;
        }
        if (leadArr !== undefined) {
            const lead: Lead | undefined = leadArr.find((l: Lead) => l.id === +payload.id);
            if (lead !== undefined) {
                lead.details = payload.leadDetails;
            }
        }
    },
    updateDocuments(state, payload: {id: number; documents: Array<File>; getters: any}) {
        const lead: Lead | undefined = payload.getters.getLeadById(payload.id);
        if (lead !== undefined && lead.details !== undefined) {
            //console.log(lead.details.files);
            if (lead.details.files === undefined || lead.details.files === null) {
                lead.details.files = payload.documents;
            } else {
                //Object.assign(lead.details.files, payload.documents);
                // eslint-disable-next-line no-unused-expressions
                //lead.details.files.concat(payload.documents);
                // eslint-disable-next-line no-restricted-syntax
                for (const file of payload.documents) {
                    lead.details.files.unshift(file);
                }
                //console.log(lead.details.files);
            }
        }
    },
    deleteDocument(state, payload: {id: number; leadId: number; getters: any}) {
        const lead: Lead | undefined = payload.getters.getLeadById(payload.leadId);
        if (lead !== undefined && lead.details !== undefined && lead.details.files !== undefined) {
            lead.details.files = lead.details.files.filter((file: { id: number }) => file.id !== payload.id);
        }
    },
};
