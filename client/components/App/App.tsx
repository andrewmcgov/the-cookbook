import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import 'normalize.css';

import Layout from '../Layout';

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

const App = () => (
  <ApolloProvider client={client}>
    <Layout />
  </ApolloProvider>
);

export default App;
