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
import useUserStore from './store/useUsersStore';
import MyPage from './pages/mypage/myPage';
import Card from './pages/card/card';

const App = () => {
  useAuthState();
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const { user } = useUserStore();

  useEffect(() => {
    setInit(true);
  }, [auth]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {init ? (
          <>
            <Routes>
              <Route element={<Layout />}>
                {user ? (
                  <>
                    <Route path="/" element={<DEX />} />
                    <Route path="/pokemon/:id" element={<Detail />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/cardEdit" element={<Card />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<DEX />} />
                    <Route path="/pokemon/:id" element={<Detail />} />
                  </>
                )}
              </Route>
            </Routes>
          </>
        ) : (
          <>로딩 중</>
        )}
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
