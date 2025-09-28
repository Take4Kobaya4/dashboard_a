import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";
import { UserList } from "../components/UserList";



export const UserListPage = () => {
    const navigate = useNavigate();

    const handleView = (user: User) => {
        navigate(`/users/${user.id}`);
    }

    return (
        <Box>
            <UserList onView={handleView} />
        </Box>
    );
}