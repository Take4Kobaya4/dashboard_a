import type { User } from "../../users/types/user";

export interface AuthUser extends User {
    token?: string;
}

export interface AuthResponse {
    user: AuthUser;
    token: string;
}

