import { Button, Card, Form, Input, Typography } from "antd";
import styled from "styled-components";
import { useRegister } from "../hooks/useRegister";
import { useForm, Controller } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/utils/constants";


const { Title } = Typography;

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const StyledCard = styled(Card)`
    width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled(Title)`
    text-align: center;
    margin-bottom: 32px !important;
`;

const StyledButton = styled(Button)`
    width: 100%;
    height: 45px;
`;

const LinkContainer = styled.div`
    text-align: center;
    margin-top: 16px;
`;

export const RegisterForm = () => {
    const { mutate: register, isPending } = useRegister();

    const {
        control,
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

    const onSubmit = (data: RegisterFormData) => {
        register(data);
    };

    return (
        <RegisterContainer>
            <StyledCard>
                <FormTitle level={2}>Register</FormTitle>
                <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                    <Form.Item
                        label="名前"
                        validateStatus={errors.name ? 'error' : ''}
                        help={errors.name?.message}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="名前を入力"
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="メールアドレス"
                        validateStatus={errors.email ? 'error' : ''}
                        help={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="メールアドレスを入力"
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="パスワード"
                        validateStatus={errors.password ? 'error' : ''}
                        help={errors.password?.message}
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="パスワードを入力"
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="パスワード確認"
                        validateStatus={errors.password_confirmation ? 'error' : ''}
                        help={errors.password_confirmation?.message}
                    >
                        <Controller
                            name="password_confirmation"
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="パスワードを再入力"
                                    size="large"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item>
                        <StyledButton
                            type="primary"
                            htmlType="submit"
                            loading={isPending}
                            size="large"
                        >
                            Register
                        </StyledButton>
                    </Form.Item>
                </Form>

                <LinkContainer>
                    既にアカウントをお持ちの方は
                    <Link to={ROUTES.LOGIN}>ログイン</Link>
                </LinkContainer>
            </StyledCard>
        </RegisterContainer>
    );
}