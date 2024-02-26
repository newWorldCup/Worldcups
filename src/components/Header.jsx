import React, { useState, useEffect } from 'react';
import { HeaderStyle, HeaderContainer, LogoImg, MenuButton, TestBox, HeaderLine, SizedBox } from 'styles/StyledHeader';
import testLogo from 'assets/testlogo3.png';

const Header = () => {
  const [logoWidth, setLogoWidth] = useState('100%');
  const [logoHeight, setLogoHeight] = useState('100%');
  const [headerMargin, setheaderMargin] = useState('60px 0px 0px 0px');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newWidth = `${Math.max(30, 100 - scrollY / 4)}%`;
      const newHeight = `${Math.max(30, 100 - scrollY / 4)}%`;
      const newMargin = `${Math.max(0, 70 - scrollY / 4)}px 0px 0px 0px`;

      setLogoWidth(newWidth);
      setLogoHeight(newHeight);
      setheaderMargin(newMargin);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <HeaderStyle>
        <HeaderContainer>
          <div>
            <MenuButton to="/">List</MenuButton>
            <MenuButton to="/makeWorldCup">NewWorldcup</MenuButton>
          </div>
          <div>
            <MenuButton to="/mypage">Mypage</MenuButton>
            <MenuButton>Logout</MenuButton>
          </div>
        </HeaderContainer>
        {/* 아래 스타일을 스타일 컴포넌트화 시켜서 넣으면 제대로 작동안하는 이슈가 있어 빼서 작성  */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            width: '100%',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          <center>
            <div>
              <LogoImg style={{ width: logoWidth, height: logoHeight, margin: headerMargin }} src={testLogo} />
            </div>
          </center>
          <HeaderLine />
        </div>
      </HeaderStyle>
      <TestBox></TestBox>
    </>
  );
};

export default Header;
