import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import YouTube from 'react-youtube';
import { db } from 'firebaseStore/firebaseConfig';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import {
  DeleteBtn,
  MainColorSpan,
  MyPageTitle,
  ProfileTitle,
  ProfileWrap,
  VideoContainer,
  VideoTitle
} from 'styles/StyledProfile';

function Profile() {
  const [userMail, setUserMail] = useState(null);
  const [worldCupList, setWorldCupList] = useState([]);
  const nickname = localStorage.getItem('nickname');
  // 변수 어떻게 해야 하는지 뭘 받아 와야 하나요?

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserMail(user.email);
      } else {
        setUserMail(null);
      }
    });
    // (db, 'worldCupList'), where('userId', '==', userMail)  조건 추가 지금은 아이디 맞는게 없어서 못씀
    const fetchData = async () => {
      try {
        // userId가 아직 "추가예정"이라 되는지 모르겠음
        const q = query(collection(db, 'worldCupList'), where('userId', '==', userMail));
        // getDoc인지 getDocs인지;;
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setWorldCupList(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    if (userMail) {
      fetchData();
    }
  }, [userMail]);

  const onDeleteClick = async (uid) => {
    try {
      await deleteDoc(doc(db, 'worldCupList', uid));
      setWorldCupList((prevWorldCupList) => prevWorldCupList.filter((worldCup) => worldCup.uid !== uid));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <>
      <ProfileTitle>
        <p>
          {nickname}님의 <MainColorSpan>WorldCupList</MainColorSpan>
        </p>
      </ProfileTitle>
      {worldCupList.map((worldCup) => (
        <ProfileWrap key={worldCup.uid}>
          <div>
            <MyPageTitle>
              {nickname}님의 &nbsp;
              <MainColorSpan>{worldCup.worldCupTitle}</MainColorSpan>
            </MyPageTitle>
          </div>
          <VideoContainer>
            <DeleteBtn onClick={() => onDeleteClick(worldCup.uid)}>삭제하기</DeleteBtn>
            {worldCup.videoList.map((video) => (
              <div key={video.videoId}>
                <YouTube videoId={video.videoId} />
                <VideoTitle>{video.videoTitle}</VideoTitle>
              </div>
            ))}
          </VideoContainer>
        </ProfileWrap>
      ))}
    </>
  );
}

export default Profile;
