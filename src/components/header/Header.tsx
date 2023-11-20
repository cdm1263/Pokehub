import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
import SocialLogin from '../users/SocialLogin';
import { FaRegAddressCard } from 'react-icons/fa6';
import { BsFilePlus } from 'react-icons/bs';
import { RiUserVoiceFill } from 'react-icons/ri';
import { FiLogIn } from 'react-icons/fi';
import { FormEvent, useState } from 'react';
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('기능 준비 중 입니다.');
  };

  return (
    <>
      <header className={styles.main__header}>
        <div className={styles.header__section}>
          <div>
            <Link to="/" className={styles.logo}>
              <img
                src="https://github.com/side-project-cdmnkh/my-pokemon/assets/115094069/fd0a37a3-f3ba-479c-a3f2-f58f55e0286c"
                alt="logo"
                width={132}
                height={59}
              />
            </Link>
            <div className={styles.menu__group}>
<<<<<<< Updated upstream
              <form className={styles.main__search} onSubmit={onSubmit}>
                <label className={styles.search__inner}>
                  <input
                    type="text"
                    placeholder="검색어를 입력해주세요."
                    className={styles.main__search__bar}
                  />
                  <button type="submit" className={styles.search__btn}>
                    <img src="/src/assets/search_icon.png" alt="" />
                  </button>
                </label>
              </form>
              <nav className={styles.nav__box}>
=======
<<<<<<< Updated upstream
              <nav className={styles.nav__box}>
                <div>
                  <Link to="/">도감</Link>
                </div>
                <div>
                  <Link to={`/pokemon/${1}`}>카드 제작</Link>
=======
              <form className={styles.main__search} onSubmit={onSubmit}>
                <label className={styles.search__inner}>
                  <input
                    type="text"
                    placeholder="검색어를 입력해주세요."
                    className={styles.main__search__bar}
                  />
                  <button type="submit" className={styles.search__btn}>
                    <img src="/src/assets/search_icon.png" alt="" />
                  </button>
                </label>
              </form>
              <nav className={styles.nav__box}>
>>>>>>> Stashed changes
                <Link to="/">
                  <div className={styles.nav__item}>
                    <FaRegAddressCard />
                    도감
                  </div>
                </Link>
                <Link to={`/pokemon/${1}`}>
                  <div className={styles.nav__item}>
                    <BsFilePlus />
                    카드 제작
                  </div>
                </Link>
                <Link to={`/pokemon/${1}`}>
                  <div className={styles.nav__item}>
                    <RiUserVoiceFill />
                    커뮤니티
                  </div>
                </Link>
                <div className={styles.nav__item} onClick={toggleDropdown}>
                  <FiLogIn />
                  <SocialLogin isOpen={isOpen} setIsOpen={setIsOpen} />
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
