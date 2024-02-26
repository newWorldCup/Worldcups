import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useMutation, QueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function Profile() {
  // const {data} = useQuery(["worldCupList" , getWorldCupList]);
  // const mutation = useMutation(deleteWorldCupList, {
  //   onSuccess: () => {
  //     QueryClient.invalidateQueries("worldCupList")
  //   }
  // });
  const navigate = useNavigate();
  const [userMail, setUserMail] = useState(null);
  useEffect(() => {
    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
      // if (user) {
        // setUserMail(user.email);
      // } else {
        // setUserMail(null);
      // }
    // });
    const navigateHome =()=>{
      if(userMail === null){
        navigate('/');
        alert("로그인을 해주세요");
      }
    }
    navigateHome();
  }, []);

  const filterWorldCupList = data?.filter((item)=> item.userId === userMail);

  const onClickDelete =()=>{
    // mutation.mutate(data.id);
  }
  

  return (
    <div>
      {
        filterWorldCupList?.map((item)=>{
          return (
            <>
            <span>{item.userId}</span>
            <div>
              <img src={item.avatar} alt="profileImg" />
            </div>
            <div>
              <h2>{item.worldCupLinkList.linkTitle}</h2>
              <ul onClick={onClickDelete}>
                <li>
                  <video
                    url={item.worldCupLinkList.link}
                    width='400px'
                    height='300px'
                    playing={true}
                    muted={true}
                    controls={true}
                    loop={true}
                  />
                </li>
                </ul>
              
            </div>
            </>
          )
        })
      }
      
    </div>
  )
}

export default Profile
