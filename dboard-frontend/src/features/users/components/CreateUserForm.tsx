import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { createUserSchema, type CreateUserFormData } from "../validation/userValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormContainer = styled(Box)`
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
`;

interface CreateUserFormProps {
    onSubmit: (data: CreateUserFormData) => Promise<void>;
    loading?:boolean;
    error?: Error | null;
}

export const CreateUserForm = ({ 
    onSubmit,
    loading = false,
    error
}: CreateUserFormProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    return (
        <FormContainer>
            <Typography variant="h4" component="h1" gutterBottom>
                ユーザー作成
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error.message || 'エラーが発生しました'}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ gap: 1.5 }} >
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
                    label="パスワード"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                <TextField
                    {...register('password_confirmation')}
                    label="パスワード確認"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation?.message}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        作成
                    </Button>
                </Box>
            </Box>
        </FormContainer>
    );
}