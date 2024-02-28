import React from 'react';
import SearchList from 'components/HomeComponents/SearchList';
import { BodyDiv } from 'styles/StyledMain';
import Video from './Video';
const Main = () => {
  return (
    <BodyDiv>
      <Video />
      <SearchList />
    </BodyDiv>
  );
};

export default Main;
