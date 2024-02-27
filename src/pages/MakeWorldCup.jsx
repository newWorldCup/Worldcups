import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchList } from 'worldCupRedux/modules/searchListSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addWorldCup, fetchWorldCupList } from 'api/queryFns';
import { url, youtubeUrl } from 'common/data';
import { Link } from 'react-router-dom';
import { getWorldCup } from 'worldCupRedux/modules/worldCupSlice';
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

  // firebase에서 worldCupList 가져오기
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

  useEffect(() => {
    if (videoList.length === 0) {
      setMakingWorldCup(false);
    }
  }, [videoList.length]);

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
          `${url}/search?part=snippet&maxResults=8&q=${searchword}&key=AIzaSyCz0moHjm4tSh2cd0z2lhvcgTJyXpQSW4I`
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
        userId: '추가예정',
        avatar: '추가예정',
        worldCupTitle,
        createdAt: String(new Date()),
        videoList
      };
      mutateToAdd(newWorldCup);
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

const EntireDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleForm = styled.form`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  & input {
    width: 350px;
    height: 25px;
    border: 3px solid #bfbfbf;
  }
  & input:focus {
    outline: none;
  }
  & button {
    width: 70px;
    height: 35px;
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

const WorldCupTitle = styled.div`
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

const MakeWorldCupDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 1400px;
  border-bottom: 2px solid #52606d;
  height: fit-content; /* 내부 컨텐츠에 맞게 높이 조정 */
`;

const CandidatesvideosDiv = styled.div`
  height: 200px;
  width: 100%;
  max-width: 1400px;
  color: #52606d;
  display: flex;
  flex-direction: column;
  & p {
    margin-left: 20px;
    font-weight: 550;
    font-size: 20px;
  }
  & div {
    width: 1400px;
    height: 130px;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    max-height: 200px;
    overflow-y: auto;
    & button {
      width: 20px;
      margin: 0px;
    }
  }
  & div > img {
    width: 150px;
    height: 100px;
    border-radius: 5px;
    border: 3px solid #bfbfbf;
  }
`;
const SearchedListDiv = styled.div`
  width: 100%;
  max-width: 1400px;
  margin-top: 20px;
  padding: 0 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const SearchedVideoDiv = styled.div`
  gap: 10px;
  width: 250px;
  height: 320px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  border: 2px solid #bfbfbf;
  background-color: #dcdcde;
  margin-top: 10px;
  padding: 0px 10px 10px 10px;
  & button {
    width: 200px;
    height: 40px;
    font-size: 16px;
    color: #3e4c59;
    border: solid 3px #bfbfbf;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #bfbfbf;
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 270px;
  color: inherit;
  &:hover {
    color: #52606d;
  }
  & p {
    height: 40px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  & img {
    border-radius: 5px;
    height: 188px;
  }
`;
