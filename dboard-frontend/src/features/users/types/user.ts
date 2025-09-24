export interface User {
    id: number;
    name: string;
    email: string;
    last_login_at?: string;
    is_online: boolean;
}

export interface CreateUserData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface UpdateUserData {
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
}

