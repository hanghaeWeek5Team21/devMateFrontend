import React from "react";

// route
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

// pages
import PostList from "../pages/PostList";
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

// components

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={PostList} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
