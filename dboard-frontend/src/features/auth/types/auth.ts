export interface AuthUser {
    id: number;
    name: string;
    email: string;
    last_login_at?: string;
    is_online: boolean;
}


export type AuthType = {
    user: AuthUser;
    token?: string;
}
