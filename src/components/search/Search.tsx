import { FormEvent, useState } from 'react';
import styles from './Search.module.scss';
import { useLocation } from 'react-router-dom';
import useSearchInputText from '@/store/useSearchInputText';
import useSelectedStore from '@/store/useSelectedStore';

const SearchInput = () => {
  const location = useLocation();
  const [text, setText] = useState<string>('');
  const { setInputText } = useSearchInputText();
  const { clearSelectedPlate } = useSelectedStore();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputText(text);
    clearSelectedPlate();
    switch (location.pathname) {
      case '/':
        console.log(text);
        break;
      case 'pathname':
        return;
    }
  };

  return (
    <form className={styles.main__search} onSubmit={onSubmit}>
      <label className={styles.search__inner}>
        <input
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          type="text"
          placeholder="검색어를 입력해주세요."
          className={styles.main__search__bar}
        />
        <button type="submit" className={styles.search__btn}>
          <img src="/src/assets/search_icon.png" alt="검색버튼" />
        </button>
      </label>
    </form>
  );
};

export default SearchInput;
