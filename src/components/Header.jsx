import React, { useState, useEffect } from 'react';
import { HeaderStyle, HeaderContainer, LogoImg, MenuButton, HeaderLine } from 'styles/StyledHeader';
import testLogo from 'assets/testlogo3.png';

import { auth } from 'firebaseStore/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import HeaderMargin from 'components/HeaderMargin';

const Header = () => {
  const navigate = useNavigate();
  const [logoWidth, setLogoWidth] = useState('100%');
  const [logoHeight, setLogoHeight] = useState('100%');
  const [logoMargin, setLogoMargin] = useState('60px 0px 0px 0px');
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newWidth = `${Math.max(30, 100 - scrollY / 4)}%`;
      const newHeight = `${Math.max(30, 100 - scrollY / 4)}%`;
      const newMargin = `${Math.max(0, 70 - scrollY / 4)}px 0px 0px 0px`;

      setLogoWidth(newWidth);
      setLogoHeight(newHeight);
      setLogoMargin(newMargin);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      alert('로그아웃 되었습니다.');
      navigate('/signin');
      localStorage.removeItem('uid');
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  };

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
            <MenuButton onClick={logoutHandler}>Logout</MenuButton>
          </div>
        </HeaderContainer>
        {/* 아래 스타일을 스타일 컴포넌트화 시켜서 넣으면 제대로 작동안하는 이슈가 있어 빼서 작성  */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            width: '100%',
            justifyContent: 'center',
            pointerEvents: 'none',
            backgroundColor: '#ffffff'
          }}
        >
          <center>
            <div>
              <LogoImg style={{ width: logoWidth, height: logoHeight, margin: logoMargin }} src={testLogo} />
            </div>
          </center>
          <HeaderLine />
        </div>
      </HeaderStyle>
      <HeaderMargin />
    </>
  );
};

export default Header;
