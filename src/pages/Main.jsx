import React from 'react';
import { getWorldCups } from '../api/queryFans';
import { useQuery } from 'react-query';
const Main = () => {
  const { isLoading, isError, data } = useQuery('worldCupLists', getWorldCups);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>오류 발생</div>;
  }

  return (
    <div>
      <div>
        {data.map((item) => {
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
        })}
      </div>
    </div>
  );
};

export default Main;
