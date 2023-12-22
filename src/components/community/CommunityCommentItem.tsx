/* eslint-disable @typescript-eslint/no-explicit-any */
import useUserStore from '@/store/useUsersStore';
import styles from './CommunityCommentItem.module.scss';
import { FormEvent, useEffect, useState } from 'react';
// import useCommunityDataList from '@/hook/useCommunityDataList';
import { addReplies, deleteCommunity } from '@/lib/firebaseQueryCommunity';
import useCommunityDataList from '@/hook/useCommunityDataList';
import CommunityCommentItemReply from './CommunityCommentItemReply';
import { ConvertTimes } from '@/lib/util/convertTime';
// import CommunityCommentItemReply from './CommunityCommentItemReply';

interface CommunityData {
  id: string;
  category: string;
}
const CommunityCommentItem = ({ value, id }: any) => {
  // const replyData = Object.values(value.replies);
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('댓글을 작성해주세요.');
  const [toggleReplies, setToggleReplies] = useState(false);
  const [replyList, setReplyList] = useState<CommunityData[]>([]);

  const communityId = id;

  /** 대댓글 내용 받아오기 */
  const { repliesList } = useCommunityDataList(
    `/community/${communityId}/comments/${value.id}/replies`,
  );

  /** 최초 대댓글 리스트 감지  */
  useEffect(() => {
    setReplyList(repliesList);
  }, [repliesList]);

  /** 댓글 내용 상태 */
  const handleChangeComment = (e: any) => {
    setComment(e.target.value);
    console.log(`댓글 내용 ${e.target.value}`);
  };

  /** 게시글 추가 기능 */
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

      await addReplies(
        `community/${communityId}/comments/${value.id}/replies/`,
        newComment,
      );

      setReplyList(
        (prevComments: CommunityData[]) =>
          [newComment, ...prevComments] as CommunityData[],
      );
      console.log('Community List:', replyList);
      setComment('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setToggleReplies(false);
    }
  };

  /** 대댓글 토글 버튼 기능 */
  const toggleHandler = () => {
    setToggleReplies((prevToggleReplies) => !prevToggleReplies);
  };

  /** 대댓글 삭제 기능 */
  const onDelete = async (item: any) => {
    const confirm = window.confirm('해당 글을 삭제하시겠습니까?');
    console.log('대댓글 삭제 요청', item.id);

    if (confirm && user?.uid) {
      try {
        await deleteCommunity(
          `community/${communityId}/comments/${value.id}/replies/${item.id}`,
        );
        console.log(
          '대댓글이 삭제 되었습니다.',
          `community/${communityId}/comments/${value.id}/replies/${item.id}`,
        );
        setReplyList(replyList.filter((comment) => comment.id !== item.id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoBox}>
        <div className={styles.userBox}>
          <div className={styles.usersImg}>
            {/* <img src={`/${value.userImg}`} /> */}
          </div>
          <div>{value.userName}</div>
        </div>
        {/* 내 댓글만 보이도록 처리 */}
        <div className={styles.userBox}>
          <div>
            <ConvertTimes data={value.createdAt} />
          </div>
          {/* 게시물ID와 로그인한ID가 true이면 표시 */}
          {value.id && user?.uid ? (
            <div style={{ display: 'flex', gap: '6px' }}>
              <div
                onClick={() => {
                  toggleHandler();
                }}
              >
                대댓글
              </div>
              <div>수정</div>
              <div>삭제</div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={styles.commentTextBox}>{value.description}</div>
      {/* 대댓글 추가 영역 */}
      {loading ? <div>등록 중..</div> : ''}
      {toggleReplies === true ? (
        <form onSubmit={onSubmit}>
          <div className={styles.formBox}>
            <div className={styles.replyIcon}>L</div>
            <div className={styles.commentTextBox}>
              <textarea
                onChange={handleChangeComment}
                placeholder="대댓글을 입력해주세요."
              />
            </div>
          </div>
          <div className={styles.commentButtonBox}>
            <button className={styles.ButtonStyle} type="submit">
              저장
            </button>
          </div>
        </form>
      ) : (
        ''
      )}
      {/* 대댓글 리스트 영역 */}
      {replyList?.map((val: any) => (
        <>
          <button onClick={() => onDelete(val)}>대댓글 삭제</button>
          <CommunityCommentItemReply data={val} />
        </>
      ))}
    </div>
  );
};

export default CommunityCommentItem;
