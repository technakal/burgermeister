import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classes from './App.module.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Layout } from './hoc/Layout/Layout';
import { CheckOut } from './containers/CheckOut/CheckOut';
import Orders from './components/Orders/Orders';

function App() {
  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/checkout" component={CheckOut} />
            <Route path="/orders" component={Orders} />
            <Route exact path="/" component={BurgerBuilder} />
            <Route>Not Found</Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
