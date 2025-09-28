import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import type { User } from "../types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema, type UpdateUserFormData } from "../validation/userValidation";
import { useNavigate } from "react-router-dom";

const FormContainer = styled(Box)`
    max-width: 600px;
    padding: 2rem;
`;

interface UserUpdateProps {
    user: User;
    onSubmit: (data: UpdateUserFormData) => Promise<void>;
    loading?: boolean;
    error?: Error | null;
}

export const UpdateUserForm = ({
    user,
    onSubmit,
    loading = false,
    error
}: UserUpdateProps) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }, // ここを修正
    } = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
        },
    });

    return (
        <FormContainer>
            <Typography variant="h4" component="h1" gutterBottom>
                ユーザー情報更新
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error.message || 'エラーが発生しました'}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField
                    {...register('name')}
                    label="名前"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <TextField
                    {...register('email')}
                    label="メールアドレス"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    {...register('password')}
                    label="パスワード（変更する場合のみ入力）"
                    fullWidth
                    margin="normal"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                <TextField
                    {...register('password_confirmation')}
                    label="パスワード確認（変更する場合のみ入力）"
                    fullWidth
                    margin="normal"
                    type="password"
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation?.message}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        更新
                    </Button>
                    {/* 詳細画面へ遷移 */}
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate(`/users/${user.id}`)}
                        sx={{ mt: 2 }}
                    >
                        戻る
                    </Button>
                </Box>
            </Box>
        </FormContainer>
    );
}