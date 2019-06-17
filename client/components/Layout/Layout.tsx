import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Account from '../Account';
import CreateRecipe from '../CreateRecipe';
import EditRecipe from '../EditRecipe';
import RecipePage from '../RecipePage';
import HomePage from '../HomePage';

const Layout = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/account" component={Account} />
      <Route path="/recipes/new" exact component={CreateRecipe} />
      <Route path="/recipes/:id/edit" exact component={EditRecipe} />
      <Route path="/recipes/:id" exact component={RecipePage} />
    </Switch>
  </Router>
);

export default Layout;
