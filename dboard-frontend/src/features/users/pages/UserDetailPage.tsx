import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Descriptions, Popconfirm, Space, Typography, Card, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { userApi } from "../apis/userApi";
import { Layout } from "../../../shared/components/Layout";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";



const { Title } = Typography;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
`;

export const UserDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // ユーザー詳細取得
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['users', id],
        queryFn: () => userApi.getUser(Number(id)),
        enabled: !!id,
    });

    // ユーザー削除
    const deleteUserMutation = useMutation({
        mutationFn: (userId: number) => userApi.deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate('/users');
        },
        onError: () => {
            alert('ユーザーの削除に失敗しました');
        }
    });

    const handleDelete = async() => {
        if(user) {
            await deleteUserMutation.mutateAsync(user.id);
        }
    };

    if(isLoading) {
        return (
            <Layout>
                <LoadingContainer>
                    <LoadingSpinner />
                </LoadingContainer>
            </Layout>
        );
    }

    if(error || !user) {
        return (
            <Layout>
                <Alert
                    message="エラー"
                    description="ユーザー情報の取得に失敗しました"
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
                        onClick={() => navigate('/users')}
                    >
                        戻る
                    </Button>
                    <Title level={3} style={{ margin: 0 }}>
                        ユーザー詳細
                    </Title>
                </Space>
                <Space>
                    <Button
                        type="primary"
                        onClick={() => navigate(`/users/${user.id}/edit`)}
                    >
                        編集
                    </Button>
                    <Popconfirm
                        title="このユーザーを削除しますか？"
                        description="この操作は元に戻せません"
                        onConfirm={handleDelete}
                        okText="削除"
                        cancelText="キャンセル"
                    >
                        <Button
                            danger
                        >
                            削除
                        </Button>
                    </Popconfirm>
                </Space>
            </Header>

            <Card>
                <Descriptions
                    title="ユーザー情報"
                    bordered
                    column={1}
                    size="middle"
                >
                    <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
                    <Descriptions.Item label="名前">{user.name}</Descriptions.Item>
                    <Descriptions.Item label="メールアドレス">{user.email}</Descriptions.Item>
                    <Descriptions.Item label="ステータス">
                        <Tag color={user.is_online ? 'green' : 'default' }>
                            {user.is_online ? 'オンライン' : 'オフライン'}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="最終ログイン日時">
                        {user.last_login_at ? new Date(user.last_login_at).toLocaleString('ja-JP') : '未ログイン'}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </Layout>
    );
}