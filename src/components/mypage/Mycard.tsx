import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.scss';
import { LuPlus } from 'react-icons/lu';

const Mycard = () => {
  const navigate = useNavigate();

  const onMoveMakeCard = () => {
    navigate('/');
  };

  const cardLayout = Array.from({ length: 6 }, (_, index) => (
    <div className={styles.mycard__layout} key={index}>
      <div>
        <LuPlus size={30} />
      </div>
    </div>
  ));

  return (
    <>
      <div className={styles.mycard__container}>
        <div className={styles.mycard__top__box}>
          <div className={styles.mycard__title}>내가 만든 포켓몬 카드</div>
          <div className={styles.mycard__make__btn}>
            <button type="button" onClick={onMoveMakeCard}>
              카드 만들기
            </button>
          </div>
        </div>
        <div className={styles.mycard__layout__box}>{cardLayout}</div>
      </div>
    </>
  );
};

export default Mycard;
