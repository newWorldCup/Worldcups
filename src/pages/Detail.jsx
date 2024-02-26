import React from 'react';
import { useEffect, useState } from 'react';
import { WorldcupGame } from '../styles/StyledDetail.jsx';

const items = [
  {
    name: '1',
    src: require('../assets/testlogo2.png')
  },
  {
    name: '2',
    src: require('../assets/testlogo2.png')
  },
  {
    name: '3',
    src: require('../assets/testlogo2.png')
  },
  {
    name: '4',
    src: require('../assets/testlogo2.png')
  }
];

const Detail = () => {
  const [loves, setLoves] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);
  useEffect(() => {
    items.sort(() => Math.random() - 0.5);
    setLoves(items);
    setDisplays([items[0], items[1]]);
  }, []);

  const clickHandler = (food) => () => {
    if (loves.length <= 2) {
      if (winners.length === 0) {
        setDisplays([food]);
      } else {
        let updatedFood = [...winners, food];
        setLoves(updatedFood);
        setDisplays([updatedFood[0], updatedFood[1]]);
        setWinners([]);
      }
    } else if (loves.length > 2) {
      setWinners([...winners, food]);
      setDisplays([loves[2], loves[3]]);
      setLoves(loves.slice(2));
    }
  };

  return (
    <WorldcupGame>
      <h1 className="title">My Worldcup</h1>
      {displays.map((item) => {
        return (
          <div className="flex-1" key={item.name} onClick={clickHandler(item)}>
            <img className="img" src={item.src} />
            <div className="name">{item.name}</div>
          </div>
        );
      })}
    </WorldcupGame>
  );
};

export default Detail;
