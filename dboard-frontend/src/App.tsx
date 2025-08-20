
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { ConfigProvider } from 'antd';
import jaJP from 'antd/locale/ja_JP';
import { AuthProvider } from './features/auth/contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';

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
              </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
