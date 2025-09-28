import { Alert, Box, Button, Chip, Typography } from "@mui/material";
import styled from "styled-components";
import { useUserQuery } from "../hooks/useUserQuery";
import { useParams } from "react-router-dom";

const DetailContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
`;

const Item = styled(Box)`
    margin-bottom: 2rem;
`;

const Label = styled(Typography)`
    font-size: 1.2rem;
    font-weight: 500;
    color: #777;
    margin-bottom: 0.5rem;
`;

const Value = styled(Typography)`
    font-size: 1.2rem;
    font-weight: 600;
    color: #222;
`;

interface UserDetailProps {
    onEdit?: () => void;
    onBack?: () => void;
}

export const UserDetail = ({
    onEdit,
    onBack
}: UserDetailProps) => {
    const { id } = useParams<{ id: string }>();
    const userId = Number(id);
    const { data: user, isLoading, error } = useUserQuery(userId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error || !user) {
        return (
            <Alert severity="error">
                ユーザー情報の取得に失敗しました
            </Alert>
        );
    }
    
    return (
        <DetailContainer>
            <Typography variant="h4">ユーザー情報</Typography>
            <Item>
                <Label>名前</Label>
                <Value>{user.name}</Value>
            </Item>

            <Item>
                <Label>メールアドレス</Label>
                <Value>{user.email}</Value>
            </Item>

            <Item>
                <Label>ステータス</Label>
                <Chip 
                    label={user.is_online ? 'オンライン' : 'オフライン'}
                    color={user.is_online ? 'success' : 'default'}
                    sx={{ fontSize: '1.2rem', fontWeight: 600 }}
                />
            </Item>

            <Item>
                <Label>最終ログイン日時</Label>
                <Value>
                    {user.last_login_at 
                    ? new Date(user.last_login_at).toLocaleString()
                    : '未ログイン'
                    }
                </Value>
            </Item>

            <Item>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        {onBack && (
                            <Button 
                            variant="outlined"
                            onClick={onBack}>
                                戻る
                            </Button>
                        )}
                    </Box>
                    <Box>
                        {onEdit && (
                            <Button 
                            variant="contained"
                            color="info"
                            onClick={onEdit}
                            >
                                編集
                            </Button>
                        )}
                    </Box>
                </Box>
            </Item>
        </DetailContainer>
    );
}