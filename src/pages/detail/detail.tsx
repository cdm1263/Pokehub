import { lazy } from 'react';
import { Suspense } from 'react';

const Detail = lazy(() => import('@/components/detail/Detail'));

const DetailPage = () => {
  return (
    <>
      <Suspense fallback={<div>로딩 중. . .</div>}>
        <Detail />
      </Suspense>
    </>
  );
};

export default DetailPage;
