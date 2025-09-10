import { Avatar, Button, Input, Select, Space, Table, Tag, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { useUsers } from "../hooks/useUsers";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { ROUTES } from "../../../shared/utils/constants";
import type { User } from "../types/user";
import type { ColumnsType } from "antd/es/table";
import { formatDate, getStatusColor, getStatusText } from "../../../shared/utils/formatters";
import { LoadingSpinner } from "../../../shared/components/UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
`;

export const UserList = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<boolean | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearch = useDebounce(search, 500);

    const { data: userData, isLoading, error } = useUsers({
        search: debouncedSearch,
        is_online: statusFilter,
        page: currentPage,
        per_page: 10,
    });

    // 削除
    const { confirmDelete, isPending: isDeleting } = useDeleteUser();

    // ユーザー詳細への遷移
    const handleShowUser = (id: number) => {
        navigate(ROUTES.USER_DETAIL.replace(':id', id.toString()));
    }

    // ユーザー編集への遷移
    const handleEditUser = (id: number) => {
        navigate(ROUTES.UPDATE_USER.replace(':id', id.toString()));
    }
    // ユーザー削除の遷移
    const handleDeleteUser = (user: User) => {
        confirmDelete(user.id, user.name);
    }

    // 一覧のカラム
    const columns: ColumnsType<User> = [
        {
            title: '名前',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: User) => (
                <Space>
                    <Avatar size="small" />
                    <div>
                        <div>{name}</div>
                        <div style={{ color: '#666', fontSize: 12 }}>{record.email}</div>
                    </div>
                </Space>
            ),
        },
        {
            title: 'ステータス',
            dataIndex: 'is_online',
            key: 'is_online',
            width: 120,
            render: (is_online: boolean) => (
                <Tag color={getStatusColor(is_online)}>
                    {getStatusText(is_online)}
                </Tag>
            ),
            filters: [
                { text: 'オンライン', value: true },
                { text: 'オフライン', value: false },
            ],
        },
        {
            title: '最終ログイン',
            dataIndex: 'last_login_at',
            key: 'last_login_at',
            width: 180,
            render: (last_login_at: string | null) => formatDate(last_login_at),
        }, 
        {
            title: 'アクション',
            key: 'action',
            width: 120,
            render: (_, record: User) => (
                <Space size="small">
                    <Button
                        size="small"
                        onClick={() => handleShowUser(record.id)}
                    >
                        詳細
                    </Button>
                    <Button
                        size="small"
                        onClick={() => handleEditUser(record.id)}
                    >
                        編集
                    </Button>
                    <Button
                        size="small"
                        danger
                        onClick={() => handleDeleteUser(record)}
                        loading={isDeleting}
                    >
                        削除
                    </Button>
                </Space>
            )
        }
    ];

    if(isLoading) return <LoadingSpinner />;
    if(error) return <div>エラーが発生しました</div>

    return (
        <>
            <HeaderContainer>
                <Title level={2}>ユーザー一覧</Title>
                <Button
                    type="primary"
                    onClick={() => navigate(ROUTES.CREATE_USER)}
                >
                    新規作成
                </Button>
            </HeaderContainer>

            {/* 検索 */}
            <FilterContainer>
                <Search
                    placeholder="名前で絞り込み"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: 300 }}
                />
                <Select
                    placeholder="ステータスで絞り込み"
                    style={{ width: 150 }}
                    onChange={setStatusFilter}
                    value={statusFilter}
                    allowClear
                >
                    <Select.Option value={true}>オンライン</Select.Option>
                    <Select.Option value={false}>オフライン</Select.Option>
                </Select>
            </FilterContainer>

            <Table
                columns={columns}
                dataSource={userData?.data}
                rowKey='id'
                pagination={{ 
                    current: currentPage,
                    pageSize: 10,
                    total: userData?.total,
                    onChange: setCurrentPage,
                    showSizeChanger: false,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} 件`,
                }}
            />
        </>
    );
}


