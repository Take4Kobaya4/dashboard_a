import { createContext, useEffect, useReducer, type ReactNode } from "react";
import type { AuthUser } from "../types/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/utils/constants";
import { authApi } from "../apis/authApi";


interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

type AuthAction = 
    | { type: 'SET_USER'; payload: AuthUser | null }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'LOGOUT' };

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload,
                isLoading: false,
            };
        
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };

        case 'LOGOUT':
            return {
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        
        default:
            return state;
    }
}

interface AuthContextType extends AuthState {
    login: (user: AuthUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const queryClient = useQueryClient();

    // ユーザー情報取得
    const { data: user, isLoading, error } = useQuery({
        queryKey: QUERY_KEYS.AUTH.ME,
        queryFn: authApi.getMe,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5分
    });

    useEffect(() => {
        if(isLoading) {
            dispatch({ type: 'SET_LOADING', payload: true });
        } else {
            // エラーがある場合はnull、ユーザーがundefinedの場合はnull、それ以外はユーザーを設定
            dispatch({ type: 'SET_USER', payload: error ? null : (user ?? null) });
        }
    }, [user, isLoading, error]);

    const login = (user: AuthUser) => {
        dispatch({ type: 'SET_USER', payload: user });
        queryClient.setQueryData(QUERY_KEYS.AUTH.ME, user);
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        queryClient.removeQueries();
        queryClient.clear();
    };

    const contextValue: AuthContextType = {
        ...state,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}