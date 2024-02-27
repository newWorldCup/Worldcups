import styled from 'styled-components';

export const InputDiv = styled.div`
  margin: 10px 0px;
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
  max-width: 1400px;
  opacity: 1;
  gap: 10px;
  margin-bottom: 20px;
  -webkit-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  :hover {
    filter: brightness(50%);
  }
`;

export const BoxDiv = styled.div`
  border: 1px solid blue;
  border-radius: 5px;
  width: 200px;
  height: 250px;
  margin: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const InfoDiv = styled.div`
  opacity: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;
`;
