import Inner from '@/components/Inner';
import Introduce from '@/components/mypage/Introduce';
import Mycard from '@/components/mypage/Mycard';

const myPage = () => {
  return (
    <>
      <Inner>
        <Introduce />
        <Mycard />
      </Inner>
    </>
  );
};

export default myPage;
