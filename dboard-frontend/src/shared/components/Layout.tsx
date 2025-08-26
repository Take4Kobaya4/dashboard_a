import { Layout as AntLayout, Button, Menu, Space, Typography } from 'antd';
import { type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../features/auth/hooks/useAuth';

const { Header, Content, Sider } = AntLayout;
const { Text } = Typography;

const StyledLayout = styled(AntLayout)`
    min-height: 100vh;
`;

const StyledHeader = styled(Header)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
`;

const Logo = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #1890ff;
`;

const UserInfo = styled(Space)`
    align-items: center;
`;

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const menuItems = [
        {
            key: '/users',
            label: 'ユーザー一覧',
            onClick: () => navigate('/users'),
        },
        {
            key: '/online-users',
            label: 'オンラインユーザー一覧',
            onClick: () => navigate('/online-users'),
        }
    ];

    const handleLogout = async() => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    if(!user) {
        return <div>{children}</div>;
    }

    return (
        <StyledLayout>
            <StyledHeader>
                <Logo>
                    User Management System
                </Logo>
                <UserInfo>
                    <Text>ようこそ、{user.name}さん！</Text>
                    <Button
                        onClick={handleLogout}
                    >
                        ログアウト
                    </Button>
                </UserInfo>
            </StyledHeader>
            <AntLayout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        style={{ height: '100%', borderRight: 0 }}
                    />
                </Sider>
                <AntLayout style={{ padding: '24px' }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            borderRadius: 8,
                        }}
                    >
                        {children}
                    </Content>
                </AntLayout>
            </AntLayout>
        </StyledLayout>
    );
}