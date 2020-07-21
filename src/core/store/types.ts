export type ValidationErrors = {string: Array<string>}|null;
export interface RootState {
    loading: boolean;
    errors: ValidationErrors;
}
