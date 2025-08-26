import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input, message, Space, Typography } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { CreateUserData } from "../types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../validation/userValidation";
import { userApi } from "../apis/userApi";
import { Layout } from "../../../shared/components/Layout";


const { Title, Text } = Typography;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;

const FormItem = styled.div`
    margin-bottom: 16px;

    label {
        display: block;
        margin-bottom: 4px;
        font-weight: bold;
    }
`;

const ErrorText = styled(Text)`
    color: #ff4d4f;
    font-size: 12px;
`;

const FormCard = styled.div`
    max-width: 600px;
`;

export const UserCreatePage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    // ユーザー作成
    const createUserMutation = useMutation({
        mutationFn: userApi.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users']});
            message.success('ユーザーを作成しました');
            navigate('/users');
        },
        onError: () => {
            message.error('ユーザーの作成に失敗しました');
        },
    });

    const onSubmit = async (data: CreateUserData) => {
        await createUserMutation.mutateAsync(data);
    };

    return (
        <Layout>
            <Header>
                <Space>
                    <Button
                        onClick={() => navigate('/users')}
                    >
                        戻る
                    </Button>
                    <Title level={2} style={{ margin: 0 }}>
                        ユーザー新規作成
                    </Title>
                </Space>
            </Header>

            <FormCard title="ユーザー情報入力">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem>
                        <label>名前 *</label>
                        <Input
                            {...register("name")}
                            placeholder="名前を入力してください"
                            status={errors.name ? "error" : ""}
                        />
                        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                    </FormItem>

                    <FormItem>
                        <label>メールアドレス *</label>
                        <Input
                            {...register("email")}
                            placeholder="メールアドレスを入力してください"
                            status={errors.email ? "error" : ""}
                        />
                        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                    </FormItem>

                    <FormItem>
                        <label>パスワード *</label>
                        <Input.Password
                            {...register("password")}
                            placeholder="パスワードを入力してください"
                            status={errors.password ? "error" : ""}
                        />
                        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                    </FormItem>

                    <FormItem>
                        <label>パスワード確認 *</label>
                        <Input.Password
                            {...register("password_confirmation")}
                            placeholder="パスワード確認を入力してください"
                            status={errors.password_confirmation ? "error" : ""}
                        />
                        {errors.password_confirmation && <ErrorText>{errors.password_confirmation.message}</ErrorText>}
                    </FormItem>

                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            作成
                        </Button>
                        <Button
                            onClick={() => navigate('/users')}
                        >
                            キャンセル
                        </Button>
                    </Space>
                </form>
            </FormCard>
        </Layout>
    );
}

