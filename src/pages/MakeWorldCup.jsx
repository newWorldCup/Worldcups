import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchList, resetSearchList } from 'worldCupRedux/modules/makeWorldCup/searchListSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addWorldCup, fetchWorldCupList } from 'api/queryFns';
import { url, youtubeUrl } from 'common/data';
import { getWorldCup } from 'worldCupRedux/modules/makeWorldCup/worldCupSlice';
import {
  EntireDiv,
  TitleForm,
  WorldCupTitle,
  MakeWorldCupDiv,
  CandidatesvideosDiv,
  SearchedListDiv,
  SearchedVideoDiv,
  StyledLink
} from 'styles/StyledMakeWorldCup';

const MakeWorldCup = () => {
  // 추후 로그인 한 사람의 videoList로 바꿔야 함

  const [searchword, setSearchWord] = useState('');
  const [makeingWorldCup, setMakingWorldCup] = useState(false);
  const [worldCupTitle, setWorldCupTitle] = useState('');
  const rawVideoList = localStorage.getItem('videoList');
  const parsedList = rawVideoList ? JSON.parse(rawVideoList) : [];
  const [videoList, setVideoList] = useState(parsedList);
  const searchList = useSelector((state) => state.searchListSlice);
  const worldCupList = useSelector((state) => state.worldCupListSlice);
  const rawUid = localStorage.getItem('uid');
  const uid = rawUid ? JSON.parse(rawUid) : '';
  const dispatch = useDispatch();
  console.log(worldCupList);

  const queryClient = useQueryClient();

  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addWorldCup,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['worldCupList']);
      console.log('새로운 월드컵 추가 성공!');
    }
  });

  // firebase에서 worldCupList 가져오기
  const {
    isLoading,
    isError,
    data: worldCups
  } = useQuery({
    queryKey: ['worldCupList'],
    queryFn: fetchWorldCupList
  });

  // 각 state의 useEffect가 영향 받지 않도록 하기 위해서 여러 개의 useEffect 사용
  useEffect(() => {
    dispatch(getWorldCup(worldCups));
  }, [dispatch, worldCups]);

  useEffect(() => {
    localStorage.setItem('videoList', JSON.stringify(videoList));
    if (videoList.length === 0) {
      setMakingWorldCup(false);
    } else {
      setMakingWorldCup(true);
    }
  }, [videoList]);

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
  const worldCupTitleHandler = (e) => {
    setWorldCupTitle(e.target.value);
  };

  const addVideo = (id, title, thumbNail) => {
    if (videoList.find((video) => video.videoId === id)) {
      alert('같은 영상은 다시 추가할 수 없습니다.');
    } else {
      setMakingWorldCup(true);
      const newVideo = {
        videoId: id,
        videoTitle: title,
        thumbNailUrl: thumbNail
      };

      setVideoList([...videoList, newVideo]);
    }
  };

  const cancelAddvideo = (id) => {
    const restList = videoList.filter((video) => video.videoId !== id);
    setVideoList(restList);
  };

  const worldCupHandler = () => {
    if (!worldCupTitle) {
      alert('월드컵 이름을 작성해주세요');
    } else if (videoList.length === 0) {
      alert('후보가 될 영상들을 추가해주세요');
    } else {
      const newWorldCup = {
        uid,
        userId: '추가예정',
        worldCupTitle,
        createdAt: String(new Date()),
        videoList
      };
      alert('월드컵 완성! 월드컵 리스트에서 확인하세요:)');
      setVideoList([]);
      setWorldCupTitle('');
      dispatch(resetSearchList());
      mutateToAdd(newWorldCup);
      localStorage.removeItem('videoList');
    }
  };

  return (
    <EntireDiv>
      <h1>나만의 월드컵 만들기</h1>
      <TitleForm onSubmit={(e) => e.preventDefault()}>
        <input
          value={searchword}
          onChange={(e) => searchWordHandler(e)}
          placeholder="취향에 맞는 영상을 검색해주세요."
          autoFocus
        ></input>
        <button onClick={() => searchitem(searchword)}>검색</button>
      </TitleForm>

      {makeingWorldCup ? (
        <MakeWorldCupDiv>
          <WorldCupTitle>
            <div>
              <span>월드컵 이름</span>
              <input value={worldCupTitle} onChange={(e) => worldCupTitleHandler(e)}></input>
            </div>
            <button onClick={worldCupHandler}>월드컵 완성</button>
          </WorldCupTitle>
          <CandidatesvideosDiv>
            <p>Candidates</p>
            <div>
              {videoList.map((video) => (
                <>
                  <button onClick={() => cancelAddvideo(video.videoId)}>x</button>
                  <img src={video.thumbNailUrl} alt="추가된 영상 썸네일" key={video.videoId} />
                </>
              ))}
            </div>
          </CandidatesvideosDiv>
        </MakeWorldCupDiv>
      ) : null}

      <SearchedListDiv>
        {searchList.length !== 0
          ? searchList.items.map((item) => (
              <SearchedVideoDiv key={item.id.videoId}>
                <StyledLink to={`${youtubeUrl}/${item.id.videoId}`}>
                  <p>{item.snippet.title}</p>
                  <img src={item.snippet.thumbnails.default.url} alt="영상 이미지" />
                </StyledLink>
                <button
                  onClick={() => {
                    addVideo(item.id.videoId, item.snippet.title, item.snippet.thumbnails.default.url);
                  }}
                >
                  Add To My WorldCup
                </button>
              </SearchedVideoDiv>
            ))
          : null}
      </SearchedListDiv>
    </EntireDiv>
  );
};

export default MakeWorldCup;
