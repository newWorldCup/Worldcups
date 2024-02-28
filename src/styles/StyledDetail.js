import styled from 'styled-components';

export const WorldcupGame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0px;
  gap: 40px;
`;

export const WorldcupTitle = styled.h2`
  font-size: 30px;
`;

export const WorldcupVideoList = styled.div`
  display: flex;
  gap: 10px;
`;

export const WorldcupVideo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 640px;
  gap: 20px;
  justify-content: space-between;
`;

export const WorldcupVideoTitle = styled.p`
  font-size: 18px;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding: 0px 20px;
  text-align: center;
  line-height: 1.4;
`;

export const WorldcupSelectButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--main-color);
  }
`;
