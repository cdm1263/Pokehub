import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <>
      <header className={styles.main__header}>
        <div className={styles.header__section}>
          <div>
            <Link to="/" className={styles.logo}>
              <img
                src="src/assets/logo.png"
                alt="logo"
                width={100}
                height={50}
              />
            </Link>
            <div className={styles.menu__group}>
              <nav className={styles.nav__box}>
                <div>
                  <Link to="/">도감</Link>
                </div>
                <div>
                  <Link to={`/pokemon/${1}`}>카드 제작</Link>
                </div>
              </nav>
              <div className="util__menu">로그인</div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
