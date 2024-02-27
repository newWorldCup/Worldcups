import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDocs } from '@firebase/firestore';
import YouTube from 'react-youtube';
import { db } from 'firebaseStore/firebaseConfig';

function Profile() {
  const [userMail, setUserMail] = useState(null);
  const dataGetFunction = async () => {
    const data = await getDocs(db, 'worldCupList');
    return data;
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserMail(user.email);
      } else {
        setUserMail(null);
      }
    });
    dataGetFunction();
  }, []);
  const { data } = dataGetFunction();

  const filterWorldCupList = data?.filter((item) => item.userId === userMail);

  return (
    <div>
      <h2>{userMail}</h2>
      {filterWorldCupList?.map((item) => {
        return (
          <>
            <div>
              {/* <div>
                <img src={item.avatar} alt="profileImg" />
              </div> */}
              <span>{userMail}님의 WorldCup-List</span>
            </div>
            <div>
              <h2>{item.videoTitle}</h2>
              <ul>
                <li key={item.videoId}>
                  <YouTube videoId={item.videoId} width="400px" height="300px" />
                </li>
              </ul>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Profile;
