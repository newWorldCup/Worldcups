import React from 'react';
import styled from 'styled-components';

const Video = () => {
  return (
    <StyledVideoInHome>
      <Styledvideo autoPlay loop>
        <source src="/videos/To_my.mp4" type="video/mp4" />
        <strong>Your browser does not support the video tag.</strong>
      </Styledvideo>
    </StyledVideoInHome>
  );
};

export default Video;

const StyledVideoInHome = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

const Styledvideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
