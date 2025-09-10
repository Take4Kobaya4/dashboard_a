import { Avatar, Button, Dropdown, Layout, Space, Typography } from "antd";
import styled from "styled-components";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useLogout } from "../../../features/auth/hooks/useLogout";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const StyledHeader = styled(AntHeader)`
    background: #fff;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Header = () => {
    const { user } = useAuth();
    const { mutate: logout, isPending } = useLogout();

    const menuItems = [
        {
            key: 'logout',
            label: 'ログアウト',
            onclick: () => logout(),
        },
    ];

    return (
        <StyledHeader>
            <Typography.Title level={3}>User Management System</Typography.Title>
            <Space>
                <Text>こんにちは、{user?.name}さん</Text>
                <Dropdown menu={{  items: menuItems }} placement="bottomRight">
                    <Button type="text" loading={isPending}>
                        <Avatar size="small" />
                    </Button>
                </Dropdown>
            </Space>
        </StyledHeader>
    );
}
