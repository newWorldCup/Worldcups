import styled from 'styled-components';

export const EntireDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  & h1 {
    font-size: 25px;
    font-weight: 550;
  }
`;

export const TitleForm = styled.form`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & input {
    width: 350px;
    height: 40px;
    border: 3px solid #bfbfbf;
    padding-left: 10px;
  }
  & input:focus {
    outline: none;
  }
  & button {
    width: 70px;
    height: 40px;
    color: #52606d;
    font-size: 16px;
    font-weight: 550;
    border: 3px solid #bfbfbf;
    border-radius: 3px;
    &:hover {
      background-color: #bfbfbf;
    }
    & button:focus {
      outline: none;
    }
  }
`;

export const WorldCupTitleForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
  gap: 8px;
  color: #52606d;
  & div {
    display: flex;
    gap: 10px;
    & span {
      font-weight: 550;
      font-size: 17px;
      color: #3e4c59;
    }
    & input {
      border-top: none;
      border-right: none;
      border-left: none;
      font-size: 16px;
      width: 150px;
    }
    & input:focus {
      outline: none;
    }
  }
  & button {
    margin: 0 5px 0 10px;
    width: 110px;
    height: 30px;
    border: 2px solid #bfbfbf;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 550;
    color: #52606d;
    &:hover {
      background-color: #dcdcde;
    }
  }
`;

export const MakeWorldCupDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 1400px;
  border-bottom: 2px solid #52606d;
  height: fit-content; /* 내부 컨텐츠에 맞게 높이 조정 */
`;

export const CandidatesvideosDiv = styled.div`
  height: 200px;
  width: 100%;
  max-width: 1400px;
  color: #52606d;
  display: flex;

  flex-direction: column;
  justify-content: space-evenly;
`;

export const CandidateTitle = styled.div`
  display: flex;
  gap: 10px;
  & p {
    margin-left: 30px;
    font-weight: 550;
    font-size: 25px;
  }
  & button {
    width: 80px;
    height: 25px;
    margin-top: 1px;
    border: none;
    border-radius: 3px;
    &:hover {
      background-color: #bfbfbf;
    }
  }
`;

export const CandidatesBodyDiv = styled.div`
  overflow-x: auto;
  width: 1400px;
  display: flex;

  & div {
    height: 130px;
    display: flex;
    align-items: center;
    flex-direction: row;
    max-height: 200px;
    margin-right: 15px;

    & button {
      width: 20px;
      margin: 0px;
      margin-right: 15px;
      background-color: #f00;
      border-radius: 3px;
      color: white;
      border: 0;
      padding: 3px 5px;
    }
  }
  & div > img {
    width: 150px;
    height: 100px;
    border-radius: 5px;
    border: 3px solid #bfbfbf;
  }
`;

export const SearchedListDiv = styled.div`
  width: 100%;
  max-width: 1400px;
  margin-top: 20px;
  padding: 0 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const SearchedVideoDiv = styled.div`
  gap: 10px;
  width: 320px;
  height: 330px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px 10px 10px 10px;
  & button {
    width: 200px;
    height: 40px;
    font-size: 16px;
    color: white;
    background-color: var(--main-color);
    border: none;
    border-radius: 5px;
    margin: 5px 0;
    padding: 8px 0;
    cursor: pointer;
    &:hover {
      background-color: #dcdcde;
    }
  }
`;
export const YouTubeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 300px;
  color: inherit;
  gap: 10px;
  &:hover {
    color: #52606d;
  }
  & p {
    text-align: center;
    line-height: 1.3;
    height: 40px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
