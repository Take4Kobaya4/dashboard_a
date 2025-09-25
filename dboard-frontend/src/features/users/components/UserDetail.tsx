import { Alert, Box, Button, Divider, Paper, Typography, Grid, Chip } from "@mui/material";
import styled from "styled-components";
import { useUserQuery } from "../hooks/useUserQuery";
import { Person, Email, Circle, Schedule } from "@mui/icons-material";


const DetailContainer = styled(Paper)`
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
`;

const InfoRow = styled(Box)`
    display: flex;
    align-items:center;
    margin-bottom: 1rem;
    gap: 1rem;
`;

const IconWrapper = styled(Box)`
    display: flex;
    align-items: center;
    color: #666;
`;

interface UserDetailProps {
    userId: number;
    onEdit?: () => void;
    onBack?: () => void;
}

export const UserDetail = ({
    userId,
    onEdit,
    onBack
}: UserDetailProps) => {
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
    console.log(user);
    return (
        <DetailContainer elevation={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    ユーザー詳細
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {onBack && (
                        <Button variant="outlined" onClick={onBack}>
                            戻る
                        </Button>
                    )}
                    {onEdit && (
                        <Button variant="contained" onClick={onEdit}>
                            編集
                        </Button>
                    )}
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} component="div">
                    <InfoRow>
                        <IconWrapper>
                            <Person />
                        </IconWrapper>
                        <Box>
                            <Typography variant="subtitle2">
                                名前
                            </Typography>
                            <Typography variant="h6">{user.name}</Typography>
                        </Box>
                    </InfoRow>

                    <InfoRow>
                        <IconWrapper>
                            <Email />
                        </IconWrapper>
                        <Box>
                            <Typography variant="subtitle2">
                                メールアドレス
                            </Typography>
                            <Typography variant="h6">{user.email}</Typography>
                        </Box>
                    </InfoRow>
                </Grid>

                <Grid item xs={12} md={6} component="div">
                    <InfoRow>
                        <IconWrapper>
                            <Circle />
                        </IconWrapper>
                        <Box>
                            <Typography variant="subtitle2">
                                ステータス
                            </Typography>
                            <Chip
                                label={user.is_online ? 'オンライン': 'オフライン'}
                                color={user.is_online ? 'success' : 'default'}
                                icon={<Circle />}
                            />
                        </Box>
                    </InfoRow>

                    <InfoRow>
                        <IconWrapper>
                            <Schedule />
                        </IconWrapper>
                        <Box>
                            <Typography variant="subtitle2">
                                最終ログイン
                            </Typography>
                            <Typography variant="body1">
                                {user.last_login_at 
                                ? new Date(user.last_login_at).toLocaleString('ja-JP') 
                                : '未ログイン'}
                            </Typography>
                        </Box>
                    </InfoRow>
                </Grid>
            </Grid>
        </DetailContainer>
    );
}