import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

const TEST_QUERY = gql`
  {
    testQuery
  }
`;

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1>The Cookbook 👨🏻‍🍳👩🏻‍🍳</h1>
          <p>A place to find and store recepies.</p>
        </div>
        <Query query={TEST_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading..</p>;
            if (error) return <p>Error...</p>;
            return <p>Test query successful!</p>;
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
