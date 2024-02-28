import styled from 'styled-components';

export const ProfileTitle = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
  & p{
    font-size: 36px;
    font-weight: 700;
    padding: 50px;
    border: 1px solid #000;
    border-radius: 15px;
  }
`

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
  width: 100%;
`;

export const MyPageTitle = styled.p`
  font-size: 30px;
  margin-bottom: 50px;
`;
export const MainColorSpan = styled.span`
  color: var(--main-color);
`;

export const VideoContainer = styled.div`
  width: 640px;
`;

export const DeleteBtn = styled.button`
  margin-bottom: 50px;
  padding: 15px 20px;
  background-color: #ff0000;
  border: 0;
  color: #fff;
  margin-left: 550px;
`;

export const VideoTitle = styled.h2`
  width: 100%;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: var(--main-color);
  padding: 30px;
  color: #fff;
`;

export const MakeWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  gap: 30px;
  user-select: none;

  & p{
    font-size: 30px;
    font-weight: 700;
  }
  & button{
    padding: 15px 30px;
    border: 0;
    background-color: #f00;
    font-size: 20px;
    color: white;
    cursor: pointer;
  }
`