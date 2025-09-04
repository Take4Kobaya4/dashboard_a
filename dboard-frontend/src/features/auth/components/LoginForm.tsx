import { Button, Card, Form, Input, Space, Typography, message } from "antd";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import type { LoginData } from "../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/authValidation";

const { Title } = Typography;


const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f2f5;
`;

const LoginCard = styled(Card)`
    width: 400px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const RegisterLink = styled.div`
    margin-top: 16px;
    text-align: center;
`;


interface LoginFormProps {
    onSuccess: () => void;
}

export const LoginForm = ( { onSuccess }: LoginFormProps) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: LoginData) => {
        try {
            await login(data);
            const from = location.state?.from?.pathname || "/users";
            navigate(from);
            message.success('ログインに成功しました');
            onSuccess?.();
        } catch {
            message.error('ログインに失敗しました');
        }
    }

    return (
        <LoginContainer>
            <LoginCard>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
                        Login
                    </Title>
                    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                        <Form.Item
                            label="Email"
                            validateStatus={errors.email ? "error" : ""}
                            help={errors.email ? errors.email.message : ""}
                        >
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Enter your email"
                                        type="email"
                                        aria-label="Email"
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            validateStatus={errors.password ? "error" : ""}
                            help={errors.password ? errors.password.message : ""}
                        >
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        placeholder="Enter your password"
                                        aria-label="Password"
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                style={{ width: '100%' }}
                                loading={isSubmitting}
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </Button>
                        </Form.Item>
                        <RegisterLink>
                            <span>Don\'t have an account? </span>
                            <Link to="/register">
                                <Button type="link" style={{ padding: 0 }}>
                                    Register
                                </Button>
                            </Link>
                        </RegisterLink>
                    </Form>
                </Space>
            </LoginCard>
        </LoginContainer>
    );
}