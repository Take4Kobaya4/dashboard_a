import { createContext, type ReactNode } from "react";
import type { User } from "../../users/types/user";
import { useAuth } from "../hooks/useContext";

interface AuthContextType {
    user: User | null;
    isAuth: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuth: false,
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
        <AuthContext.Provider value={{ user, isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
