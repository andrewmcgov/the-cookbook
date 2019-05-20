import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Layout from '../Layout';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  fetchOptions: {
    credentials: 'include'
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <Layout />
  </ApolloProvider>
);

export default App;
