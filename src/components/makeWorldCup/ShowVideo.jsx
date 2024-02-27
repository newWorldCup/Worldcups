import { youtubeUrl } from 'common/data';
import { useDispatch, useSelector } from 'react-redux';
import { SearchedListDiv, SearchedVideoDiv, StyledLink } from 'styles/StyledMakeWorldCup';
import { addVideoList } from 'worldCupRedux/modules/makeWorldCup/videoListSlice';

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
  return (
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
  );
};

export default ShowVideo;
