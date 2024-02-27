import LoadingPage from 'pages/signInPage/LoadingPage';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    alert('로그인이 필요합니다!');
    return <Navigate to="/signin" replace />;
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
