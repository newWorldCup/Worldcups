import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { db } from 'firebaseStore/firebaseConfig';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import {
  DeleteBtn,
  MainColorSpan,
  MakeWrap,
  MyPageTitle,
  ProfileTitle,
  ProfileWrap,
  VideoContainer,
  VideoTitle
} from 'styles/StyledProfile';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [worldCupList, setWorldCupList] = useState([]);
  const userMail = JSON.parse(localStorage.getItem('email'));
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'worldCupList'));
        const querySnapshot = await getDocs(q);
        const worldCupArr = [];
        querySnapshot.forEach((doc) => {
          const worldCup = { id: doc.id, ...doc.data() };
          worldCupArr.push(worldCup);
        });
        const filterData = worldCupArr.filter((item) => item.userId === userMail);
        setWorldCupList(filterData);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    if (userMail) {
      fetchData();
    }
  }, [userMail]);

  const onDeleteClick = async (id) => {
    try {
      const deleteConfirm = window.confirm('삭제하시겠습니까?');
      if (deleteConfirm) {
        await deleteDoc(doc(db, 'worldCupList', id));
        setWorldCupList((prevWorldCupList) => prevWorldCupList.filter((worldCup) => worldCup.id !== id));
      }
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
      {worldCupList.length === 0 ? (
        <>
          <ProfileTitle>
            <p>
              {emailRename(userMail)}님의 <MainColorSpan>WorldCupList</MainColorSpan>
            </p>
          </ProfileTitle>
          <MakeWrap>
            <p>월드컵을 만들어 주세요!</p>
            <button onClick={() => navigator('/makeWorldCup')}>New WorldCup Make here</button>
          </MakeWrap>
        </>
      ) : (
        <>
          <ProfileTitle>
            <p>
              {emailRename(userMail)}님의 <MainColorSpan>WorldCupList</MainColorSpan>
            </p>
          </ProfileTitle>
          {worldCupList?.map((worldCup) => (
            <ProfileWrap key={worldCup.id}>
              <div>
                <MyPageTitle>
                  {emailRename(userMail)}님의 &nbsp;
                  <MainColorSpan>{worldCup.worldCupTitle}</MainColorSpan>
                </MyPageTitle>
              </div>
              <VideoContainer>
                <DeleteBtn onClick={() => onDeleteClick(worldCup.id)}>삭제하기</DeleteBtn>
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
      )}
    </>
  );
}

export default Profile;
