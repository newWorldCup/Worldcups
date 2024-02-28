import React from 'react';
import { useEffect, useState } from 'react';
import { StyledVideoInHome, VideoWrap, Styledvideo, CloseButton } from '../styles/StyledVideo';
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
