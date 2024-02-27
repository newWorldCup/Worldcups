import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from 'shared/Router';
import GlobalStyled from 'styles/GlobalStyled';
import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setAuthState } from 'worldCupRedux/modules/authSlice';

function App() {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(
        setAuthState({
          isAuthenticated: !!user,
          loading: false
        })
      ); //user가 있고 없고에 따라 isAuthenticated값이 바뀌는데 그냥쓰면 trusy로 뜨기 때문에 !!연산자로 true로 바꿔줍니다
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <GlobalStyled />
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
