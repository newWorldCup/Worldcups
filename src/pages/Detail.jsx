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
      // 문서 ID는 자동으로 생성된 부분이라 나중에 리스트에서 클릭한 문서의 ID를 가져올 수 있도록 변경해야함
      const docData = await getDoc(itemRef);

      console.log('데이터', docData);

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
    const newItems = worldcupItems.filter((item) => item !== selectedItem);
    setWorldcupItems(newItems); // 선택되지 않은 아이템 제거
    console.log(worldcupItems);
    console.log('선택된 아이템 제거', newItems);

    if (newItems.length === 1 && round > 2) {
      // 마지막 아이템이고 아직 결승전이 아닌 경우
      setWinners((prevWinners) => [...prevWinners, selectedItem]);
    } else if (round === 2 || (round === 1 && newItems.length === 0)) {
      // 4강 또는 결승
      setWinners((prevWinners) => [...prevWinners, selectedItem]);
    } else {
      // 다음 표시될 두 아이템 설정
      setDisplays(newItems.slice(0, 2));
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
