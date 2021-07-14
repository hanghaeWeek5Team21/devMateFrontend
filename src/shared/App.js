import React from 'react';

// route
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

// pages
import PostList from '../pages/PostList';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import PostEdit from '../pages/PostEdit';
import PostDetail from '../pages/PostDetail';

// components, elements
import Header from '../components/Header';
import { Grid, Button } from '../elements/Index';

function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header />
        <BrowserRouter>
          <Route path="/" exact component={PostList} />
        </BrowserRouter>
      </Grid>

      <BrowserRouter>
        <Route path="/edit" exact component={PostEdit} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={PostList} />

        <Route path="/detail" exact component={PostDetail} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
