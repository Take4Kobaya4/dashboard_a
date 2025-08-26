
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { ConfigProvider } from 'antd';
import jaJP from 'antd/locale/ja_JP';
import { AuthProvider } from './features/auth/contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { UserListPage } from './features/users/pages/UserListPage';
import { UserDetailPage } from './features/users/pages/UserDetailPage';
import { UserCreatePage } from './features/users/pages/UserCreatePage';
import { UserEditPage } from './features/users/pages/UserEditPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: false,
    }
  }
});

function App() {


  return (
    <ConfigProvider locale={jaJP}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
              <Routes>
                {/* パブリックルート */}
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/register" element={<RegisterPage />}/>
                {/* 保護ルート */}
                <Route path='/users' element={
                  <ProtectedRoute>
                    <UserListPage />
                  </ProtectedRoute>
                }/>
                <Route path="/users/:id" element={
                  <ProtectedRoute>
                    <UserDetailPage />
                  </ProtectedRoute>
                } />
                <Route path="/users/create" element={
                  <ProtectedRoute>
                    <UserCreatePage />
                  </ProtectedRoute>
                }/>
                <Route path='/users/:id/edit' element={
                  <ProtectedRoute>
                    <UserEditPage />
                  </ProtectedRoute>
                } />
                <Route path='/online-users'/>
                <Route path="/" element={
                  <ProtectedRoute>
                    <UserListPage />
                  </ProtectedRoute>
                }/>
              </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
