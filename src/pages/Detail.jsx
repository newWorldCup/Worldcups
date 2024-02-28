import { doc, getDoc } from '@firebase/firestore';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  WorldcupGame,
  WorldcupTitle,
  WorldcupVideoList,
  WorldcupVideo,
  WorldcupVideoTitle,
  WorldcupSelectButton
} from 'styles/StyledDetail';
import { db } from 'firebaseStore/firebaseConfig';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const [worldcupItems, setWorldcupItems] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);
  const [round, setRound] = useState(8);
  const { id } = useParams();
  const [worldcupTitle, setWorldcupTitle] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const itemRef = doc(db, 'worldCupList', id);
      const docData = await getDoc(itemRef);

      if (docData.exists()) {
        let videoList = docData.data().videoList;
        let worldcupGameTitle = docData.data().worldCupTitle;
        videoList.sort(() => Math.random() - 0.5);
        setWorldcupTitle(worldcupGameTitle);
        setWorldcupItems(videoList);
        setDisplays(videoList.slice(0, 2));
      } else {
        console.log('월드컵 리스트를 불러오는데 실패했습니다!');
      }
    };
    fetchItems();
  }, [id]);

  useEffect(() => {
    // 라운드 업데이트 시 새로운 라운드 시작 (승자 배열에서 다시 뽑기)
    if (winners.length === round / 2 && round > 1) {
      const newRound = round / 2;
      setRound(newRound);
      setWorldcupItems(winners);
      setWinners([]);
      setDisplays(winners.slice(0, 2));
    } else if (round === 1 && winners.length === 1) {
      // 최종 승자가 결정됐을 때
      setDisplays(winners);
    }
  }, [winners, round]);

  const clickHandler = (selectedItem) => () => {
    const newWinners = [...winners, selectedItem]; // 승자 배열에 선택된 아이템 추가

    // worldcupItems에서 현재 displays에 나타난 두 아이템을 모두 제거 <<중요
    const newItems = worldcupItems.filter(
      (item) => item.videoId !== displays[0].videoId && item.videoId !== displays[1].videoId
    );

    setWorldcupItems(newItems);
    setWinners(newWinners);

    // 다음 경기 세팅
    if (newWinners.length < round / 2) {
      setDisplays(newItems.slice(0, 2));
    } else {
      // 현재 라운드가 끝나면
      if (round > 2) {
        // 다음 라운드로
        setDisplays([]);
        setWinners(newWinners);
      } else {
        // 최종 우승자 선언
        setDisplays([]);
      }
    }
  };

  /** react-youtube 옵션 설정 */
  const opts = {
    height: '600',
    playerVars: {
      autoplay: 0
    }
  };
  return (
    <WorldcupGame>
      <WorldcupTitle>{worldcupTitle}</WorldcupTitle>
      <p>{round}강입니다.</p>
      <WorldcupVideoList>
        {displays.map((video) => (
          <WorldcupVideo key={video.videoId}>
            <YouTube videoId={video.videoId} opts={opts} />
            <WorldcupVideoTitle>{video.videoTitle}</WorldcupVideoTitle>
            <WorldcupSelectButton onClick={clickHandler(video)}>선택</WorldcupSelectButton>
          </WorldcupVideo>
        ))}
      </WorldcupVideoList>
      {round === 1 && winners.length === 1 && <div>최종 우승자는 {winners[0].videoTitle}입니다!</div>}
    </WorldcupGame>
  );
};

export default Detail;
