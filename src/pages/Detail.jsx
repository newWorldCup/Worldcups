import { doc, getDoc } from '@firebase/firestore';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  WorldcupGame,
  WorldcupTitle,
  WorldcupVideoList,
  WorldcupVideo,
  WorldcupVideoTitle,
  WorldcupSeletButton
} from 'styles/StyledDetail';
import { db } from 'firebaseStore/firebaseConfig';
import YouTube from 'react-youtube';

const Detail = () => {
  const [worldcupItems, setWorldcupItems] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const itemRef = doc(db, 'worldCupList', 'RRPylps6Fswft1YhNNfV');
      // 문서 ID는 자동으로 생성된 부분이라 나중에 리스트에서 클릭한 문서의 ID를 가져올 수 있도록 변경해야함
      const docData = await getDoc(itemRef);

      if (docData.exists()) {
        let videoList = docData.data().videoList;
        videoList.sort(() => Math.random() - 0.5);
        setWorldcupItems(videoList);
        setDisplays(videoList.slice(0, 2));
      } else {
        console.log('월드컵 리스트를 불러오는데 실패했습니다!');
      }
    };

    fetchItems();
  }, []);

  const clickHandler = (selectedItem) => () => {
    setWinners((prevWinners) => {
      // 중복된 아이템이 없도록 업데이트
      const updatedWinners = prevWinners.includes(selectedItem) ? prevWinners : [...prevWinners, selectedItem];
      return updatedWinners;
    });

    setWorldcupItems((prevItems) => {
      // 선택된 아이템을 제외한 새로운 리스트 생성
      const newItems = prevItems.filter((item) => item !== selectedItem);
      return newItems;
    });

    setDisplays((prevDisplays) => {
      // 이전 worldcupItems에서 현재 선택된 아이템을 제외한 새로운 배열
      const newRemainingItems = worldcupItems.filter((item) => item !== selectedItem && !winners.includes(item));

      if (newRemainingItems.length > 1) {
        // 남은 항목들 중에서 랜덤으로 2개를 선택하여 displays에 세팅
        const shuffledRemainingItems = newRemainingItems.sort(() => Math.random() - 0.5);
        return shuffledRemainingItems.slice(0, 2);
      } else if (newRemainingItems.length === 1) {
        // 마지막 남은 항목을 displays에 세팅
        return newRemainingItems;
      } else {
        // 모든 선택이 끝났을 때, 최종 승자 표시
        return [selectedItem];
      }
    });
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
      <WorldcupTitle>My Worldcup Game</WorldcupTitle>
      <WorldcupVideoList>
        {displays.map((video) => (
          <WorldcupVideo key={video.videoId}>
            <YouTube videoId={video.videoId} opts={opts} />
            <WorldcupVideoTitle>{video.videoTitle}</WorldcupVideoTitle>
            <WorldcupSeletButton onClick={clickHandler(video)}>선택</WorldcupSeletButton>
          </WorldcupVideo>
        ))}
      </WorldcupVideoList>
    </WorldcupGame>
  );
};

export default Detail;
