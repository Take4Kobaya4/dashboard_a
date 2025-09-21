import type { User } from "../../users/types/user";

export interface AuthUser extends User {
    token?: string;
    last_login_at?: string;
    is_online: boolean;
}

export interface AuthResponse {
    user: AuthUser;
    token: string;
}

