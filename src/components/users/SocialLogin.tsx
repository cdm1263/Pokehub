import { MouseEvent } from 'react';
import { app } from '@/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signOut,
} from 'firebase/auth';
import styles from './SocialLogin.module.scss';
import useUserStore from '@/store/useUsersStore';

interface SocialLoginProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SocialLogin = ({ isOpen, setIsOpen }: SocialLoginProps) => {
  const auth = getAuth(app);

  const { user, setUser } = useUserStore();

  const onlLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    let name = target.name;

    if (!name) {
      const button = target.closest('button');
      name = button ? button.name : '';
    }

    let provider;

    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    } else {
      console.error('지원하지 않는 로그인 방식입니다.');
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      setIsOpen(false);
      console.log('로그인 성공:', result);
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  const onLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('로그아웃');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <>
      {user ? (
        <>
          <div className={styles.socialLogin}>
            <div className={styles.socialLogin__loginButton}>내 정보</div>
            <div
              className={`${styles.socialLogin__dropdown} ${
                isOpen ? styles.socialLogin__dropdown__visible : ''
              }`}
            >
              <button
                type="button"
                className={styles.socialLogin__dropdown__button__mypage}
                onClick={() => {}}
              >
                마이페이지
              </button>
              <button
                type="button"
                className={styles.socialLogin__dropdown__button__logout}
                onClick={onLogout}
              >
                로그아웃
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.socialLogin}>
            <div className={styles.socialLogin__loginButton}>로그인</div>
            <div
              className={`${styles.socialLogin__dropdown} ${
                isOpen ? styles.socialLogin__dropdown__visible : ''
              }`}
            >
              <button
                type="button"
                className={styles.socialLogin__dropdown__button}
                name="google"
                onClick={onlLogin}
              >
                <img
                  className={styles.socialLogin__icon}
                  src="/src/assets/socialLoginIcons/google_icon.svg"
                  alt="구글 로그인"
                />
              </button>
              <button
                type="button"
                className={styles.socialLogin__dropdown__button}
                name="github"
                onClick={onlLogin}
              >
                <img
                  className={styles.socialLogin__icon}
                  src="/src/assets/socialLoginIcons/github_icon.svg"
                  alt="깃허브 로그인"
                />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SocialLogin;
