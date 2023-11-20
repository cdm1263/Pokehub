// useAuthState.ts 수정
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase';
import useUserStore from '@/store/useUsersStore';

const useAuthState = () => {
  const auth = getAuth(app);
  const setUser = useUserStore((state) => state.setUser);
  console.log(auth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth, setUser]);
};

export default useAuthState;
