import CommunityDetailHeader from '@/components/community/CommunityDetailHeader';
import CommunityComment from '@/components/community/CommunityComment';
import { useParams } from 'react-router-dom';
// import useCommunityDetail from '@/hook/useCommunityDetail';
import CommunityTextViewer from './CommunityTextViewer';
import useCommunityDataList from '@/hook/useCommunityDataList';

const CommunityDetail = () => {
  const currentUrl = useParams();
  // console.log('현재 경로', currentUrl);

  // 현재 postId 값을 useCommunityDetail보내 리스트 요청
  // const { data: cummunity } = useCommunityDetail(currentUrl);
  // console.log('DB확인', cummunity);

  // 게시판 상세 내용 받아오기
  const { dataList } = useCommunityDataList(`/community`);
  // console.log('DB확인', dataList);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any = dataList?.find((item) => item.id === currentUrl.id) || {};
  // console.log('상세내용 자료', value);

  // 대댓글 내용 받아오기

  return (
    <div>
      <CommunityDetailHeader data={value} id={currentUrl} />
      <CommunityTextViewer data={value} />
      <CommunityComment id={currentUrl} />
    </div>
  );
};

export default CommunityDetail;
