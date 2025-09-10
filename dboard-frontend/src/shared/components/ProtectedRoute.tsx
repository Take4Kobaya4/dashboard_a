import type { ReactNode } from "react";
import styled from "styled-components";
import { useAuth } from "../../features/users/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";


const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if(isLoading) {
        return (
            <LoadingContainer>
                <Spin size="large" />
            </LoadingContainer>
        );
    }

    // ユーザーでない時、ログイン画面へ遷移
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } 
    return <>{children}</>;
}