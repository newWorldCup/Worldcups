import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWorldCup } from 'api/queryFns';
import { resetSearchList } from 'worldCupRedux/modules/makeWorldCup/searchListSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WorldCupTitleForm, MakeWorldCupDiv, CandidatesvideosDiv } from 'styles/StyledMakeWorldCup';
import { renewVideoList } from 'worldCupRedux/modules/makeWorldCup/videoListSlice';

const NewWorldCup = ({ makeingWorldCup, uid }) => {
  const [worldCupTitle, setWorldCupTitle] = useState('');
  const videoList = useSelector((state) => state.videoListSlice);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addWorldCup,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['worldCupList']);
      console.log('새로운 월드컵 추가 성공!');
    }
  });

  const worldCupTitleHandler = (e) => {
    setWorldCupTitle(e.target.value);
  };

  const cancelAddvideo = (id) => {
    const restList = videoList.filter((video) => video.videoId !== id);
    dispatch(renewVideoList(restList));
  };

  const worldCupHandler = () => {
    if (!worldCupTitle) {
      alert('월드컵 이름을 작성해주세요');
    } else if (videoList.length === 0) {
      alert('후보가 될 영상들을 추가해주세요');
    } else if (videoList.length < 8) {
      alert('후보영상은 최소 8개여야 합니다.');
    } else {
      const newWorldCup = {
        uid,
        userId: '추가예정',
        worldCupTitle,
        createdAt: String(new Date()),
        videoList
      };
      alert('월드컵 완성! 월드컵 리스트에서 확인하세요:)');
      setWorldCupTitle('');
      dispatch(resetSearchList());
      mutateToAdd(newWorldCup);
      localStorage.removeItem(`videoList${uid}`);
    }
  };

  return (
    <>
      {makeingWorldCup ? (
        <MakeWorldCupDiv>
          <WorldCupTitleForm onSubmit={(e) => e.preventDefault()}>
            <div>
              <span>월드컵 이름</span>
              <input value={worldCupTitle} onChange={(e) => worldCupTitleHandler(e)}></input>
            </div>
            <button onClick={worldCupHandler}>월드컵 완성</button>
          </WorldCupTitleForm>
          <CandidatesvideosDiv>
            <p>Candidates</p>
            <div>
              {videoList.map((video) => (
                <div key={video.videoId}>
                  <button onClick={() => cancelAddvideo(video.videoId)}>x</button>
                  <img src={video.thumbNailUrl} alt="추가된 영상 썸네일" key={video.videoId} />
                </div>
              ))}
            </div>
          </CandidatesvideosDiv>
        </MakeWorldCupDiv>
      ) : null}
    </>
  );
};

export default NewWorldCup;
