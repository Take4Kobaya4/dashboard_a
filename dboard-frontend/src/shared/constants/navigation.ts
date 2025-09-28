export const API_ENDPOINTS = {
    // 認証
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
        GET_CURRENT_USER: '/user',
    },
    // ユーザー
    USERS: {
        LIST: '/users',
        SHOW: (id: number) => `/users/${id}`,
        CREATE: '/users/create',
        UPDATE: (id: number) => `/users/${id}`,
        DELETE: (id: number) => `/users/${id}`,
        ONLINE: '/online-users',
        BULK_DELETE: '/bulk-delete',
    }
} as const;

export const QUERY_KEYS = {
    AUTH: {
        USER: ['auth'],
    },
    USERS: {
        LIST: ['users', 'list'],
        DETAIL: (id: number) => ['users', 'detail', id],
        ONLINE: ['users', 'online'],
    },
} as const;