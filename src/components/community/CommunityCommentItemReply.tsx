import styles from './CommunityCommentItemReply.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommunityCommentItemReply = ({ data }: any) => {
  const value = data;

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <div className={styles.infoBox}>
          {/* 로그인 상태에서 대댓글 보이도록 처리 */}
          <div className={styles.userEditBox}>
          </div>
        </div>
        <div className={styles.commentTextBox}>{value.description}</div>
      </div>
    </div>
  );
};

export default CommunityCommentItemReply;
