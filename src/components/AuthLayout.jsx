import LoadingPage from 'pages/signInPage/LoadingPage';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthLayout = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    toast.error('로그인이 필요합니다!');
    return <Navigate to="/signin" replace />;
  }

  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
