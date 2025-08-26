import { createContext, type ReactNode } from "react";
import type { User } from "../../users/types/user";
import type { LoginData, RegisterData } from "../types/auth";
import { useFetchMe, useLogin, useLogout, useRegister } from "../hooks/authHooks";



interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { data: user, isLoading, refetch } = useFetchMe();
    const loginMutation = useLogin();
    const logoutMutation = useLogout();
    const registerMutation = useRegister();

    const login = async (data: LoginData) => {
        await loginMutation.mutateAsync(data);
        // トークン保存後に少し遅延を設けてからrefetchを実行
        setTimeout(async () => {
            await refetch();
        }, 100);
    }

    const register = async (data: RegisterData) => {
        await registerMutation.mutateAsync(data);
        await refetch();
    }

    const logout = async () => {
        await logoutMutation.mutateAsync();
    }

    const value: AuthContextType = {
        user: user ?? null,
        isLoading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}