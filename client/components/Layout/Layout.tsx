import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';

import { UserContext } from '../user-context';
import { CURRENT_USER_QUERY } from '../queries';
import { ICurrentUserQuery } from '../types';
import Header from '../Header';
import Account from '../Account';
import CreateRecipe from '../CreateRecipe';
import EditRecipe from '../EditRecipe';
import RecipePage from '../RecipePage';
import HomePage from '../HomePage';

const Layout = () => (
  <Router>
    <Header />
    <Query<ICurrentUserQuery> query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) return null;
        let user = {};

        if (data.currentUser) {
          user = data.currentUser;
        }

        return (
          <UserContext.Provider value={user}>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/account" component={Account} />
              <Route path="/recipes/new" exact component={CreateRecipe} />
              <Route path="/recipes/:id/edit" exact component={EditRecipe} />
              <Route path="/recipes/:id" exact component={RecipePage} />
            </Switch>
          </UserContext.Provider>
        );
      }}
    </Query>
  </Router>
);

export default Layout;
