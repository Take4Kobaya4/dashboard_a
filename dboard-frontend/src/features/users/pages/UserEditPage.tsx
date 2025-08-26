import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Card, Input, message, Space, Spin, Typography } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import type { UpdateUserData } from "../types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "../validation/userValidation";
import { userApi } from "../apis/userApi";
import { useEffect } from "react";
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
        font-weight: 500;
    }
`;

const ErrorText = styled(Text)`
    color: #ff4d4f;
    font-size: 12px;
`;

const FormCard = styled(Card)`
    max-width: 600px;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
`;

export const UserEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateUserData>({
        resolver: zodResolver(updateUserSchema),
    });

    // ユーザー詳細
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user', id],
        queryFn: () => userApi.getUser(Number(id)),
        enabled: !!id,
    });

    // ユーザー更新
    const updateUserMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateUserData}) =>
            userApi.updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', id] });
            message.success('ユーザーを更新しました');
            navigate('/users');
        },
        onError: () => {
            message.error('ユーザーの更新に失敗しました');
        },
    });

    // フォームに初期値を設定
    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                password: '',
            });
        }
    }, [user, reset]);

    const onSubmit = async(data: UpdateUserData) => {
        if(user) {
            // パスワードが空の場合は削除
            const updateData = { ...data };
            if(!updateData.password) {
                delete updateData.password;
            }
            await updateUserMutation.mutateAsync({ id: user.id, data: updateData });
        }
    }

    if(isLoading) {
        return (
            <Layout>
                <LoadingContainer>
                    <Spin size="large" />
                </LoadingContainer>
            </Layout>
        );
    }

    if(error || !user) {
        return (
            <Layout>
                <Alert
                    message="エラー"
                    description="ユーザーの取得に失敗しました"
                    type="error"
                    showIcon
                />
            </Layout>
        );
    }

    return (
        <Layout>
            <Header>
                <Space>
                    <Button
                        onClick={() => navigate(`/users/${user.id}`)}
                    >
                        戻る
                    </Button>
                    <Title level={3} style={{ margin: 0 }}>
                        ユーザー編集
                    </Title>
                </Space>
            </Header>

            <FormCard title="ユーザー情報編集">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem>
                        <label>名前 *</label>
                        <Input
                            {...register('name')}
                            placeholder="名前を入力してください"
                            status={errors.name ? 'error' : ''}
                        />
                        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                    </FormItem>

                    <FormItem>
                        <label>メールアドレス *</label>
                        <Input
                            {...register('email')}
                            placeholder="メールアドレスを入力してください"
                            status={errors.email ? 'error' : ''}
                        />
                        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                    </FormItem>

                    <FormItem>
                        <label>パスワード</label>
                        <Input.Password
                            {...register('password')}
                            placeholder="パスワードを入力してください"
                            status={errors.password ? 'error' : ''}
                        />
                        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                            パスワードを入力しない場合は空白にしてください
                        </Text>
                    </FormItem>

                    <FormItem>
                        <label>パスワード確認</label>
                        <Input.Password 
                            {...register('password_confirmation')}
                            placeholder="パスワードを入力してください"
                            status={errors.password_confirmation ? 'error' : ''}
                        />
                        {errors.password_confirmation && <ErrorText>{errors.password_confirmation.message}</ErrorText>}
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                            確認用パスワードを入力しない場合は空白にしてください
                        </Text>
                    </FormItem>

                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            更新
                        </Button>
                        <Button
                            onClick={() => navigate(`/users/${user.id}`)}
                        >
                            キャンセル
                        </Button>
                    </Space>
                </form>
            </FormCard>
        </Layout>
    );
}