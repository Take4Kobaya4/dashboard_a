import { Button, Space, Table, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUsers } from "../hooks/useUsers";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import type { User } from "../types/user";


const { Title } = Typography;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;

export const UserListPage = () => {
    const navigate = useNavigate();

    // ユーザー一覧取得
    const { data , isLoading } = useUsers();

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
            render: (data: string | null) =>
                data ? new Date(data).toLocaleString('ja-JP') : '未ログイン',
        },
        {
            title: 'アクション',
            key: 'action',
            render: (record: User) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => navigate(`/users/${record.id}`)}
                    >
                        詳細
                    </Button>
                </Space>
            ),
        }
    ];
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Header>
                <Title level={2} style={{ margin: 0 }}>
                    ユーザー一覧
                </Title>
                <Space>
                    <Button
                        type="primary"
                        onClick={() => navigate('/users/create')}
                    >
                        新規作成
                    </Button>
                </Space>
            </Header>
            <Table
                columns={columns}
                dataSource={data ?? []}
                loading={isLoading}
                rowKey="id"
                pagination={{ 
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} の ${total} 件`,
                }}
            />
        </> 
    );
}