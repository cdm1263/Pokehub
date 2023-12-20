/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from 'react';
import styles from './CommunityComment.module.scss';
import CommunityCommentItem from './CommunityCommentItem';
import useUserStore from '@/store/useUsersStore';
import { addComment, deleteCommunity } from '@/lib/firebaseQueryCommunity';
import useCommunityDataList from '@/hook/useCommunityDataList';

interface CommunityData {
  id: string;
  category: string;
}

const CommunityComment = ({ id }: any) => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('댓글을 작성해주세요.');
  const [communityList, setCommunityList] = useState<CommunityData[]>([]);

  const communityId = id;

  // 댓글 내용 받아오기
  const { commentsList } = useCommunityDataList(`/community/${id.id}/comments`);

  useEffect(() => {
    setCommunityList(commentsList);
  }, [commentsList]);

  const handleChangeComment = (e: any) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (!user?.uid) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const newComment = {
        description: comment,
        userId: user?.uid,
        userName: user?.displayName,
        createdAt: new Date().toISOString(),
        userImg: '회원 가입시 유저이미지를 파이어스토어에 등록한다.',
      };

      await addComment(`community/${communityId.id}/comments/`, newComment);
      console.log('댓글 입력 완료');

      setCommunityList(
        (prevComments: CommunityData[]) =>
          [newComment, ...prevComments] as CommunityData[],
      );
      setComment('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /** 댓글 삭제 기능 */
  const onDelete = async (item: any) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');
    console.log('댓글 삭제 요청');

    // 연속으로 댓글 삽입 후 삭제 버튼을 한번 실행하면 연속으로 작성한 댓글 모두 화면에서 사라짐
    if (confirm && user?.uid) {
      try {
        await deleteCommunity(`community/${communityId.id}/comments/${item.id}`);
        console.log(`community/${communityId.id}/comments/${item.id}`);
        setCommunityList((prevComments) =>
          prevComments.filter((comment) => comment.id !== item.id),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* 댓글 입력 영역 */}
      <div className={styles.commentBox}>
        <div className={styles.commentTitle}>댓글 쓰기</div>
        {loading ? <div>등록 중..</div> : ''}
        <form onSubmit={onSubmit}>
          <div className={styles.commentTextBox}>
            <textarea
              onChange={handleChangeComment}
              placeholder="댓글을 입력해주세요."
            />
          </div>
          <div className={styles.commentButtonBox}>
            <button className={styles.ButtonStyle} type="submit">
              저장
            </button>
          </div>
        </form>
      </div>
      <div className={styles.commentTitle}>댓글</div>
      {/* 댓글 리스트 영역 */}
      {communityList?.map((item) => (
        <>
        {communityId.id && user?.uid ? <button onClick={() => onDelete(item)}>댓글 삭제</button> : '안보여'}
          <CommunityCommentItem
            key={item.id}
            value={item}
            id={communityId.id}
          />
        </>
      ))}
    </div>
  );
};

export default CommunityComment;
