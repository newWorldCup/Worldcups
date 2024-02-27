import styled from 'styled-components';

export const InputDiv = styled.div`
  margin: 10px 0px;
  font-size: 30px;
`;

export const ContentDiv = styled.div`
  justify-content: flex-start;
  align-items: center;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  max-width: 1890px;
  opacity: 1;
  gap: 10px;
  margin-bottom: 20px;
  -webkit-transition: 0.5s ease-in-out;
  transition: 5s ease-in-out;
  :hover {
    filter: brightness(50%);
  }
`;
export const BoxContentDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BoxDiv = styled.div`
  ${ContentDiv}:hover & {
    opacity: 1;
  }

  border: 1px solid blue;
  border-radius: 5px;
  width: 300px;
  height: 200px;
  margin: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  color: black;
`;

export const InfoDiv = styled.div`
  ${ContentDiv}:hover & {
    opacity: 1;
  }

  font-size: 30px;
  display: block;
  opacity: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;
  color: white;
`;
