import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../../utils/constants";

const { Sider } = Layout;

const StyledSider = styled(Sider)`
    .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
    }
`;

const Logo = styled.div`
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    background: #001529;
`;

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // メニュー
    const menuItems = [
        {
            key: ROUTES.USERS,
            label: 'ユーザー一覧',
            onClick: () => navigate(ROUTES.USERS),
        },
        {
            key: ROUTES.CREATE_USER,
            label: 'ユーザー追加',
            onClick: () => navigate(ROUTES.CREATE_USER),
        },
        {
            key: ROUTES.ONLINE_USERS,
            label: 'オンラインユーザー一覧',
            onClick: () => navigate(ROUTES.ONLINE_USERS),
        }
    ];

    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(key);
    };

    return (
        <StyledSider>
            <Logo>UMS</Logo>
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={handleMenuClick}
                style={{ height: '100%', borderRight: 0 }}
                theme="dark"
            />
        </StyledSider>
    );
}