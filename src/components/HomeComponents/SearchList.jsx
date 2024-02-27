import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'firebaseStore/firebaseConfig';
import useFormInput from 'components/common/useFormInput';

import {
  SearchListContainer,
  InputDiv,
  SearchInput,
  BoxContentDiv,
  SemiContentDiv,
  ContentDiv,
  BoxDiv,
  InfoDiv
} from 'styles/StyledSearchList';

const SearchList = () => {
  const navigate = useNavigate();
  const [cups, setCups] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [searchTitle.value, setSearchTitle] = useState('');
  const searchTitle = useFormInput('');

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'worldCupList'));

      const querySnapshot = await getDocs(q);

      const initialWorldCupList = [];
      console.log(querySnapshot);
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

  useEffect(() => {
    if (searchTitle.value !== '') {
      setFilteredData(
        cups.filter((data) => data.worldCupTitle.toLowerCase().includes(searchTitle.value.toLowerCase()))
      );
    } else {
      setFilteredData([]);
    }
  }, [searchTitle.value]);

  console.log(cups);
  return (
    <SearchListContainer>
      <InputDiv>
        {' '}
        검색
        <SearchInput placeholder="제목을 입력해 주세요." value={searchTitle.value} onChange={searchTitle.onChange} />
      </InputDiv>
      <ContentDiv>
        {searchTitle.value === ''
          ? cups.map((itemList) => {
              return (
                <BoxContentDiv>
                  <BoxDiv
                    style={{ backgroundImage: `url(${itemList.videoList[0].thumbNailUrl})` }}
                    key={itemList.id}
                    onClick={() => navigate(`/detail/${itemList.id}`)}
                  ></BoxDiv>
                  <InfoDiv>
                    <h3>{itemList.worldCupTitle}</h3>
                    <p>{itemList.userId}</p>
                  </InfoDiv>
                </BoxContentDiv>
              );
            })
          : filteredData.map((itemList) => {
              return (
                <BoxContentDiv>
                  <BoxDiv
                    style={{ backgroundImage: `url(${itemList.videoList[0].thumbNailUrl})` }}
                    key={itemList.id}
                    onClick={() => navigate(`/detail/${itemList.id}`)}
                  ></BoxDiv>
                  <InfoDiv>
                    <h3>{itemList.worldCupTitle}</h3>
                    <p>{itemList.userId}</p>
                  </InfoDiv>
                </BoxContentDiv>
              );
            })}
      </ContentDiv>
    </SearchListContainer>
  );
};

export default SearchList;
