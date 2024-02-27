import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from 'components/Header';
import Detail from 'pages/Detail';
import Login from 'pages/Login';
import Main from 'pages/Main';
import MakeWorldCup from 'pages/MakeWorldCup';
import Mypage from 'pages/Mypage';
import React from 'react';
import Layout from 'components/Layout';
import AuthLayout from 'components/AuthLayout';
import NonAuthLayout from 'components/NonAuthLayout';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* 로그인 상관없이 로딩되는 페이지 : 메인(리스트), 디테일(게임하는페이지) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/detail" element={<Detail />} />
        </Route>
        {/* 로그인이 필요한 페이지 : 마이페이지, 만들기페이지 */}
        <Route element={<AuthLayout />}>
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/makeWorldCup" element={<MakeWorldCup />} />
        </Route>
        {/* 로그인 상태면 안되는 페이지 : 로그인페이지 */}
        <Route element={<NonAuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
