import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f2f5;
`;


export const RegisterPage = () => {
    const { user , isLoading } = useAuth();
    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (user) {
        return <Navigate to="/users" replace />
    }

    const handleRegisterSuccess = () => {
        navigate('/users');
    }

    return (
        <PageContainer>
            <RegisterForm onSuccess={handleRegisterSuccess} />
        </PageContainer>
    );
}