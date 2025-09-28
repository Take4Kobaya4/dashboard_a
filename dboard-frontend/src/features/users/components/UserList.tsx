import { Alert, Box, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import styled from "styled-components";
import type { User } from "../types/user";
import { useUserListQuery } from "../hooks/useUserListQuery";
import { Delete, Visibility } from "@mui/icons-material";
import { useDeleteUserMutation } from "../hooks/useDeleteUserMutation";

const Container = styled(Box)`
    padding: 2rem;
`;


interface UserListProps {
    onView: (user: User) => void;
}

export const UserList = ({ onView }: UserListProps) => {

    const { data: users, isLoading, error } = useUserListQuery();
    const deleteUserMutation = useDeleteUserMutation();

    const handleDeleteUser = async(id: number) => {
        if(window.confirm(`ID:${id}のユーザーを削除しますか？`)){
            try {
                await deleteUserMutation.mutateAsync(id);
            } catch (error) {
                console.error('ユーザー削除に失敗しました', error);
            }
        }
    }

    if (isLoading) return <div>Loading...</div>;
    if(error) return <Alert severity="error">エラーが発生しました</Alert>;
    
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                ユーザー一覧
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>名前</TableCell>
                            <TableCell>メールアドレス</TableCell>
                            <TableCell>ステータス</TableCell>
                            <TableCell>最終ログイン</TableCell>
                            <TableCell>アクション</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.is_online ? 'オンライン' : 'オフライン'}
                                        color={user.is_online ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {user.last_login_at
                                        ? new Date(user.last_login_at).toLocaleString()
                                        : '未ログイン'
                                    }
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => onView?.(user)}>
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDeleteUser(user.id)}
                                        disabled={deleteUserMutation.isPending}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    );
};