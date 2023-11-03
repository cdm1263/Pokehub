import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/home/home';
import Layout from '@/components/Layout';
import Detail from './components/detail/Detail';

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
