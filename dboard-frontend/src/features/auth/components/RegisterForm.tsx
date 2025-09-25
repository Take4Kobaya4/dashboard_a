import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRegisterMutation } from "../hooks/useRegisterMutation";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";

const FormContainer = styled(Box)`
    max-width: 400px;
    margin: 0 auto;
    padding: 40px 24px;
    background: #fff;
`;

const Title = styled(Typography)`
    margin-bottom: 32px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const LinkContainer = styled(Box)`
    text-align: center;
    margin-top: 24px;
`;

export const RegisterForm = () => {
    const navigate = useNavigate();
    const registerMutation = useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const onSubmit = async(data: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }) => {
        try {
            await registerMutation.mutateAsync(data);
            navigate('/login');
        } catch (error) {
            console.error("Registration failed:", error);
            // TODO: ユーザーにエラーメッセージを表示する
        }
    };

    return (
        <FormContainer>
            <Title variant="h4">会員登録</Title>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="名前"
                    variant="outlined"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField
                    label="メールアドレス"
                    variant="outlined"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="パスワード"
                    variant="outlined"
                    type="password"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <TextField
                    label="パスワード確認"
                    variant="outlined"
                    type="password"
                    {...register("password_confirmation")}
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation?.message}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    loading={registerMutation.isPending}
                    sx={{ mt: 2 }}
                >
                    登録
                </Button>
            </Form>

            <LinkContainer>
                <Typography variant="body2">
                    既にアカウントをお持ちの方は
                    <Link to="/login">
                        こちらへ
                    </Link>
                </Typography>
            </LinkContainer>
        </FormContainer>
    );
}
