import CommunityTextEditor from '@/components/community/CommunityTextEditor';
import CommunityLayout from './CommunityLayout';
import CommunityTitle from '@/components/community/CommunityTitle';
import CommunityDetailLayout from '@/components/community/CommunityDetailLayout';

const PostEditPage = () => {
  return (
    <CommunityLayout>
      <CommunityTitle title={'글 수정'} />
      <CommunityDetailLayout>
        <CommunityTextEditor />
      </CommunityDetailLayout>
    </CommunityLayout>
  );
};

export default PostEditPage;
