import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from 'react-bootstrap';
import { Resources } from './components/Resources';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';


const overrides = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
};
const client = new QueryClient(overrides);

function App() {
  return (
    <QueryClientProvider client={client}>
      <ToastContainer />
      <Container>
        <Resources />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
