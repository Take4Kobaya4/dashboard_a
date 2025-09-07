import type { User } from "../../users/types/user";

export interface AuthUser extends User {
    email_verified_at: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

