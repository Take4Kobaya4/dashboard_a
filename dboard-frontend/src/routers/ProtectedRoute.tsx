import type { ReactNode } from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuth } = useAuth();

    if (!isAuth) {
        <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};