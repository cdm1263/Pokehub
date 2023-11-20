import { db } from '@/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { PokemonInfoProps } from '@/lib/type';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import useUserStore from '@/store/useUsersStore';
import styles from './Comments.module.scss';
import { POKEMON_TYPES } from '@/lib/constants';
interface CommentProps {
  comment: string;
  createdAt: string;
  displayName: string;
  uid: string;
  id: string;
}

const Comments = ({ pokemon }: PokemonInfoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<CommentProps[]>([]);
  const { user } = useUserStore();

  const getComments = async () => {
    if (pokemon?.id) {
      const commentsRef = collection(
        db,
        'comments',
        `${pokemon?.id}`,
        'pokemonComments',
      );
      const querySnapshot = await getDocs(commentsRef);
      const fetchedComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CommentProps[];
      setCommentList(fetchedComments);
    }
  };

  useEffect(() => {
    if (pokemon?.id) {
      getComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon?.id]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.uid) {
      alert('로그인이 필요합니다.');
      return;
    }

    setIsLoading(true);

    try {
      await addDoc(
        collection(db, 'comments', `${pokemon?.id}`, 'pokemonComments'),
        {
          comment,
          createdAt: new Date().toISOString(),
          displayName: user?.displayName,
          uid: user?.uid,
        },
      );
      setComment('');
      getComments();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onDelete = async (commentId: string, commentUid: string) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');

    if (confirm && commentUid === user?.uid) {
      await deleteDoc(
        doc(db, 'comments', `${pokemon?.id}`, 'pokemonComments', commentId),
      );
      getComments();
    }
  };

  const type = pokemon?.types?.[0]?.type?.name ?? '기본값';
  const typeColor = POKEMON_TYPES[type];

  console.log(typeColor);

  return (
    <>
      <form onSubmit={onSubmit} className={styles.comments__main}>
        <div>
          <label htmlFor="comment" className={styles.comments__label}>
            댓글
          </label>
          <input
            type="text"
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onCommentChange}
            placeholder={
              user?.uid ? '댓글을 입력해주세요' : '로그인을 해주세요'
            }
            className={`${styles.comments__input__text} ${
              styles[`comments__input__text--${typeColor}`]
            }`}
          />
        </div>
        <div className={styles.comments__input__btn__box}>
          <input
            type="submit"
            value="입력"
            disabled={!comment || isLoading}
            className={styles.comments__input__btn}
          />
        </div>
      </form>
      <ul>
        {commentList.length > 0 ? (
          commentList.map(({ id, comment, displayName, uid }) => (
            <li key={id}>
              {comment} - {displayName}
              {uid === user?.uid && (
                <button onClick={() => onDelete(id, uid)}>삭제</button>
              )}
            </li>
          ))
        ) : (
          <>
            <div>댓글이 없습니다.</div>
          </>
        )}
      </ul>
    </>
  );
};

export default Comments;
