import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import type { User } from "../../users/types/user";
import { authApi } from "../apis/authApi";

export const useAuth = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    // useGetCurrentUserフックからのデータは、このフックのuseState変数と競合しているため削除します。
    // 代わりに、useEffect内でauthApi.getCurrentUser()を呼び出して認証状態を初期化します。
    const isAuth = !!user; // 認証状態はuseStateの`user`から導出します。

    useEffect(() => {
        const checkAuth = async() => {
            try {
                const currentUser = await authApi.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('認証されていません', error);
            } finally {
                setIsLoading(false);
            }
        }
        checkAuth();
    }, []);

    const login = (user: User) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
        navigate('/login');
    }

    return {
        user,
        isAuth,
        login,
        logout,
        isLoading
    };
}
