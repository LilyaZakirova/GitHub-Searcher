import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";

import SearchPage from "components/SearchPage";

import { store } from "store";

import styles from "./App.module.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <main className={styles["content"]}>
          <Switch>
            <Redirect exact from="/" to="/search" />
            <Route exact path="/search">
              <SearchPage />
            </Route>
            <Route component={() => <div>Not Found</div>} />
          </Switch>
        </main>
      </Router>
    </Provider>
  );
};

export default App;
