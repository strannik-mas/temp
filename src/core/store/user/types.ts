export interface User {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone: string;
    password?: string;
    password_confirmation?: string;
    api_key?: string;
    state?: number;
    device?: number;
}

export interface ProfileState {
    user?: User;
    error: boolean;
}
