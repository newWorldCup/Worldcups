import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
function App() {
  const queryClient = QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
