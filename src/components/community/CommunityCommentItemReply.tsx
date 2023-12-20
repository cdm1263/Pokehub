import { ConvertTimes } from '@/lib/utill/convertTime';
import styles from './CommunityCommentItemReply.module.scss';
import useUserStore from '@/store/useUsersStore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommunityCommentItemReply = ({ data }: any) => {
  const { user } = useUserStore();
  const value = data;

  return (
    <div className={styles.container}>
      <div className={styles.replyIcon}>L</div>
      <div className={styles.innerBox}>
        <div className={styles.infoBox}>
          <div className={styles.userBox}>
            <div className={styles.usersImg}>
              {/* <img src={`/${value.userImg}`} /> */}
            </div>
            <div>{value.userName}</div>
          </div>
          {/* 로그인 상태에서 대댓글 보이도록 처리 */}
          <div className={styles.userEditBox}>
            <div>
              <ConvertTimes data={value.createdAt} />
            </div>
            {value.id && user?.uid ? (
              <div style={{display : "flex", gap: "6px"}}>
                <div>수정</div>
                <div>삭제</div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={styles.commentTextBox}>{value.description}</div>
      </div>
    </div>
  );
};

export default CommunityCommentItemReply;
