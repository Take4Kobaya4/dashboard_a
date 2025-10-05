import { Circle } from "@mui/icons-material";
import { Alert, Box, Typography, Button, List, ListItem, Checkbox, ListItemText, Divider, Paper } from "@mui/material";
import { Fragment, useState } from "react";
import styled from "styled-components";
import { useGetOnlineUsersQuery } from "../hooks/useGetOnlineUsersQuery";
import { useDeleteUsersMutation } from "../hooks/useDeleteUsersMutation";

const Container = styled(Box)`
    padding: 2rem;
`;

const OnlineIndicator = styled(Circle)`
    color: #4caf50;
    font-size: 0.8rem;
`;

const ActionContainer = styled(Box)`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    align-items: center;
`;

export const OnlineUserList = () => {
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const { data: users, isLoading, error, refetch } = useGetOnlineUsersQuery();
    const deleteUsersMutation = useDeleteUsersMutation();
    
    const handleSelectUser = (userId: number) => {
        setSelectedUsers(prev => 
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSelectAll = () => {
        if(selectedUsers.length === users?.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users?.map(user => user.id) || []);
        }
    };

    const handleDeleteSelected = async() => {
        if(window.confirm('選択したユーザーを削除してもよろしいでしょうか？')){
            try {
                await deleteUsersMutation.mutateAsync(selectedUsers);
                setSelectedUsers([]); // 成功時に選択をクリア
            } catch(error) {
                console.error('ユーザー削除に失敗しました', error);
            }
        } 
    }

    if(isLoading) {
        return <Box>Loading...</Box>;
    }

    if(error){
        return (
            <Alert severity="error">
                オンラインユーザーの取得に失敗しました
            </Alert>
        );
    }

    if(!users || users.length === 0){
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    オンラインユーザー
                </Typography>
                <Alert severity="error">
                    現在オンラインのユーザーはいません
                </Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                オンラインユーザー ({users.length})
            </Typography>

            <ActionContainer>
                <Button
                    variant="outlined"
                    onClick={handleSelectAll}
                >
                    {selectedUsers.length === users.length ? '全選択解除' : '全選択'}
                </Button>

                {selectedUsers.length > 0 && (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteSelected}
                        loading={deleteUsersMutation.isPending}
                    >
                        選択したユーザーを削除 {selectedUsers.length}
                    </Button>
                )}

                <Button
                    variant="outlined"
                    onClick={() => refetch()}
                >
                    更新
                </Button>
            </ActionContainer>

            <Paper elevation={3}>
                <List>
                    {users.map((user, index) => (
                        <Fragment key={user.id}>
                            <ListItem>
                                <Checkbox
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleSelectUser(user.id)}
                                />
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {user.name}
                                            <OnlineIndicator />
                                        </Box>
                                    }
                                    secondary={
                                        <Box>
                                            <Typography variant="body2" color="textSecondary">
                                                {user.email}
                                            </Typography>
                                            {user.last_login_at && (
                                                <Typography variant="caption" color="textSecondary">
                                                    最終ログイン: {new Date(user.last_login_at).toLocaleDateString('ja-JP')}
                                                </Typography>
                                            )}
                                        </Box>
                                    }
                                />
                            </ListItem>
                            {index < users.length - 1 && <Divider />}
                        </Fragment>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}