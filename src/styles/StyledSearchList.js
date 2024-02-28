import styled from 'styled-components';

export const SearchListContainer = styled.div`
  margin-bottom: 30px;
  padding: 0px 20px;
`;

export const InputDiv = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;
  color: black;
  margin: 20px 0px 50px 0px;
  size: 50px;
  font-size: 24px;
`;

export const SearchInput = styled.input`
  font-size: 20px;
  padding: 5px 15px;
  border: 1px solid black;
  border-radius: 5px;
  margin-left: 10px;
  &::placeholder {
      font-size: 16px;  
      color: var(--sub-color-lightgrey);
    }
`;

export const ContentDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
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
  margin-bottom: 20px;
`;

export const BoxDiv = styled.div`
  ${ContentDiv}:hover & {
    opacity: 1;
  }
  border-radius: 10px;
  width: 300px;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  color: black;
`;

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  p {
    font-size: 16px;
    color: var(--sub-color-lightgrey);
  }
  h3 {
    font-size: 20px;
    color: black;
  }
`;
