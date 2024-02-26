import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Detail from 'pages/Detail';
import Login from 'pages/Login';
import Main from 'pages/Main';
import Mypage from 'pages/Mypage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setIsLogin } from '../redux/modules/authSlice';
function Router() {
  const dispatch = useDispatch();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userInfo'));
    console.log(data);
    if (data?.accessToken) {
      dispatch(setIsLogin(true));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
