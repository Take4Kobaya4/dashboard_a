import { beforeEach, describe, expect, it, vi } from "vitest"
import { cleanupMocks } from "../../../test/utils/mock-helpers"
import { useAuth } from "./useAuth"
import { renderHook } from '@testing-library/react';
import { AuthContext } from "../contexts/AuthContext";
import type { ReactNode } from "react";



type AuthContextValue = Parameters<typeof AuthContext.Provider>[0]['value'];

const createWrapper = (mocks: {
    login?: ReturnType<typeof vi.fn>,
    register?: ReturnType<typeof vi.fn>,
    logout?: ReturnType<typeof vi.fn>,
}) => {
    const value = {
        user: null,
        isLoading: false,
        login: mocks.login ?? vi.fn(),
        register: mocks.register ?? vi.fn(),
        logout: mocks.logout ?? vi.fn(),
    };
    return ({ children }: { children: ReactNode }) => (
        <AuthContext.Provider value={value as AuthContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

describe('useAuth', () => {
    const loginMock = vi.fn(async () => Promise.resolve());
    const registerMock = vi.fn(async () => Promise.resolve());
    const logoutMock = vi.fn(async () => Promise.resolve());

    beforeEach(() => {
        cleanupMocks();
        loginMock.mockClear();
        registerMock.mockClear();
        logoutMock.mockClear();
    })

    it('ログイン機能が正しく動作すること', async () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: createWrapper({ login: loginMock }),
        });

        await result.current.login({
            email: 'test@example.com',
            password: 'password123',
        });

        expect(loginMock).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password123',
        });
    })

    it('会員登録機能が正しく動作すること', async () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: createWrapper({ register: registerMock }),
        });

        await result.current.register({
            name: 'test1',
            email: 'test1@example.com',
            password: 'password123',
            password_confirmation: 'password123',
        });

        expect(registerMock).toHaveBeenCalledWith({
            name: 'test1',
            email: 'test1@example.com',
            password: 'password123',
            password_confirmation: 'password123',
        });
    })

    it('ログアウト機能が正しく機能すること', async () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: createWrapper({ logout: logoutMock }),
        });

        await result.current.logout();

        expect(logoutMock).toHaveBeenCalled();
    })
})