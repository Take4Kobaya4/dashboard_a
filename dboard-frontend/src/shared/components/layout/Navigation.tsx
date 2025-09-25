import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const NavigationContainer = styled(Box)`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: 20px;
`;

const NavButton = styled(Button)`
    color: #fff;
    text-transform: none;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.2s ease;
    &: hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export const Navigation = () => {
    const navigate = useNavigate();

    return (
        <NavigationContainer>
            <NavButton
                onClick={() => navigate('/users')}
                variant="contained"
            >
                ユーザー一覧
            </NavButton>
            <NavButton
                variant="contained"
                onClick={() => navigate('/users/create')}
            >
                ユーザー作成
            </NavButton>
            <NavButton
                variant="contained"
                onClick={() => navigate('/online-users')}
            >
                オンラインユーザー
            </NavButton>
        </NavigationContainer>
    );
}