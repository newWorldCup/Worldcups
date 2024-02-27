import axios from 'axios';
import { useState } from 'react';
import { url } from 'common/data';
import { addSearchList } from 'worldCupRedux/modules/makeWorldCup/searchListSlice';
import { TitleForm } from 'styles/StyledMakeWorldCup';
import { useDispatch } from 'react-redux';

const Searchvideo = () => {
  const [searchword, setSearchWord] = useState('');
  const dispatch = useDispatch();

  const searchWordHandler = (e) => {
    setSearchWord(e.target.value);
  };

  const searchitem = async (searchword) => {
    if (searchword) {
      try {
        const { data } = await axios.get(
          `${url}/search?part=snippet&maxResults=1&q=${searchword}&key=AIzaSyCz0moHjm4tSh2cd0z2lhvcgTJyXpQSW4I`
        );
        dispatch(addSearchList(data));
        setSearchWord('');
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('검색어를 입력해주세요.');
    }
  };
  return (
    <>
      <TitleForm onSubmit={(e) => e.preventDefault()}>
        <input
          value={searchword}
          onChange={(e) => searchWordHandler(e)}
          placeholder="취향에 맞는 영상을 검색해주세요."
          autoFocus
        ></input>
        <button onClick={() => searchitem(searchword)}>검색</button>
      </TitleForm>
    </>
  );
};

export default Searchvideo;