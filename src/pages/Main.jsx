import SearchList from 'components/HomeComponents/SearchList';
import styled from 'styled-components';

const Main = () => {
  return (
    <BodyDiv>
      <SearchList />
    </BodyDiv>
  );
};

export default Main;

const BodyDiv = styled.div`
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0 auto;
`;
