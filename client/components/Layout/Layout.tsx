import * as React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useQuery} from 'react-apollo';

import {UserContext} from '../user-context';
import {CURRENT_USER_QUERY} from '../queries';
import {ICurrentUserQuery} from '../types';
import Page from '../Page';
import AccountForms from '../AccountForms';
import Header from '../Header';
import Account from '../Account';
import CreateRecipe from '../CreateRecipe';
import EditRecipe from '../EditRecipe';
import RecipePage from '../RecipePage';
import HomePage from '../HomePage';
import SearchPage from '../SearchPage';

const Layout = () => {
  const {data, loading} = useQuery<ICurrentUserQuery>(CURRENT_USER_QUERY);

  const user = data.currentUser ? data.currentUser : null;
  const loadingMarkup = loading ? <p>Loading...</p> : null;

  const loginMarkup =
    user === null && !loading ? (
      <Page title="Please login">
        <AccountForms />
      </Page>
    ) : null;

  const contentMarkup = user ? (
    <UserContext.Provider value={user}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/account" component={Account} />
        <Route path="/recipes/new" exact component={CreateRecipe} />
        <Route path="/recipes/:id/edit" exact component={EditRecipe} />
        <Route path="/recipes/:id" exact component={RecipePage} />
        <Route path="/search" exact component={SearchPage} />
      </Switch>
    </UserContext.Provider>
  ) : null;

  return (
    <Router>
      <Header />
      {loadingMarkup}
      {loginMarkup}
      {contentMarkup}
    </Router>
  );
};

export default Layout;
