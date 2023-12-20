import { useState, useEffect } from 'react';
import { Button } from '../button/Button';
import CommunityCardItem from './CommunityCardItem';
import styles from './CommunityCardList.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import useCommunityDataList from '@/hook/useCommunityDataList';
import useUserStore from '@/store/useUsersStore';

interface CommunityData {
  id: string;
  category: string;
}

const CommunityCardList = () => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(0);
  const [communityList, setCommunityList] = useState<CommunityData[]>([]);
  const [filteredItems, setFilteredItems] = useState<CommunityData[]>([]);
  const { user } = useUserStore();
  const navigate = useNavigate();

  // 파이어스토어 데이터 가져오기
  const { dataList } = useCommunityDataList(`/community`);

  useEffect(() => {
    setCommunityList(dataList);
    setFilteredItems(dataList);
  }, [dataList]);

  const CategoryList = [
    '자유게시판',
    '공지사항',
    '질문/답변',
    '팁/정보',
    '거래게시판',
    '자랑하기',
  ];

  const setTabHandler = (index: number) => {
    setCurrentTab(index);
    const selectedCategory = CategoryList[index];
    const filteredData = communityList.filter(
      (item) => item.category === selectedCategory,
    );
    setFilteredItems(filteredData);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleLoginAlert = () => {
    alert('로그인이 필요합니다.');
    navigate('/community'); // Navigate back to /community
  };

  return (
    <div>
      <div className={styles.CommunityHeader}>
        {CategoryList.map((item, index) => (
          <div
            key={index}
            className={
              index === currentTab
                ? `${styles.CategoryButton} ${styles.Select}`
                : styles.CategoryButton
            }
            onClick={() => {
              setTabHandler(index);
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={styles.container}>
        {currentItems.map((item) => (
          <CommunityCardItem key={item.id} data={item} />
        ))}
      </div>
      <div className={styles.searchWritingBox}>
        <Button data={'검색'} />
        {!user?.uid ? (
          <div onClick={() => handleLoginAlert()}>
            <Button data={'글쓰기'} />
          </div>
        ) : (
          <Link to={'/community/add'}>
            <Button data={'글쓰기'} />
          </Link>
        )}
      </div>
      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={currentPage}
          total={filteredItems.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};

export default CommunityCardList;
