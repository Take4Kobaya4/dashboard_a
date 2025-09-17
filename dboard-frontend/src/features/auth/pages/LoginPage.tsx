import { Box, Container } from "@mui/material";
import styled from "styled-components";
import { LoginForm } from "../components/LoginForm";

const PageContainer = styled(Box)`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const LoginPage = () => {
    return (
        <PageContainer>
            <Container maxWidth="sm">
                <LoginForm />
            </Container>
        </PageContainer>
    );
}