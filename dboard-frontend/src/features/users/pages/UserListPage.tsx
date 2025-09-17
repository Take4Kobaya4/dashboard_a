
import { Button } from "@mui/material";
import { useAuth } from "../../auth/hooks/useContext";
import { useNavigate } from "react-router-dom";


export const UserListPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
        await logout();
        navigate('/login');
    }

    return (
        <Button
            variant="contained"
            onClick={handleLogout}
            sx={{ mt: 3, mb: 2 }}
            color="error"
        >
            ログアウト
        </Button>
    );
}