interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /*   onChangePage: (pageNumber: number) => void; */
  onMoveToPrev: () => void;
  onMoveToNext: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onMoveToPrev,
  onMoveToNext,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} disabled={i === currentPage}>
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <button onClick={onMoveToPrev} disabled={currentPage <= 1}>
        이전
      </button>
      {renderPageNumbers()}
      <button onClick={onMoveToNext} disabled={currentPage >= totalPages}>
        다음
      </button>
    </div>
  );
};

export default Pagination;
