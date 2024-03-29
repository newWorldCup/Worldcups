import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWorldCup } from 'api/queryFns';
import { resetSearchList } from 'worldCupRedux/modules/makeWorldCup/searchListSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  WorldCupTitleForm,
  MakeWorldCupDiv,
  CandidateTitle,
  CandidatesBodyDiv,
  CandidatesvideosDiv
} from 'styles/StyledMakeWorldCup';
import { renewVideoList } from 'worldCupRedux/modules/makeWorldCup/videoListSlice';
import { toast } from 'react-toastify';

const NewWorldCup = ({ makeingWorldCup, uid, userId }) => {
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
    const cancelConfirm = window.confirm('삭제하시겠습니까?');
    if (cancelConfirm) {
      const restList = videoList.filter((video) => video.videoId !== id);
      dispatch(renewVideoList(restList));
      toast.success('삭제되었습니다');
    } else {
      toast.error('삭제가 취소 되었습니다');
    }
  };

  const removeAllVideo = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(renewVideoList([]));
    }
  };

  const worldCupHandler = () => {
    if (!worldCupTitle) {
      toast.error('월드컵 이름을 작성해주세요');
    } else if (videoList.length === 0) {
      toast.error('후보가 될 영상들을 추가해주세요');
    } else if (videoList.length < 8 || videoList.length > 8) {
      toast.error('후보영상은 8개여야 합니다.');
    } else {
      const newWorldCup = {
        uid,
        userId,
        worldCupTitle,
        createdAt: String(new Date()),
        videoList
      };
      toast.success('월드컵 완성! 월드컵 리스트에서 확인하세요:)');
      setWorldCupTitle('');
      dispatch(resetSearchList());
      dispatch(renewVideoList([]));
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
            <CandidateTitle>
              <p>Candidates</p>
              <button onClick={removeAllVideo}>전체삭제</button>
            </CandidateTitle>

            <CandidatesBodyDiv>
              {videoList.map((video) => (
                <div key={video.videoId}>
                  <button onClick={() => cancelAddvideo(video.videoId)}>x</button>
                  <img src={video.thumbNailUrl} alt="추가된 영상 썸네일" key={video.videoId} />
                </div>
              ))}
            </CandidatesBodyDiv>
          </CandidatesvideosDiv>
        </MakeWorldCupDiv>
      ) : null}
    </>
  );
};

export default NewWorldCup;
