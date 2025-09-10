
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
import { ROUTES } from './shared/utils/constants';

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
    <ConfigProvider locale={jaJP} >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
              <Routes>
                {/* パブリックルート */}
                <Route path={ROUTES.LOGIN} element={<LoginPage />}/>
                <Route path={ROUTES.REGISTER} element={<RegisterPage />}/>
                {/* 保護ルート */}
                <Route path={ROUTES.USERS} element={
                  <ProtectedRoute>
                    <UserListPage />
                  </ProtectedRoute>
                } />
              </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
