import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation, MutationFn } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../Account/Account';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $repeatPassword: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      repeatPassword: $repeatPassword
    ) {
      firstName
      lastName
      email
    }
  }
`;

function SignIn() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  function handleFormSubmit(
    e: React.FormEvent<HTMLFormElement>,
    signUp: MutationFn
  ) {
    e.preventDefault();
    signUp({
      variables: {
        firstName,
        lastName,
        email,
        password,
        repeatPassword
      }
    });
  }

  return (
    <Mutation
      mutation={SIGN_UP_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signUp: MutationFn, { loading }) => (
        <div className="form-card">
          <h3>Sign up!</h3>
          <form
            method="post"
            onSubmit={e => handleFormSubmit(e, signUp)}
            className="signin-form"
          >
            <fieldset disabled={loading}>
              <label htmlFor="signin:firstName">First name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                id="signup:firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <label htmlFor="signin:lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                id="signup:lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              <label htmlFor="signin:email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email"
                id="signup:email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor="signin:password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                id="signup:password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <label htmlFor="signin:repeatPassword">Repeat Password</label>
              <input
                type="password"
                name="repeatPassword"
                placeholder="Repeat password"
                id="signup:repeatPassword"
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
              />
              <button type="submit">Sign up!</button>
            </fieldset>
          </form>
        </div>
      )}
    </Mutation>
  );
}

export default SignIn;
