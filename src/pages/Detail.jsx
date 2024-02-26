import { collection, doc, getDoc, getDocs } from '@firebase/firestore';
import { set } from 'lodash';
import React from 'react';
import { useEffect, useState } from 'react';
import { WorldcupGame } from 'styles/StyledDetail';
import { db } from 'worldCupRedux/config/firebaseConfig';
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
    setWinners((prevWinners) => [...prevWinners, selectedItem]);
    const remainingItems = worldcupItems.filter((item) => !winners.includes(item) && item !== selectedItem);
    if (remainingItems.length > 1) {
      setDisplays(remainingItems.slice(0, 2));
    } else if (remainingItems.length === 1) {
      // 마지막 남은 항목을 displays에 세팅
      setDisplays(remainingItems);
      console.log('최종 승자는', remainingItems[0]);
    } else {
      // 모든 선택이 끝났을 때, 최종 승자 표시
      console.log('최종 승자는', selectedItem);
      setDisplays([selectedItem]);
    }
  };

  /** react-youtube 옵션 설정 */
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0 // 영상 자동 재생 여부: 1이면 자동재생, 0이면 비활성화
    }
  };

  return (
    <WorldcupGame>
      <h1>My Worldcup</h1>
      {displays.map((video) => (
        <div key={video.videoId}>
          <YouTube videoId={video.videoId} opts={opts} />
          <p>{video.videoTitle}</p>
          <button onClick={clickHandler(video)}>선택</button>
        </div>
      ))}
    </WorldcupGame>
  );
};

export default Detail;
