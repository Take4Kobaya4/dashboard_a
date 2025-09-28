import { Box, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { User } from "../types/user";
import { UserList } from "../components/UserList";
import { Add } from "@mui/icons-material";
import { SIDEBAR_WIDTH } from "../../../shared/components/layout/Sidebar";

const FloatingActionButton = styled(Fab)`
    position: fixed;
    bottom: 1rem;
    left: calc(${SIDEBAR_WIDTH} + 2rem);
    z-index: 1000;
`;

export const UserListPage = () => {
    const navigate = useNavigate();

    const handleView = (user: User) => {
        navigate(`/users/${user.id}`);
    }

    const handleCreateUser = () => {
        navigate('/users/create');
    }

    return (
        <Box>
            <UserList onView={handleView} />

            <FloatingActionButton
                color="primary"
                aria-label="add user"
                onClick={handleCreateUser}
            >
                <Add />
            </FloatingActionButton>
        </Box>
    );
}