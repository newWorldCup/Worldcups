import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

// 온클릭했을때 불리언을 true
// 메인에서 스테이트를 잡아서 비디오로 넘겨주기

const Video = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isPlayed = sessionStorage.getItem('played');
    if (!isPlayed) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';

      const video = document.getElementById('video');
      if (!video) return;

      const onEnd = () => {
        sessionStorage.setItem('played', 'true');
        setIsVisible(false);
        document.body.style.overflow = 'auto';
      };

      video.addEventListener('ended', onEnd);

      return () => {
        video.removeEventListener('ended', onEnd);
        document.body.style.overflow = 'auto';
      };
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    document.body.style.overflow = 'auto';
    sessionStorage.setItem('played', 'true');
  };

  return isVisible ? (
    <StyledVideoInHome>
      <VideoWrap>
        <CloseButton onClick={handleClose}>✕</CloseButton>
        <Styledvideo id="video" autoPlay controls muted playsInline>
          <source src="/videos/To_my.mp4" type="video/mp4" />
        </Styledvideo>
      </VideoWrap>
    </StyledVideoInHome>
  ) : null;
};

export default Video;

const StyledVideoInHome = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow: hidden;
  background-color: black;
`;

const VideoWrap = styled.div`
  /* position: relative;
  height: 100%;
  overflow: hidden; */
`;

const Styledvideo = styled.video`
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  top: 0;
  left: 0;
  border: none;
  transform: translateX(-50%, -50%);
  @media all and (max-width: 1920px) {
    width: 100%;
    height: auto;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  color: var(--sub-color-darkgrey2);
  font-size: 30px;
  cursor: pointer;
  z-index: 2000;
`;
