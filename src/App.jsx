import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from 'shared/Router';
import GlobalStyled from 'styles/GlobalStyled';

function App() {
  const queryClient = new QueryClient();
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
