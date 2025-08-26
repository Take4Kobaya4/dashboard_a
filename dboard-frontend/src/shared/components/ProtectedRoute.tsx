import type { ReactNode } from "react";
import styled from "styled-components";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { Spin } from "antd";
import { Navigate } from "react-router-dom";


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

    if(isLoading) {
        return (
            <LoadingContainer>
                <Spin size="large" />
            </LoadingContainer>
        );
    }

    // ユーザーでない時、ログイン画面へ遷移
    if (user) {
        return <>{children}</>;
    } 
    
    return <Navigate to="/login" replace />;
}