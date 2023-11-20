import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAuth } from '@firebase/auth';
import { app } from '@/firebase';
import Home from './Home';
import Layout from '@/components/Layout';
import Detail from './pages/detail.tsx/detail';
<<<<<<< Updated upstream
import { QueryClientProvider } from 'react-query';
import { queryClient } from './query/queryClient';
=======
import useAuthState from './provider/authProvider';
import useUserStore from './store/useUsersStore';
>>>>>>> Stashed changes

const App = () => {
  useAuthState();
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const { user } = useUserStore();

  console.log('user', user);

  useEffect(() => {
    setInit(true);
  }, [auth]);

  return (
    <BrowserRouter>
<<<<<<< Updated upstream
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<Detail />} />
          </Route>
        </Routes>
      </QueryClientProvider>
=======
      {init ? (
        <>
          <Routes>
            <Route element={<Layout />}>
              {user ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/pokemon/:id" element={<Detail />} />
                  {/*나중에 프로필 라우터 추가*/}
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/pokemon/:id" element={<Detail />} />
                </>
              )}
            </Route>
          </Routes>
        </>
      ) : (
        <>로딩 중</>
      )}
>>>>>>> Stashed changes
    </BrowserRouter>
  );
};

export default App;
