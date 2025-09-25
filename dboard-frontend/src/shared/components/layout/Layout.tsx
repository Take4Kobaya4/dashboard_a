import { Box } from "@mui/material";
import type { ReactNode } from "react";
import styled from "styled-components";
import { Header } from "./Header";

const MainContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    
    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }}>
                <MainContainer>
                        {children}
                </MainContainer>
            </Box>
        </>
    );
}