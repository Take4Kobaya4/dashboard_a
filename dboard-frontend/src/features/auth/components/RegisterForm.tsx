import { Button, Card, Form, Input, Typography, message } from "antd";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import type { RegisterData } from "../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/authValidation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
`;

const RegisterCard = styled(Card)`
    width: 400px;
`;

const LoginLink = styled.div`
    margin-top: 24px;
    text-align: center;
`;

interface RegisterFormProps {
    onSuccess: () => void;
}
export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const onSubmit = async (data: RegisterData) => {
        try {
            await registerUser(data);
            navigate('/users');
            message.success('会員登録に成功しました');
            onSuccess?.();
        } catch {
            console.error("Registration failed");
        }
    }

    return (
        <RegisterContainer>
            <RegisterCard>
                <Title level={2} style={{ textAlign: "center", margin: 0 }}>
                    Register
                </Title>
                <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                    <Form.Item
                        label="Name"
                        validateStatus={errors.name ? "error" : ""}
                        help={errors.name ? errors.name.message : ""}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field}) => (
                                <Input
                                    {...field}
                                    placeholder="Enter your name"
                                    aria-label="Name"
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>

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
                                    size="large"
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
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password Confirmation"
                        validateStatus={errors.password_confirmation ? "error" : ""}
                        help={errors.password_confirmation ? errors.password_confirmation.message : ""}
                    >
                        <Controller
                            name="password_confirmation"
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="Re-enter your password"
                                    aria-label="Password Confirmation"
                                    size="large"
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
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </Button>
                    </Form.Item>

                    <LoginLink>
                        <Text>Already have an account?</Text>
                        <Link to="/login">
                            <Button type="link" style={{ padding: 0 }}>
                                Login
                            </Button>
                        </Link>
                    </LoginLink>
                </Form>
            </RegisterCard>
        </RegisterContainer>
    );
}
