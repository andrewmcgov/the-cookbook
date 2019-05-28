import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from '../Header';
import Account from '../Account';
import CreateRecipe from '../CreateRecipe';

function Index() {
  return (
    <div>
      <p>Homepage</p>
    </div>
  );
}

const Layout = () => (
  <Router>
    <Header />
    <Route path="/" exact component={Index} />
    <Route path="/account" component={Account} />
    <Route path="/recipes/new" component={CreateRecipe} />
  </Router>
);

export default Layout;
