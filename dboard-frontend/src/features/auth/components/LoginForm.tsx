import styled from 'styled-components';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../hooks/useLoginMutation';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormData } from '../validation/authValidation';
import { zodResolver } from '@hookform/resolvers/zod';

const FormContainer = styled(Box)`
    max-width: 400px;
    margin: 0 auto;
    padding: 40px 24px;
    background: #fff;
`;

const Title = styled(Typography)`
    margin-bottom: 24px;
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

export const LoginForm = () => {
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: { email: string; password: string }) => {
        loginMutation.mutateAsync(data);
        navigate('/users');
    };

    return(
        <FormContainer>
            <Title variant="h4">ログイン</Title>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="メールアドレス"
                    variant="outlined"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    autoComplete='email'
                />

                <TextField
                    label="パスワード"
                    variant="outlined"
                    type="password"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    autoComplete='password'
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={loginMutation.isPending}
                    sx={{ mt: 2 }}
                >
                    ログイン
                </Button>
            </Form>

            <LinkContainer>
                <Typography>
                    アカウントをお持ちでない方は
                    <Link to="/register">
                        こちらへ
                    </Link>
                </Typography>
            </LinkContainer>
        </FormContainer>
    );
}