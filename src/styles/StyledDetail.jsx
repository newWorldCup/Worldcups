import styled from 'styled-components';

export const WorldcupGame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0px;
  gap: 30px;
`;

export const WorldcupTitle = styled.h2`
  font-size: 24px;
`;

export const WorldcupVideoList = styled.div`
  display: flex;
  gap: 10px;
`;

export const WorldcupVideo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const WorldcupVideoTitle = styled.p`
  font-size: 18px;
`;

export const WorldcupSeletButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--main-color);
  }
`;
