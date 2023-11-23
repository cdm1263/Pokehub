// import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { getAuth } from '@firebase/auth';
// import { app } from '@/firebase';
import DEX from '@/pages/dex/Dex';
import Layout from '@/components/Layout';
import Detail from './pages/detail/detail';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './query/queryClient';
import Card from './pages/card/card';
// import useAuthState from './provider/authProvider';
// import useUserStore from './store/useUsersStore';

const App = () => {
  // useAuthState();
  // const auth = getAuth(app);
  // const [init, setInit] = useState<boolean>(false);
  // const { user } = useUserStore();

  // console.log('user', user);

  // useEffect(() => {
  //   setInit(true);
  // }, [auth]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DEX />} />
            <Route path="/pokemon/:id" element={<Detail />} />
            <Route path="/cardEdit" element={<Card />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

// {init ? (
//   <>
//     <Routes>
//       <Route element={<Layout />}>
//         {user ? (
//           <>
//             <Route path="/" element={<DEX />} />
//             <Route path="/pokemon/:id" element={<Detail />} />
//             {/*나중에 프로필 라우터 추가*/}
//           </>
//         ) : (
//           <>
//             <Route path="/" element={<DEX />} />
//             <Route path="/pokemon/:id" element={<Detail />} />
//           </>
//         )}
//       </Route>
//     </Routes>
//   </>
// ) : (
//   <>로딩 중</>
// )}
