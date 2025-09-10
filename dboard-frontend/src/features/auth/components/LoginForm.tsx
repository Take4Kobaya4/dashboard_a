import { Button, Card, Form, Input, Typography } from "antd";
import styled from "styled-components";
import { useLogin } from "../hooks/useLogin";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/utils/constants";


const { Title } = Typography;

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const StyleCard = styled(Card)`
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

export const LoginForm = () => {
    // useMutationのisLoadingプロパティは、TanStackQuery v5でisPendingに名称変更のため、修正
    // lintエラーを修正するため、isPendingを使用します。
    const { mutate: login, isPending } = useLogin();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginFormData) => {
        login(data);
    }

    
    return (
        <LoginContainer>
            <StyleCard>
                <FormTitle level={2}>Login</FormTitle>
                <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
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

                    <Form.Item>
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

                    <Form.Item>
                        <StyledButton
                            type="primary"
                            htmlType="submit"
                            loading={isPending} // isLoadingをisPendingに変更（TanStackQuery）
                            size="large"
                        >
                            {isPending ? 'ログイン中...' : 'ログイン'} {/* isLoadingをisPendingに変更 */}
                        </StyledButton>
                    </Form.Item>
                </Form>

                <LinkContainer>
                    アカウントをお持ちでない方は
                    <Link to={ROUTES.REGISTER}>新規会員登録</Link>
                </LinkContainer>
            </StyleCard>
        </LoginContainer>
    );
}