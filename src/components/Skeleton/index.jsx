import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <>
    <ContentLoader viewBox='0 0 690 110' height={90} width={400} {...props}>
      <rect x='110' y='0' rx='50' ry='50' width='400' height='100' />
      <circle cx='48' cy='48' r='48' />
    </ContentLoader>

    <ContentLoader viewBox='0 0 690 110' height={90} width={400} {...props}>
      <rect x='110' y='0' rx='50' ry='50' width='400' height='100' />
      <circle cx='48' cy='48' r='48' />
    </ContentLoader>

    <ContentLoader viewBox='0 0 690 110' height={90} width={400} {...props}>
      <rect x='110' y='0' rx='50' ry='50' width='400' height='100' />
      <circle cx='48' cy='48' r='48' />
    </ContentLoader>
  </>
);

export default Skeleton;
