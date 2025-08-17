import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

import { LoginForm } from "../components/LoginForm";


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f2f5;
`;



export const LoginPage = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return <Navigate to="/users" replace />;
    }

    const handleLoginSuccess = () => {
        navigate("/users");
    }

    return (
        <PageContainer>
            <LoginForm onSuccess={handleLoginSuccess} />
        </PageContainer>
    );
}