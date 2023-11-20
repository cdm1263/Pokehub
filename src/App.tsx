import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/Layout';
import Detail from './pages/detail.tsx/detail';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './query/queryClient';
import Dex from './pages/dex/Dex';

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dex />} />
            <Route path="/pokemon/:id" element={<Detail />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
