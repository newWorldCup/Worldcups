import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchList } from 'worldCupRedux/modules/searchListSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addWorldCup, fetchWorldCupList } from 'api/queryFns';
import { url, youtubeUrl } from 'common/data';
import { Link } from 'react-router-dom';
import { getWorldCup, plusworldCup } from 'worldCupRedux/modules/worldCupSlice';
import styled from 'styled-components';

const MakeWorldCup = () => {
  const [searchword, setSearchWord] = useState('');
  const [makeingWorldCup, setMakingWorldCup] = useState(false);
  const [worldCupTitle, setWorldCupTitle] = useState('');
  const [videoList, setVideoList] = useState([]);
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.searchListSlice);
  const worldCupList = useSelector((state) => state.worldCupListSlice);
  console.log(worldCupList);

  const queryClient = useQueryClient();

  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addWorldCup,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['worldCupList']);
      console.log('새로운 월드컵 추가 성공!');
    }
  });

  //   firebase에서 worldCupList 가져오기
  const {
    isLoading,
    isError,
    data: worldCups
  } = useQuery({
    queryKey: ['worldCupList'],
    queryFn: fetchWorldCupList
  });

  useEffect(() => {
    dispatch(getWorldCup(worldCups));
  }, [dispatch, worldCups]);

  if (isLoading) {
    return <div>월드컵 리스트 로딩중...</div>;
  }

  if (isError) {
    return <div>월드컵 리스트를 불러오는 과정에서 오류 발생</div>;
  }

  // 월드컵에 들어갈 영상들 검색하기 영역
  const searchWordHandler = (e) => {
    setSearchWord(e.target.value);
  };

  const searchitem = async (searchword) => {
    if (searchword) {
      try {
        const { data } = await axios.get(
          `${url}/search?part=snippet&maxResults=1&q=${searchword}&key=AIzaSyCz0moHjm4tSh2cd0z2lhvcgTJyXpQSW4I`
        );
        console.log(data);
        dispatch(addSearchList(data));
        setSearchWord('');
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('검색어를 입력해주세요.');
    }
  };

  // 월드컵 만들기
  const clickmakeWorldCup = () => {
    setMakingWorldCup((prev) => setMakingWorldCup(!prev));
  };

  const worldCupTitleHandler = (e) => {
    setWorldCupTitle(e.target.value);
  };

  const addVideo = (id, title, thumbNail) => {
    if (videoList.find((cup) => cup.videoId === id)) {
      alert('같은 영상은 다시 추가할 수 없습니다.');
    } else {
      const newLink = {
        videoId: id,
        videoTitle: title,
        thumbNailUrl: thumbNail
      };
      setVideoList([...videoList, newLink]);
    }
  };

  const worldCupHandler = () => {
    if (worldCupTitle) {
      const newWorldCup = {
        userId: '추가예정',
        avatar: '추가예정',
        worldCupTitle,
        createdAt: String(new Date()),
        videoList
      };
      dispatch(plusworldCup(newWorldCup));

      mutateToAdd(newWorldCup);
    } else {
      alert('월드컵 이름을 작성해주세요');
    }
  };

  return (
    <>
      <TitleDiv>
        <div>
          <input value={searchword} onChange={(e) => searchWordHandler(e)}></input>
          <button onClick={() => searchitem(searchword)}>검색</button>
          <button onClick={clickmakeWorldCup}>월드컵 만들기</button>
        </div>
      </TitleDiv>

      {makeingWorldCup ? (
        <MakeWorldCupDiv style={{ borderBottom: '2px solid black' }}>
          <WorldCupTitle>
            <div>
              <span>월드컵 이름</span>
              <input value={worldCupTitle} onChange={(e) => worldCupTitleHandler(e)}></input>
            </div>

            <button onClick={worldCupHandler}>월드컵 완성!</button>
          </WorldCupTitle>
          <div>
            <p>월드컵에 들어갈 영상들</p>
            <div>
              {videoList.map((video) => (
                <div key={video.videoId}>
                  <img src={video.thumbNailUrl} alt="추가된 영상 썸네일" />
                </div>
              ))}
            </div>
          </div>
        </MakeWorldCupDiv>
      ) : null}

      <div>
        {searchList.length !== 0
          ? searchList.items.map((item, idx) => (
              <div key={idx}>
                <Link to={`${youtubeUrl}/${item.id.videoId}`}>
                  <p>{item.snippet.title}</p>
                  <img src={item.snippet.thumbnails.default.url} alt="영상 이미지" />
                </Link>
                <button
                  onClick={() => {
                    addVideo(item.id.videoId, item.snippet.title, item.snippet.thumbnails.default.url);
                  }}
                >
                  월드컵에 추가하기
                </button>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default MakeWorldCup;

const TitleDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WorldCupTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  & div {
    padding: 0 10px;
    gap: 10px;
  }
  & div > input {
  }
`;

const MakeWorldCupDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
