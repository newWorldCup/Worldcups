import React from 'react';
import { useState, useEffect } from 'react';

const HeaderMargin = () => {
  const [headerMargin, setHeaderMargin] = useState('300px');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newMargin = `${Math.max(100, 300 - scrollY / 4)}px`;

      setHeaderMargin(newMargin);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div style={{ height: headerMargin }}></div>;
};

export default HeaderMargin;
