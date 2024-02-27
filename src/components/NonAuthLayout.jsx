import LoadingPage from 'pages/signInPage/LoadingPage';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const NonAuthLayout = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NonAuthLayout;
