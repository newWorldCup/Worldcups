import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoadingPage from 'pages/signInPage/LoadingPage';
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const NonAuthLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); //user가 있고 없고에 따라 isAuthenticated값이 바뀌는데 그냥쓰면 true가 아닌 뜨기 때문에 !!연산자로 true로 바꿔줍니다
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    alert('이미 로그인 상태입니다!');
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <h1>Non Auth Layout 구분용 임시 텍스트.</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NonAuthLayout;
