import { db } from '@/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { PokemonInfoProps } from '@/lib/type';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import useUserStore from '@/store/useUsersStore';
import styles from './Comments.module.scss';
import { POKEMON_TYPES } from '@/lib/constants';
import Pagenation from './Pagenation';
interface CommentProps {
  comment: string;
  createdAt: string;
  displayName: string;
  uid: string;
  id: string;
}

const Comments = ({ pokemonState }: PokemonInfoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<CommentProps[]>([]);
  const { user } = useUserStore();

  const { pokemon } = pokemonState;

  const getComments = async () => {
    const commentsRef = collection(
      db,
      'comments',
      `${pokemon?.id}`,
      'pokemonComments',
    );
    const q = query(commentsRef, orderBy('createdAt', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    /*  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; */

    const fetchedComments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CommentProps[];
    setCommentList(fetchedComments);
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

  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className={styles.comments__container}>
        <form onSubmit={onSubmit} className={styles.comments__main}>
          <div className={styles.comments__input__box}>
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
            <span
              className={`${styles.comments__length} ${
                comment.length > 100 ? styles['comments__length__max'] : ''
              }`}
            >
              {comment.length} / 100
            </span>
            <div className={styles.comments__input__btn__box}>
              <input
                type="submit"
                value="댓글 등록"
                disabled={!comment || isLoading || comment.length > 100}
                className={styles.comments__input__btn}
              />
            </div>
          </div>
        </form>
        <ul className={styles.comments__list__inner}>
          {commentList.length > 0 ? (
            commentList.map(({ id, comment, displayName, createdAt, uid }) => {
              const createdDate = formatDate(createdAt);
              return (
                <li key={id} className={styles.comments__list}>
                  <span className={styles.comments__comment__list}>
                    {comment}
                  </span>
                  <div className={styles.comments__right__side}>
                    <span className={styles.comments__list__userName}>
                      {displayName}
                    </span>
                    <span>{createdDate}</span>
                    {uid === user?.uid && (
                      <button
                        className={styles.comments__delete__btn}
                        onClick={() => onDelete(id, uid)}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <>
              <div>댓글이 없습니다.</div>
            </>
          )}
        </ul>
      </div>
      <Pagenation />
    </>
  );
};

export default Comments;
