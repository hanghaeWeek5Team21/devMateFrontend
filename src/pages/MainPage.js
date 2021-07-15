import React from "react";
import styled from "styled-components";
import PostList from "./PostList";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const MainPage = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <MainContainer>
          {/* <Grid container spacing={1}>
            <Grid container item xs={6} spacing={3}> */}
          <PostList />
          {/* </Grid>
          </Grid> */}
        </MainContainer>
      </Container>
    </React.Fragment>
  );
};

const MainContainer = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

export default MainPage;
