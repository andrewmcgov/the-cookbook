import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationFn } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../queries';
import Error from '../Error';

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

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>, signIn) {
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
      {(signIn: MutationFn, { loading, error }) => (
        <div className="form-card account-form-card">
          {error && <Error error={error} />}
          <h3 className="account-form-heading">Sign in!</h3>
          <form
            method="post"
            onSubmit={e => handleFormSubmit(e, signIn)}
            className="signin-form"
          >
            <fieldset disabled={loading || disabled}>
              <label htmlFor="signin:email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  id="signin:email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="signin:password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  id="signin:password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </label>
              <div className="account-form-buttons">
                <button className="button button-primary" type="submit">
                  Sign in!
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </Mutation>
  );
}

export default SignIn;
