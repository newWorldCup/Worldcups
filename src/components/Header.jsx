import React, { useState, useEffect } from 'react';
import { HeaderStyle, HeaderContainer, LogoImg, MenuButton, TestBox, HeaderLine } from './styles';
import testLogo from '../assets/testlogo.png';

function Header() {
  const [logoScale, setLogoScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = Math.max(0.5, 1 - scrollY / 500);

      setLogoScale(newScale);
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
            <MenuButton>List</MenuButton>
            <MenuButton>New Worldcup</MenuButton>
          </div>
          <div>
            <MenuButton>Mypage</MenuButton>
            <MenuButton>Logout</MenuButton>
          </div>
        </HeaderContainer>
        <LogoImg style={{ transform: `scale(${logoScale})` }} src={testLogo} />
        <HeaderLine />
      </HeaderStyle>
      <TestBox></TestBox>
    </>
  );
}

export default Header;
