import { Box, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { User } from "../types/user";
import { UserList } from "../components/UserList";
import { Add } from "@mui/icons-material";

const Container = styled(Box)`
    position: relative;
    min-height: 100vh;
`;

const FloatingActionButton = styled(Fab)`
    position: fixed;
    top: 2rem;
    left: 2rem;
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
            <FloatingActionButton
                color="primary"
                aria-label="add user"
                onClick={handleCreateUser}
            >
                <Add />
            </FloatingActionButton>
            <UserList onView={handleView} />

            
        </Container>
    );
}