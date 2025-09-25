import { createContext, type ReactNode } from "react";

import { useAuth } from "../hooks/useContext";
import type { AuthUser } from "../types/auth";

interface AuthContextType {
    user: AuthUser | null;
    isAuth: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuth: false,
    isLoading: false,
    login: async() => {},
    logout: async() => {}
});

export { AuthContext };

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { user, isAuth, login, logout } = useAuth();
    
    return (
        <AuthContext.Provider value={{ user, isAuth, login, logout, isLoading: false }}>
            {children}
        </AuthContext.Provider>
    );
}
