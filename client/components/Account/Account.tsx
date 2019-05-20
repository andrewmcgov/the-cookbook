import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Page from '../Page';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import SignOut from '../SignOut';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      email
      firstName
      lastName
    }
  }
`;

interface Data {
  currentUser: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

function Account() {
  const [signUp, setSignUp] = useState(false);

  function handleFormChange(e) {
    e.preventDefault();

    setSignUp(signUp => !signUp);
  }

  return (
    <Page title="Account">
      <Query<Data> query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Oops! Issue loading current user.</p>;

          const { currentUser: user } = data;

          if (!user) {
            return (
              <>
                {signUp ? (
                  <>
                    <SignUp />
                    <p>
                      Already have an account? Click{' '}
                      <a href="" onClick={e => handleFormChange(e)}>
                        here
                      </a>{' '}
                      to sign in!
                    </p>
                  </>
                ) : (
                  <>
                    <SignIn />
                    <p>
                      Need an account? Click{' '}
                      <a href="" onClick={e => handleFormChange(e)}>
                        here
                      </a>{' '}
                      to sign up!
                    </p>
                  </>
                )}
              </>
            );
          }

          return (
            <>
              <p>
                Logged in as {user.firstName} {user.lastName}
              </p>
              <SignOut />
            </>
          );
        }}
      </Query>
    </Page>
  );
}

export default Account;
