import { useNavigate, useParams } from "react-router-dom"
import { UserDetail } from "../components/UserDetail";

export const UserDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const userId = id ? parseInt(id, 10) : 0;

    const handleEdit = () => {
        navigate(`/users/${userId}/edit`);
    };

    const handleBack = () => {
        navigate('/users');
    };

    // user_idが存在していない場合
    if(!userId){
        return <div>ユーザーIDが存在しません</div>;
    }

    return (
        <UserDetail
            userId={userId}
            onEdit={handleEdit}
            onBack={handleBack}
        />
    );
}