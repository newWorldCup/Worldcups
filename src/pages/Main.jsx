import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useSelector } from 'react-redux';
import { getWorldCups } from '../api/queryFns';
import { useQuery } from '@tanstack/react-query';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import SearchList from 'components/HomeComponents/SearchList';
import styled from 'styled-components';

const Main = () => {
  const navigate = useNavigate();
  //유저 확인
  const [cups, setCups] = useState([]);
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    });
  }, [isLogin]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'worldCupList'));

      const querySnapshot = await getDocs(q);

      const initialWorldCupList = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        initialWorldCupList.push(data);

        setCups(initialWorldCupList);
      });
    };
    fetchData();
  }, []);

  return (
    <BodyDiv>
      {/* {data.map((item) => {
        return (
          <div key={item.id}>
            {item.linkList.map((itemList) => {
              return (
                <div key={itemList.id}>
                  <div>{itemList.thumbNail}</div>
                  <a href={`${itemList.link}`}>{itemList.linkTitle}</a>
                  <div>{itemList.linkTitle}</div>
                </div>
              );
            })}
            <div>작성자:&nbsp;{item.userId}</div>
            <div>작성 일자:&nbsp;{item.createdAt}</div>
          </div>
        );
      })} */}
      {isLogin ? <SearchList /> : <button onClick={() => navigate('/login')}>로그인</button>}{' '}
    </BodyDiv>
  );
};

export default Main;

const BodyDiv = styled.div`
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0 auto;
`;
