/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactElement, ReactNode } from "react";
import { vi } from "vitest";
import { AuthContext } from "../../features/auth/contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { render, type RenderOptions } from "@testing-library/react";

// テスト用のQueryClientを作成
const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            gcTime: 0,
        },
        mutations: {
            retry: false,
        },
    },
});

interface AllTheProviderProps {
    children: ReactNode;
    queryClient?:QueryClient;
    initialAuthState?: {
        user: any;
        isAuthenticated: boolean;
    }
}

// モックAuthContext
// eslint-disable-next-line react-refresh/only-export-components
const MockAuthProvider = ({
    children,
    initialAuthState
}: {
    children: ReactNode;
    initialAuthState?: { user: any; isAuthenticated: boolean }
}) => {
    const login = vi.fn(async (data: { email: string; password: string }) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data.email === 'test@example.com' && data.password === 'password123') {
                    resolve(undefined);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 50);
        });
    });

    const register = vi.fn(async () => new Promise<void>((resolve) => setTimeout(resolve, 50)));
    const logout = vi.fn(async () => Promise.resolve());

    const mockValue = {
        user: initialAuthState?.user || null,
        isLoading: false,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={mockValue as any}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({
    children,
    queryClient = createTestQueryClient(),
    initialAuthState,
}: AllTheProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ConfigProvider>
                    <MockAuthProvider initialAuthState={initialAuthState}>
                        {children}
                    </MockAuthProvider>
                </ConfigProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    queryClient?: QueryClient;
    initialAuthState?: {
        user: any;
        isAuthenticated: boolean;
    }
}

const customRender = (
    ui: ReactElement,
    options: CustomRenderOptions = {}
) => {
    const { queryClient, initialAuthState, ...renderOptions } = options;

    return render(ui, {
        wrapper: ({ children}) => (
            <AllTheProviders
                queryClient={queryClient}
                initialAuthState={initialAuthState}
            >
                {children}
            </AllTheProviders>
        ),
        ...renderOptions,
    })
}

export const mockUsers = {
    adminUser: {
        id: 1,
        name: 'test',
        email: 'test@example.com',
        is_online: true
    },
    regularUser: {
        id: 2,
        name: 'test1',
        email: 'test1@example.com',
        is_online: true
    }
}

export const mockUsersList = [
    mockUsers.adminUser,
    mockUsers.regularUser,
    {
        id: 3,
        name: 'test2',
        email: 'test2@example.com',
        is_online: true
    }
];

// APIレスポンスのモック
export const mockApiResponse = {
    usersList: {
        data: mockUsersList,
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 3
    },
    loggedInUsers: [
        {
            id: 1,
            name: 'test',
            email: 'test@example.com',
            is_online: true
        },
        {
            id: 2,
            name: 'test1',
            email: 'test1@example.com',
            is_online: true
        }
    ]
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render, createTestQueryClient };
