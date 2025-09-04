import { Button, message, Popconfirm, Space, Table, Tag, Typography } from "antd";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type Key } from "react";
import { userApi } from "../apis/userApi";
import type { User } from "../types/user";
import { Layout } from "../../../shared/components/Layout";
const { Title } = Typography;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;

const StatsContainer = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
`;

const StatCard = styled.div`
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 6px;
    padding: 12px 16px;
    min-width: 120px;
`;

export const OnlineUsersPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [selectedRowKeys, setSelectedKeys] = useState<Key[]>([]);

    // オンラインユーザー一覧
    const { data: onlineUsers = [], isLoading, refetch } = useQuery<User[]>({
        queryKey: ['online-users'],
        queryFn: userApi.getOnlineUsers,
        refetchInterval: 30000,  // 30秒ごとに更新
    });

    // 複数オンラインユーザー削除
    const deleteUsersMutation = useMutation({
        mutationFn: (ids: number[]) => userApi.deleteOnlineUsers(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users']});
            queryClient.invalidateQueries({ queryKey: ['online-users']});
            setSelectedKeys([]);
            message.success('ユーザーを削除しました');
        },
        onError: () => {
            message.error('ユーザーの削除に失敗しました');
        }
    });

    const handleBulkDelete = async () => {
        const ids = selectedRowKeys.map(key => Number(key));
        await deleteUsersMutation.mutateAsync(ids);
    }

    const handleRefresh = () => {
        refetch();
        message.success('データを更新しました');
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: '名前',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'メールアドレス',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'ステータス',
            dataIndex: 'is_online',
            key: 'is_online',
            render: (isOnline: boolean) => (
                <Tag color={isOnline ? 'green' : 'default' }>
                    {isOnline ? 'Online' : 'Offline'}
                </Tag>
            ),
        },
        {
            title: '最終ログイン日時',
            dataIndex: 'last_login_at',
            key: 'last_login_at',
            render: (date: string | null) =>
                date ? new Date(date).toLocaleString('ja-JP') : '未ログイン',
        },
        {
            title: 'アクション',
            key: 'action',
            render: (record: User) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => navigate(`/users/${record.id}`)}
                    >
                        Show
                    </Button>
                </Space>
            )
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys: Key[]) => {
            setSelectedKeys(selectedKeys);
        },
    };

    return (
        <Layout>
            <Header>
                <Title level={2} style={{ margin: 0 }}>
                    オンラインユーザー一覧
                </Title>
                <Space>
                    <Button
                        onClick={handleRefresh}
                    >
                        更新
                    </Button>
                    {selectedRowKeys.length > 0 && (
                        <Popconfirm
                            title={`選択した${selectedRowKeys.length}件を削除しますか?`}
                            description="ログイン中のユーザーを削除します。この操作は元に戻せません。"
                            onConfirm={handleBulkDelete}
                            okText="削除"
                            cancelText="キャンセル"
                        >
                            <Button
                                danger
                            >
                                選択削除 ({selectedRowKeys.length})
                            </Button>
                        </Popconfirm>
                    )}
                </Space>
            </Header>

            <StatsContainer>
                <StatCard>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                        {onlineUsers.length}
                    </div>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                        オンラインユーザー数
                    </div>
                </StatCard>
            </StatsContainer>

            <Table
                columns={columns}
                dataSource={onlineUsers}
                loading={isLoading}
                rowKey="id"
                rowSelection={rowSelection}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} 件`,
                }}
                locale={{ emptyText: 'ログイン中のユーザーはいません' }}
            />
        </Layout>
    );
}
