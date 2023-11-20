import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import SocialLogin from '../users/SocialLogin';
import { FaRegAddressCard } from 'react-icons/fa6';
import { BsFilePlus } from 'react-icons/bs';
import { RiUserVoiceFill } from 'react-icons/ri';
import { FiLogIn } from 'react-icons/fi';
import { useState } from 'react';
import { useGetAllPokemon } from '@/query/qeuries';
import SearchInput from '../search/Search';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  useGetAllPokemon(1017);

  const toggleDropdown = () => setIsOpen(!isOpen);

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
              <SearchInput />
              <nav className={styles.nav__box}>
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
