import ContentLoader from 'react-content-loader';

const EvolutionImgSkeleton = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={141}
        height={141}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="2" ry="2" width="141" height="141" />
      </ContentLoader>
    </>
  );
};

export default EvolutionImgSkeleton;
