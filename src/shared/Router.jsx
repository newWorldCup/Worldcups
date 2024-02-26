import Detail from 'pages/Detail';
import SignInPage from 'pages/signInPage/SignInPage';
import Main from 'pages/Main';
import Mypage from 'pages/Mypage';
import SignUpPage from 'pages/signUpPage/SignUpPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
