import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import SocialLogin from '../users/SocialLogin';
import { FaRegAddressCard } from '@react-icons/all-files/fa/FaRegAddressCard';
import { BsFilePlus } from '@react-icons/all-files/bs/BsFilePlus';
import { RiUserVoiceFill } from '@react-icons/all-files/ri/RiUserVoiceFill';
import { FiLogIn } from '@react-icons/all-files/fi/FiLogIn';
import { useEffect, useRef, useState } from 'react';
import useUserStore from '@/store/useUsersStore';
import SearchInput from '../search/Search';
import useUserInfoChangeStore from '@/store/useUserInfoChangeStore';
import MobileNav from './MobileNav';
import MobileSearchBox from './MobileSearchBox';
import MobileNavMenu from './MobileNavMenu';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const location = useLocation();

  const { user } = useUserStore();
  const { imgUrl } = useUserInfoChangeStore();
  const windowWidth = useCalculateInnerWidth();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const onClickOutSide = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
      setIsOpen(false);
  };

  const props = {
    isOpen,
    setIsOpen,
    dropdownRef,
    toggleDropdown,
    onClickOutSide,
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, [imgUrl]);

  useEffect(() => {
    if (searchOpen || navOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [searchOpen, navOpen]);

  useEffect(() => {
    if (windowWidth > 768) {
      setNavOpen(false);
      setSearchOpen(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    setSearchOpen(false);
    setNavOpen(false);
  }, [location]);

  const onToggleSearchBox = () => {
    setNavOpen(false);
    setSearchOpen((prev) => !prev);
  };

  const onToggleNavMenu = () => {
    setSearchOpen(false);
    setNavOpen((prev) => !prev);
  };

  const onCloseOverlay = () => {
    if (searchOpen === true) {
      setSearchOpen(false);
    }

    if (navOpen === true) {
      setNavOpen(false);
    }
  };

  return (
    <>
      <header className={styles.main__header}>
        <div
          className={`${styles.header__section} ${
            navOpen || searchOpen ? styles.open : ''
          }`}
        >
          <div>
            <a href="/" className={styles.logo}>
              <img src="/logo-pokehub.png" alt="logo" />
            </a>
            <div className={styles.menu__group}>
              <SearchInput />
              <nav className={styles.nav__box}>
                <Link to="/">
                  <div className={styles.nav__item}>
                    <FaRegAddressCard size={31} />
                    도감
                  </div>
                </Link>
                <Link to="cardEdit">
                  <div className={styles.nav__item}>
                    <BsFilePlus size={31} />
                    카드 제작
                  </div>
                </Link>
                <Link to="community">
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
                    <div className={styles.nav__profile__img}>
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

            <MobileNav
              onToggleSearchBox={onToggleSearchBox}
              onToggleNavMenu={onToggleNavMenu}
              navOpen={navOpen}
            />
          </div>
        </div>
      </header>
      {searchOpen && (
        <div className={styles.mobile__overlay} onClick={onCloseOverlay}>
          <MobileSearchBox isOpen={setSearchOpen} />
        </div>
      )}
      {navOpen && (
        <div className={styles.mobile__overlay} onClick={onCloseOverlay}>
          <MobileNavMenu props={props} />
        </div>
      )}
    </>
  );
};

export default Header;
