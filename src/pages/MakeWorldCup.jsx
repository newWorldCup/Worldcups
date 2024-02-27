import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchWorldCupList } from 'api/queryFns';
import { getWorldCup } from 'worldCupRedux/modules/makeWorldCup/worldCupSlice';
import { EntireDiv } from 'styles/StyledMakeWorldCup';
import Searchvideo from 'components/makeWorldCup/Searchvideo';
import NewWorldCup from 'components/makeWorldCup/NewWorldCup';
import ShowVideo from 'components/makeWorldCup/ShowVideo';

const MakeWorldCup = () => {
  const [makeingWorldCup, setMakingWorldCup] = useState(false);
  const rawUid = localStorage.getItem('uid');
  const uid = rawUid ? JSON.parse(rawUid) : '';
  // const rawVideoList = localStorage.getItem(`videoList${uid}`);
  // const parsedList = rawVideoList ? JSON.parse(rawVideoList) : [];
  // const [videoList, setVideoList] = useState(parsedList);
  const videoList = useSelector((state) => state.videoListSlice);

  const dispatch = useDispatch();

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

  // 새로고침하거나 영상 보고 돌아온 뒤에도 내가 만들던 월드컵이 남아있도록 로컬스토리지에 저장
  useEffect(() => {
    if (videoList.length === 0) {
      setMakingWorldCup(false);
    } else {
      setMakingWorldCup(true);
    }
    localStorage.setItem(`videoList${uid}`, JSON.stringify(videoList));
  }, [videoList, uid]);

  if (isLoading) {
    return <div>월드컵 리스트 로딩중...</div>;
  }

  if (isError) {
    return <div>월드컵 리스트를 불러오는 과정에서 오류 발생</div>;
  }

  return (
    <EntireDiv>
      <h1>나만의 월드컵 만들기</h1>
      <Searchvideo />
      <NewWorldCup setMakingWorldCup={setMakingWorldCup} makeingWorldCup={makeingWorldCup} uid={uid} />
      <ShowVideo setMakingWorldCup={setMakingWorldCup} />
    </EntireDiv>
  );
};

export default MakeWorldCup;
