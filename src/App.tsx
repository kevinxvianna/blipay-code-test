import React from 'react';
import Router from './router';
import { Navbar } from './components/Navbar';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
