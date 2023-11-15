import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Layout from '@/components/Layout';
import Detail from './pages/detail.tsx/detail';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './query/queryClient';

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<Detail />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
