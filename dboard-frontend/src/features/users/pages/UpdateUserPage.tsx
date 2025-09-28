import { useNavigate, useParams } from "react-router-dom";
import { useUserQuery } from "../hooks/useUserQuery";
import { useUpdateUserMutation } from "../hooks/useUpdateUserMutation";
import { API_ENDPOINTS } from "../../../shared/constants/navigation";
import { UpdateUserForm } from "../components/UpdateUserForm";
import { Alert, Box } from "@mui/material";
import type { UpdateUserData } from "../types/user";


export const UpdateUserPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const userId = id ? parseInt(id, 10) : 0;

    const { data: user, isLoading, error } = useUserQuery(userId);
    const updateUserMutation = useUpdateUserMutation();

    const handleSubmit = async(data: UpdateUserData) => {
        try {
            const updateData = {
                id: userId,
                name: data.name,
                email: data.email,
                // パスワードとパスワード確認は、入力されている場合のみトリムして含める。
                // 入力されていない場合は空文字列を送信し、mutateAsyncの型要件を満たす。
                password: data.password ? data.password.trim() : '',
                password_confirmation: data.password_confirmation ? data.password_confirmation.trim() : '',
            };
            await updateUserMutation.mutateAsync(updateData);
            navigate(API_ENDPOINTS.USERS.LIST);
        } catch(error) {
            console.error('ユーザー情報更新に失敗しました', error);
        }
    }

    if(!userId){
        return <Alert severity="error">無効なユーザーID</Alert>;
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                Loading...
            </Box>
        );
    }

    if(error || !user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                ユーザー情報を取得できません
            </Box>
        );

    }

    return (
        <UpdateUserForm
            user={user}
            onSubmit={handleSubmit}
            loading={updateUserMutation.isPending}
            error={error}
        />
    );
}