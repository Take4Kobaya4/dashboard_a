export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        total: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
    };
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
}