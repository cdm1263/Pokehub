import { useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { MobileMenuBtn } from './MobileMenuBtn';
import { IoSearchSharp } from '@react-icons/all-files/io5/IoSearchSharp';

const MobileNav = ({
  onToggleSearchBox,
  onToggleNavMenu,
  navOpen,
}: {
  onToggleSearchBox: () => void;
  onToggleNavMenu: () => void;
  navOpen: boolean;
}) => {
  const location = useLocation();

  return (
    <div className={styles.menu__group__mobile}>
      {location.pathname === '/' && (
        <div onClick={onToggleSearchBox}>
          <IoSearchSharp size={18} />
        </div>
      )}

      <div onClick={onToggleNavMenu}>
        <MobileMenuBtn isOpen={navOpen} />
      </div>
    </div>
  );
};

export default MobileNav;
