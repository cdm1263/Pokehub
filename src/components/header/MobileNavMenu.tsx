import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegAddressCard } from '@react-icons/all-files/fa/FaRegAddressCard';
import { BsFilePlus } from '@react-icons/all-files/bs/BsFilePlus';
import { RiUserVoiceFill } from '@react-icons/all-files/ri/RiUserVoiceFill';
import { FiLogIn } from '@react-icons/all-files/fi/FiLogIn';
import styles from './Header.module.scss';
import useUserStore from '@/store/useUsersStore';
import SocialLogin from '../users/SocialLogin';
import useUserInfoChangeStore from '@/store/useUserInfoChangeStore';

interface MobileNavMenu {
  props: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    dropdownRef: MutableRefObject<HTMLDivElement | null>;
    toggleDropdown: () => void;
    onClickOutSide: (e: MouseEvent) => void;
  };
}

const MobileNavMenu = ({ props }: MobileNavMenu) => {
  console.log(props);
  const { user } = useUserStore();
  const { imgUrl } = useUserInfoChangeStore();
  const { isOpen, setIsOpen, dropdownRef, toggleDropdown, onClickOutSide } =
    props;

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, [imgUrl, onClickOutSide]);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <nav className={styles.mobile__Navmenu__container} onClick={onClick}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.nav__item__mobile}>
            <FaRegAddressCard size={24} />
            도감
          </div>
        </NavLink>
        <NavLink
          to="cardEdit"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.nav__item__mobile}>
            <BsFilePlus size={24} />
            카드 제작
          </div>
        </NavLink>
        <NavLink
          to="community"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <div className={styles.nav__item__mobile}>
            <RiUserVoiceFill size={24} />
            커뮤니티
          </div>
        </NavLink>

        <div
          className={styles.nav__item__mobile}
          ref={dropdownRef}
          onClick={toggleDropdown}
        >
          {user ? (
            <>
              <div className={styles.nav__profile__img}>
                <img
                  style={{ borderRadius: '50%' }}
                  src={user?.photoURL || undefined}
                  alt="프로필 사진"
                  width={31}
                  height={31}
                />
              </div>
            </>
          ) : (
            <>
              <FiLogIn size={24} />
            </>
          )}

          <SocialLogin isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </nav>
    </>
  );
};

export default MobileNavMenu;
