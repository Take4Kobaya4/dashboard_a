import { Box } from "@mui/material";
import type { ReactNode } from "react";
import styled from "styled-components";
import { Header } from "./Header";
import { Sidebar, SIDEBAR_WIDTH } from "./Sidebar";


const LayoutContainer = styled(Box)`
    display: block;
    min-height: 100vh;
`;

const ContentContainer = styled(Box)`
    display: flex;
`;

const Content = styled(Box)`
    flex-grow: 1;
    padding: 0;
    background: #f5f5f5; 
    margin-left: ${SIDEBAR_WIDTH};
    height: calc(100vh - 64px);
    overflow-y: auto;
`;

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <LayoutContainer>
                <Header />
                <ContentContainer>
                    <Sidebar open onClose={() => {}} variant="permanent" /> 
                    <Content>
                        {children}
                    </Content>
                </ContentContainer>
            </LayoutContainer>
        </>
    );
}