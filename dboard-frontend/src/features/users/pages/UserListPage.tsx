import { Box, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { User } from "../types/user";
import { UserList } from "../components/UserList";
import { Add } from "@mui/icons-material";

const Container = styled(Box)`
    position: relative;
    min-height: calc(100vh - 64px);
`;

const FloatingActionButton = styled(Fab)`
    position: absolute;
    bottom: 2rem;
    right: 2rem;
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
        <Container>
            <UserList onView={handleView} />

            <FloatingActionButton
                color="primary"
                aria-label="add user"
                onClick={handleCreateUser}
            >
                <Add />
            </FloatingActionButton>
        </Container>
    );
}