import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

const SearchList = () => {
  const [cups, setCups] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

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
    console.log(searchTitle);
    if (searchTitle !== '') {
      setFilteredData(cups.filter((data) => data.title.toLowerCase().includes(searchTitle.toLowerCase())));
    } else {
      setFilteredData([]);
    }
  }, [searchTitle]);

  // const { isLoading, error, data } = useQuery({ queryKey: ['worldCupList'], queryFn: getWorldCups });

  // if (isLoading) {
  //   return <div>로딩중...</div>;
  // }

  // if (isError) {
  //   return <div>오류 발생</div>;
  // }

  const onChangeSearchItems = (e) => {
    setSearchTitle(e.target.value);
  };

  const onClickResetBtn = () => {
    setFilteredData([]);
    setSearchTitle('');
  };

  return (
    <>
      <InputDiv>
        {' '}
        검색창:&nbsp;
        <input placeholder="제목을 입력해 주세요." onChange={onChangeSearchItems} />
        <button onClick={onClickResetBtn}>리셋</button>
      </InputDiv>
      <SemiContentDiv>
        <ContentDiv>
          {searchTitle === ''
            ? cups.map((itemList) => {
                return (
                  <BoxDiv style={{ backgroundImage: `url(${itemList.thumbNail})` }} key={itemList.id}>
                    <InfoDiv>
                      <TitleH3>{itemList.title}</TitleH3>
                      <ContentP>{itemList.createAt}</ContentP>
                      <ContentP>작성자:&nbsp;{itemList.userId}</ContentP>
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
      </SemiContentDiv>
    </>
  );
};

export default SearchList;

const InputDiv = styled.div`
  margin: 10px 0px;
`;
const SemiContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContentDiv = styled.div`
  justify-content: flex-start;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  align-items: center;
  background-color: skyblue;
  width: 90%;
  opacity: 1;
  -webkit-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  :hover {
    filter: brightness(50%);
  }
`;

const BoxDiv = styled.div`
  border: 1px solid blue;
  border-radius: 5px;
  width: 200px;
  height: 250px;
  margin: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const InfoDiv = styled.div`
  opacity: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;
`;

const TitleH3 = styled.h3``;

const ContentP = styled.p``;
