import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import YouTube from 'react-youtube';
import { db } from 'firebaseStore/firebaseConfig';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import styled from 'styled-components';

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
  const opts = {
    height: '390',
    width: '640'
  };

  return (
    <>
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
                <YouTube videoId={video.videoId} opts={opts} />
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

// overflow: hidden;
// text-overflow: ellipsis;
const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
  width: 100%;
`;

const MyPageTitle = styled.p`
  font-size: 30px;
  margin-bottom: 50px;
`;
const MainColorSpan = styled.span`
  color: var(--main-color);
`;

const VideoContainer = styled.div`
  width: 640px;
`;

const DeleteBtn = styled.button`
  margin-bottom: 50px;
  padding: 15px 20px;
  background-color: #ff0000;
  border: 0;
  color: #fff;
  margin-left: 550px;
`;

const VideoTitle = styled.h2`
  width: 100%;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: var(--main-color);
  padding: 30px;
  color: #fff;
`;
