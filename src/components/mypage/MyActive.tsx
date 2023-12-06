import MyLikedPokemon from './MyLikedPokemon';
import styles from './Mypage.module.scss';
const MyActive = () => {
  return (
    <>
      <div className={styles.myactive__total__container}>
        <div className={styles.myactive__left__container}>
          <div className={styles.myactive__posts}></div>
          <div className={styles.myactive__posts__favorite}></div>
        </div>
        <MyLikedPokemon />
      </div>
    </>
  );
};

export default MyActive;
