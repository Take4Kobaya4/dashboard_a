import type { ReactNode } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../utils/constants";


interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
       return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    return <>{children}</>;
}