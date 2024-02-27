import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import YouTube from 'react-youtube';
import { db } from 'firebaseStore/firebaseConfig';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';

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
    const fetchData = async () => {
      try {
        // userId가 아직 "추가예정"이라 되는지 모르겠음
        const q = query(collection(db, 'worldCupList'), where('userId', '==', userMail));
        // getDoc인지 getDocs인지;;
        const querySnapshot = await getDoc(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setWorldCupList(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    if (userMail) {
      fetchData();
    }
  }, [userMail]);

  return (
    <div>
      <h2>{userMail}</h2>
      {worldCupList.map((worldCup) => (
        <div key={worldCup.id}>
          <div>
            <span>
              {nickname}님의 {worldCup.worldCupTitle}
            </span>
          </div>
          <div>
            {worldCup.videoList.map((video) => (
              <div key={video.videoId}>
                <h2>{video.videoTitle}</h2>
                <YouTube videoId={video.videoId} width="400px" height="300px" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;
