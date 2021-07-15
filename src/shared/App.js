import React from "react";
import styled from "styled-components";

// route
import { BrowserRouter, Route } from "react-router-dom";

// pages
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import PostEdit from "../pages/PostEdit";
import PostDetail from "../pages/PostDetail";
import MainPage from "../pages/MainPage";

// components, elements
import Header from "../components/Header";
import { Grid, Button } from "../elements/Index";

function App() {
  return (
    <ReactContainer>
      <Grid>
        <Header />
        <BrowserRouter>
          <Route path="/" exact component={MainPage} />
        </BrowserRouter>
      </Grid>

      <BrowserRouter>
        <Route path="/detail/*" exact component={PostDetail} />
        <Route path="/edit" exact component={PostEdit} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
      </BrowserRouter>
    </ReactContainer>
  );
}

const ReactContainer = styled.div`
  background-color: #fafafa;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;

export default App;
