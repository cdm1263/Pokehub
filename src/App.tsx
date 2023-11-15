import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAuth } from '@firebase/auth';
import { app } from '@/firebase';
import Home from './Home';
import Layout from '@/components/Layout';
import Detail from './pages/detail.tsx/detail';

const App = () => {
  useAuthState();
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const { user } = useUserStore();

  console.log(user);

  useEffect(() => {
    setInit(true);
  }, [auth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
