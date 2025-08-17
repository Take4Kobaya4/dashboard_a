import { Button, Card, Form, Input, Typography } from "antd";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import type { RegisterData } from "../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/authValidation";
import { Link } from "react-router-dom";

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
            onSuccess?.();
        } catch {
            console.error("Registration failed");
        }
    }

    return (
        <RegisterContainer>
            <RegisterCard>
                <Title level={2} style={{ textAlign: "center", margin: 0 }}>
                    新規登録
                </Title>
                <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                    <Form.Item
                        label="名前"
                        validateStatus={errors.name ? "error" : ""}
                        help={errors.name ? errors.name.message : ""}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field}) => (
                                <Input
                                    {...field}
                                    placeholder="名前を入力してください"
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="メールアドレス"
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email ? errors.email.message : ""}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="メールアドレスを入力してください"
                                    type="email"
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="パスワード"
                        validateStatus={errors.password ? "error" : ""}
                        help={errors.password ? errors.password.message : ""}
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="パスワードを入力してください"
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="パスワード確認"
                        validateStatus={errors.password_confirmation ? "error" : ""}
                        help={errors.password_confirmation ? errors.password_confirmation.message : ""}
                    >
                        <Controller
                            name="password_confirmation"
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="パスワードを再入力してください"
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
                            会員登録
                        </Button>
                    </Form.Item>

                    <LoginLink>
                        <Text>すでにアカウントをお持ちの方は</Text>
                        <Link to="/login">
                            <Button type="link" style={{ padding: 0 }}>
                                ログイン
                            </Button>
                        </Link>
                    </LoginLink>
                </Form>
            </RegisterCard>
        </RegisterContainer>
    );
}
