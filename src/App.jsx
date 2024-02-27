import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from 'shared/Router';
import GlobalStyled from 'styles/GlobalStyled';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <GlobalStyled />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
