import React from 'react';

import Page from '../Page';
import AccountForms from '../AccountForms';
import SignOut from '../SignOut';
import { UserContext } from '../user-context';

function Account() {
  const currentUser = React.useContext(UserContext);

  const AccountInfoMarkup = (
    <div className="account__info">
      <p>
        You are logged in as {currentUser.firstName} {currentUser.lastName}
      </p>
      <SignOut />
    </div>
  );

  return (
    <Page title="Account">
      {currentUser.firstName ? AccountInfoMarkup : <AccountForms />}
    </Page>
  );
}

export default Account;
