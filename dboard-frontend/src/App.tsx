
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { ConfigProvider } from 'antd';
import jaJP from 'antd/locale/ja_JP';
import { AuthProvider } from './features/auth/contexts/AuthContext';
import { AppRouter } from './routers/AppRouter';

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
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
