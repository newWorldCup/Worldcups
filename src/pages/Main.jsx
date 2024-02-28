import React from 'react';
import SearchList from 'components/HomeComponents/SearchList';
import { BodyDiv, MainTitle } from 'styles/StyledMain';
import Video from './Video';

const Main = () => {
  return (
    <BodyDiv>
      <MainTitle>당신만의 월드컵을 만들고 플레이해보세요!</MainTitle>
      <Video />
      <SearchList />
    </BodyDiv>
  );
};

export default Main;
