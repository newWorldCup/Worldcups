import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout';
import SignInPage from 'pages/signInPage/SignInPage';
import AuthLayout from 'components/AuthLayout';
import NonAuthLayout from 'components/NonAuthLayout';
import Header from 'components/Header';
import Detail from 'pages/Detail';
import Main from 'pages/Main';
import MyPage from 'pages/Mypage';
import MakeWorldCup from 'pages/MakeWorldCup';
import SignUpPage from 'pages/signUpPage/SignUpPage';

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
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/makeWorldCup" element={<MakeWorldCup />} />
        </Route>
        {/* 로그인 상태면 안되는 페이지 : 로그인페이지 */}
        <Route element={<NonAuthLayout />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
