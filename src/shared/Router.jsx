import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Detail from 'pages/Detail';
import SignInPage from 'pages/signInPage/SignInPage';
import Main from 'pages/Main';
import MyPage from 'pages/MyPage';
import SignUpPage from 'pages/signUpPage/SignUpPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import { setIsLogin } from '../redux/modules/authSlice';
=======
import Profile from 'components/Profile';
>>>>>>> 97d993adbda4529bf4b6f333fb898448fa6c0cb8

function Router() {
  const dispatch = useDispatch();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userInfo'));

    if (data?.accessToken) {
      dispatch(setIsLogin(true));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
