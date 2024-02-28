import styled from 'styled-components';
export const StyledVideoInHome = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow: hidden;
  background-color: black;
`;

export const VideoWrap = styled.div`
  /* position: relative;
  height: 100%;
  overflow: hidden; */
`;

export const Styledvideo = styled.video`
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

export const CloseButton = styled.button`
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
