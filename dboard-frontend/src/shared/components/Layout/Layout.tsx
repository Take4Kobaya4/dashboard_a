
import { Layout as AntLayout } from 'antd';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Header } from './ Header';
import { Sidebar } from './Sidebar';


const { Content } = AntLayout;

interface LayoutProps {
    children: ReactNode;
}

const StyledLayout = styled(AntLayout)`
    min-height: 100vh;
`;

const StyledContent = styled(Content)`
    padding: 24px;
    background: #fff;
`;

export const Layout = ({ children }: LayoutProps) => {
    return (
        <StyledLayout>
            <Sidebar />
            <AntLayout>
                <Header />
                <StyledContent>{children}</StyledContent>
            </AntLayout>
        </StyledLayout>
    );
};