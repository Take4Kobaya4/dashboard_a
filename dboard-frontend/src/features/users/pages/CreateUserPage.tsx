import { useNavigate } from "react-router-dom"
import { useCreateUserMutation } from "../hooks/useCreateUserMutation";
import type { CreateUserFormData } from "../validation/userValidation";
import { API_ENDPOINTS } from "../../../shared/constants/navigation";
import { CreateUserForm } from "../components/CreateUserForm";

export const CreateUserPage = () => {
    const navigate = useNavigate();
    const createUserMutation = useCreateUserMutation();

    const handleSubmit = async(data: CreateUserFormData) => {
        try {
            await createUserMutation.mutateAsync(data);
            navigate(API_ENDPOINTS.USERS.LIST);
        } catch (error) {
            console.error('ユーザー登録に失敗しました', error);
        }
    };

    return (
        <CreateUserForm
            onSubmit={handleSubmit}
            loading={createUserMutation.isPending}
            error={createUserMutation.error}
        />
    );
}