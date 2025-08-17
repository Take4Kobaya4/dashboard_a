export interface User {
    id: number;
    name: string;
    email: string;
    last_login_at: string | null;
    is_online: boolean;
}

// ユーザー作成の型
export interface CreateUserData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

// ユーザー更新の型
export interface UpdateUserData {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
}

