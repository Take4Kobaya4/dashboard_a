import { Box, Container } from "@mui/material";
import styled from "styled-components";
import { RegisterForm } from "../components/RegisterForm";

const PageContainer = styled(Box)`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const RegisterPage = () => {
    return (
        <PageContainer>
            <Container maxWidth="sm">
                <RegisterForm />
            </Container>
        </PageContainer>
    );
}