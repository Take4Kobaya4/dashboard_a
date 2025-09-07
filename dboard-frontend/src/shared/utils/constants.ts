export const ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    USERS: '/users',
    USER_DETAIL: '/users/:id',
    CREATE_USER: '/users/create',
    UPDATE_USER: '/users/:id/update',
    ONLINE_USERS: '/online-users',
} as const;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
        ME: '/me',
    },
    USERS: {
        LIST: '/users',
        SHOW: '/users/:id',
        CREATE: '/users',
        UPDATE: '/users/:id',
        DELETE: '/users/:id',
        ONLINE: '/online-users',
        BULK_DELETE: '/bulk-delete',
    },
} as const;

export const QUERY_KEYS = {
    AUTH: {
        ME: ['auth', 'me'],
    },
    USERS: {
        LIST: ['users'],
        DETAIL: ['users', 'detail'],
        ONLINE: ['users', 'online'],
    }
} as const;
