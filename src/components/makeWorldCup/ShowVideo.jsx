// import { youtubeUrl } from 'common/data';
import YouTube from 'react-youtube';
import { useDispatch, useSelector } from 'react-redux';
import { SearchedListDiv, SearchedVideoDiv, StyledLink } from 'styles/StyledMakeWorldCup';
import { addVideoList } from 'worldCupRedux/modules/makeWorldCup/videoListSlice';
import styled from 'styled-components';

const ShowVideo = ({ setMakingWorldCup }) => {
  const searchList = useSelector((state) => state.searchListSlice);
  const videoList = useSelector((state) => state.videoListSlice);
  const dispatch = useDispatch();

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
      dispatch(addVideoList(newVideo));
      console.log(videoList);
    }
  };

  const opts = {
    height: '600',
    playerVars: {
      autoplay: 0
    }
  };
  return (
    <SearchedListDiv>
      {searchList.length !== 0
        ? searchList.items.map((item) => (
            <SearchedVideoDiv key={item.id.videoId}>
              {/* <StyledLink to={`${youtubeUrl}/${item.id.videoId}`}>
                <p>{item.snippet.title}</p>
                <img src={item.snippet.thumbnails.default.url} alt="영상 이미지" />
              </StyledLink> */}
              <YouTubeDiv>
                <p>{item.snippet.title}</p>
                <YouTube videoId={item.id.videoId} opts={opts} />
              </YouTubeDiv>

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
  );
};

export default ShowVideo;

const YouTubeDiv = styled.div`
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
`;
