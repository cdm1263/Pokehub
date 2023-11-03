import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Layout from '@/components/Layout';
import Detail from './pages/detail.tsx/detail';

const App = () => {
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
