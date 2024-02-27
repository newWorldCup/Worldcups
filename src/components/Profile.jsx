import React, { useEffect, useState } from 'react';
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
  const [worldCupList, setWorldCupList] = useState([]);
  const userMail = JSON.parse(localStorage.getItem('email'));
  console.log(userMail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'worldCupList'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        const filterData = data.filter((item) => item.userId === userMail);
        setWorldCupList(filterData);
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

  const emailRename = (userMail) => {
    const userId = userMail.split('@');
    return userId[0];
  };

  return (
    <>
      <ProfileTitle>
        <p>
          {emailRename(userMail)}님의 <MainColorSpan>WorldCupList</MainColorSpan>
        </p>
      </ProfileTitle>
      {worldCupList.map((worldCup) => (
        <ProfileWrap key={worldCup.uid}>
          <div>
            <MyPageTitle>
              {emailRename(userMail)}님의 &nbsp;
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
