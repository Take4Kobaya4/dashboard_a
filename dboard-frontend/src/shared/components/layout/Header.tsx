import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import styled from "styled-components";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const HEADER_HEIGHT = 64; // ヘッダーの実際の高さに合わせてください

const StyledAppBar = styled(AppBar)`
    height: ${HEADER_HEIGHT}px;
    && {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    }
`;

const StyledToolbar = styled(Toolbar)`
    justify-content: space-between;
    padding: 0 20px;
`;

const LogoSection = styled(Box)`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const UserSection = styled(Box)`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const UserInfo = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleLogoClick = () => {
        navigate('/users');
    };

    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <LogoSection onClick={handleLogoClick}>
                    <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
                        ユーザー管理システム
                    </Typography>
                </LogoSection>

                    <UserSection>
                        <UserInfo>
                            {user && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleLogout}
                                    >
                                        ログアウト
                                    </Button>
                                </>
                            )}
                        </UserInfo>
                    </UserSection>
            </StyledToolbar>
        </StyledAppBar>
    );
}