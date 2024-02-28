import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

// 온클릭했을때 불리언을 true
// 메인에서 스테이트를 잡아서 비디오로 넘겨주기

const Video = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const video = document.getElementById('video');
    if (!video) return;

    video.play(); // 비디오 재생

    const onEnd = () => {
      setIsVisible(false);
    }; // 비디오 종료 시 실행될 함수
    video.addEventListener('ended', onEnd);

    return () => video.removeEventListener('ended', onEnd);
  }, []);

  return isVisible ? (
    <StyledVideoInHome>
      <VideoWrap>
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
  z-index: 100;
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
  transform: translateX(-50%, -50%);
  @media all and (max-width: 1920px) {
    width: 100%;
    height: auto;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
  }
`;
