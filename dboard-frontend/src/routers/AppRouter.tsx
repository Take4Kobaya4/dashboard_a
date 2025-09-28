import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { Layout } from "../shared/components/layout/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserListPage } from "../features/users/pages/UserListPage";
import { UserDetailPage } from "../features/users/pages/UserDetailPage";
import { CreateUserPage } from "../features/users/pages/CreateUserPage";

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
                <Route path="/users/:id" element={
                    <ProtectedRoute>
                        <Layout>
                            <UserDetailPage />
                        </Layout>
                    </ProtectedRoute>
                }
                />
                <Route path="/users/create" element={
                    <ProtectedRoute>
                        <Layout>
                            <CreateUserPage />
                        </Layout>
                    </ProtectedRoute>
                }
                />
            </Routes>
        </BrowserRouter>
    );
}