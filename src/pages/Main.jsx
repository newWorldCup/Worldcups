import React from 'react';
import SearchList from 'components/HomeComponents/SearchList';
import { BodyDiv } from 'styles/StyledMain';

const Main = () => {
  return (
    <BodyDiv>
      <video autoPlay loop>
        <source src="/videos/To_my.mp4" type="video/mp4" />
        <strong>Your browser does not support the video tag.</strong>
      </video>
      <SearchList />
    </BodyDiv>
  );
};

export default Main;
