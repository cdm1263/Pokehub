import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAuth } from '@firebase/auth';
import { app } from '@/firebase';
import DEX from '@/pages/dex/Dex';
import Layout from '@/components/Layout';
import Detail from './pages/detail/detail';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './query/queryClient';
import useAuthState from './provider/authProvider';
import MyPage from './pages/mypage/myPage';
import Card from './pages/card/card';
import RequireAuth from './RequireAuth';
import Redirect from './Redirect';

const App = () => {
  useAuthState();
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    setInit(true);
  }, [auth]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {init ? (
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<DEX />} />
              <Route path="/pokemon/:id" element={<Detail />} />
              <Route
                path="/mypage"
                element={
                  <RequireAuth>
                    <MyPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/cardEdit"
                element={
                  <RequireAuth>
                    <Card />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="*" element={<Redirect />} />
          </Routes>
        ) : (
          <>로딩 중...</>
        )}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
