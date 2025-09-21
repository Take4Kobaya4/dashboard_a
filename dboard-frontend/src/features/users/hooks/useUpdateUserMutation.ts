import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../apis/userApi";


export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: {
            id: number;
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
        }) => userApi.updateUser(userData.id, userData),
        onSuccess: (data, variables) => {
            // users[id]のクエリを更新
            queryClient.setQueryData(['users', variables.id], data);
            // usersのクエリを無効化
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
}