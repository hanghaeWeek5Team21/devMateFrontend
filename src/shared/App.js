import React from "react";

// route
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

// pages
import PostList from "../pages/PostList";

// components, elements
import Header from "../components/Header";
import { Grid, Button } from "../elements/Index";

function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header />
        <BrowserRouter>
          <Route path="/" exact component={PostList} />
        </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
