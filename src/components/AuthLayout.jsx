import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = localStorage.getItem('accessToken') ? true : false;

  if (!isAuthenticated) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>Auth Layout 구분용 임시 텍스트.</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
