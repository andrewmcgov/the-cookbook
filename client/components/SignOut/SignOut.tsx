import React from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationFn } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../Account/Account';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut
  }
`;

function SignOut() {
  return (
    <Mutation
      mutation={SIGN_OUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signOut: MutationFn, { loading }) => (
        <button onClick={() => signOut()} disabled={loading}>
          Sign out!
        </button>
      )}
    </Mutation>
  );
}

export default SignOut;
