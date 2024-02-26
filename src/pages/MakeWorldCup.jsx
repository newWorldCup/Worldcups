import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchList } from 'worldCupRedux/modules/searchListSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addWorldCup, fetchWorldCupList } from 'api/queryFns';
import { url, youtubeUrl } from 'common/data';
import { Link } from 'react-router-dom';
import { getWorldCup, plusworldCup } from 'worldCupRedux/modules/worldCupSlice';

const MakeWorldCup = () => {
  // GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]

  // Authorization: Bearer [YOUR_ACCESS_TOKEN]
  // Accept: application/json

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
  };

  // 월드컵 만들기
  const clickmakeWorldCup = () => {
    setMakingWorldCup((prev) => setMakingWorldCup(!prev));
  };

  const worldCupTitleHandler = (e) => {
    setWorldCupTitle(e.target.value);
  };

  const addVideo = (id, title, thumbNail) => {
    const newLink = {
      videoId: id,
      videoTitle: title,
      thumbNailUrl: thumbNail
    };
    setVideoList([...videoList, newLink]);
  };

  const worldCupHandler = () => {
    const newWorldCup = {
      userId: '추가예정',
      avatar: '추가예정',
      worldCupTitle,
      createdAt: String(new Date()),
      videoList
    };
    dispatch(plusworldCup(newWorldCup));
    // const mutation = useMutation({
    //     mutationFn
    // })
    mutateToAdd(newWorldCup);
  };

  return (
    <>
      <div>
        <input value={searchword} onChange={(e) => searchWordHandler(e)}></input>
        <button onClick={() => searchitem(searchword)}>검색</button>
        <button onClick={clickmakeWorldCup}>월드컵 만들기</button>
      </div>

      {makeingWorldCup ? (
        <div style={{ borderBottom: '2px solid black' }}>
          <div>
            <p>월드컵 이름</p>
            <input value={worldCupTitle} onChange={(e) => worldCupTitleHandler(e)}></input>
            <button onClick={worldCupHandler}>월드컵 완성!</button>
          </div>
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
        </div>
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

      <div>
        {worldCups.map((cup, idx) => (
          <div key={idx}>{cup.id}</div>
        ))}
      </div>
    </>
  );
};

export default MakeWorldCup;