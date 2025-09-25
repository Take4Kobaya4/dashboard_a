import type { ReactNode } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { API_ENDPOINTS } from "../shared/constants/navigation";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuth, isLoading } = useAuth();

    if(isLoading) {
        return <div>Loading...</div>;
    }

    return isAuth ? <>{children}</> : <Navigate to={API_ENDPOINTS.AUTH.LOGIN} replace />;
};