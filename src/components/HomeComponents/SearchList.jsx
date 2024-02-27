import React, { useState, useEffect } from 'react';

import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'firebaseStore/firebaseConfig';
import useFormInput from 'components/common/useFormInput';

import { InputDiv, SemiContentDiv, ContentDiv, BoxDiv, InfoDiv } from 'styles/StyledSearchList';

const SearchList = () => {
  const [cups, setCups] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [searchTitle.value, setSearchTitle] = useState('');
  const searchTitle = useFormInput('');

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

  useEffect(() => {
    if (searchTitle.value !== '') {
      setFilteredData(cups.filter((data) => data.title.toLowerCase().includes(searchTitle.value.toLowerCase())));
    } else {
      setFilteredData([]);
    }
  }, [searchTitle.value]);
  // filter대신 firebase안의 where메소드 사용하여 대신해 보기

  // const { isLoading, error, data } = useQuery({ queryKey: ['worldCupList'], queryFn: getWorldCups });

  // if (isLoading) {
  //   return <div>로딩중...</div>;
  // }

  // if (isError) {
  //   return <div>오류 발생</div>;
  // }

  // const onChangeSearchItems = (e) => {
  //   setSearchTitle(e.target.value);
  // };

  return (
    <>
      <InputDiv>
        {' '}
        검색창:&nbsp;
        <input placeholder="제목을 입력해 주세요." value={searchTitle.value} onChange={searchTitle.onChange} />
      </InputDiv>
      <ContentDiv>
        {searchTitle.value === ''
          ? cups.map((itemList) => {
              return (
                <BoxDiv style={{ backgroundImage: `url(${itemList.thumbNail})` }} key={itemList.id}>
                  <InfoDiv>
                    <h3>{itemList.title}</h3>
                    <p>{itemList.createAt}</p>
                    <p>작성자:&nbsp;{itemList.userId}</p>
                  </InfoDiv>
                </BoxDiv>
              );
            })
          : filteredData.map((itemList) => {
              console.log(itemList);
              return (
                <BoxDiv style={{ backgroundImage: `url(${itemList.thumbNail})` }} key={itemList.id}>
                  <InfoDiv>{itemList.title}</InfoDiv>
                </BoxDiv>
              );
            })}
      </ContentDiv>
    </>
  );
};

export default SearchList;
