import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../Account/Account';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String, $password: String) {
    signIn(email: $email, password: $password) {
      firstName
      lastName
      email
    }
  }
`;

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);

  function handleFormSubmit(e, signIn) {
    e.preventDefault();
    signIn({
      variables: {
        email,
        password
      }
    });
  }

  return (
    <Mutation
      mutation={SIGN_IN_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signIn, { loading }) => (
        <div className="form-card">
          <h3>Sign in!</h3>
          <form
            method="post"
            onSubmit={e => handleFormSubmit(e, signIn)}
            className="signin-form"
          >
            <fieldset disabled={loading || disabled}>
              <label htmlFor="signin:email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                id="signin:email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor="signin:password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                id="signin:password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="submit">Sign in!</button>
            </fieldset>
          </form>
        </div>
      )}
    </Mutation>
  );
}

export default SignIn;
