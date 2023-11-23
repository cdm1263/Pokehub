import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import SocialLogin from '../users/SocialLogin';
import { FaRegAddressCard } from 'react-icons/fa6';
import { BsFilePlus } from 'react-icons/bs';
import { RiUserVoiceFill } from 'react-icons/ri';
import { FiLogIn } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import useUserStore from '@/store/useUsersStore';
import { useGetAllPokemon } from '@/query/qeuries';
import SearchInput from '../search/Search';
import useUserInfoChangeStore from '@/store/useUserInfoChangeStore';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserStore();
  const { imgUrl } = useUserInfoChangeStore();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useGetAllPokemon(1017);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const onClickOutSide = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
      setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, [imgUrl]);

  return (
    <>
      <header className={styles.main__header}>
        <div className={styles.header__section}>
          <div>
            <Link to="/" className={styles.logo}>
              <img
                src="/src/assets/logo-pokehub.png"
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
                    <FaRegAddressCard size={31} />
                    도감
                  </div>
                </Link>
                <Link to={`/pokemon/${1}`}>
                  <div className={styles.nav__item}>
                    <BsFilePlus size={31} />
                    카드 제작
                  </div>
                </Link>
                <Link to={`/pokemon/${1}`}>
                  <div className={styles.nav__item}>
                    <RiUserVoiceFill size={31} />
                    커뮤니티
                  </div>
                </Link>
                <div
                  ref={dropdownRef}
                  className={styles.nav__item}
                  onClick={toggleDropdown}
                >
                  {user ? (
                    <div style={{ width: '31px', height: '31px' }}>
                      <img
                        style={{ borderRadius: '50%' }}
                        src={user?.photoURL || undefined}
                        alt="프로필 사진"
                        width={31}
                        height={31}
                      />
                    </div>
                  ) : (
                    <FiLogIn size={31} />
                  )}

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
