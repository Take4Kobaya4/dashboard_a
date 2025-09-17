import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { Layout } from "../shared/components/layout/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserListPage } from "../features/users/pages/UserListPage";

export const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                {/* 認証が必要なルート */}
                <Route path="/users" element={
                    <ProtectedRoute>
                        <Layout>
                            <UserListPage />
                        </Layout>
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}