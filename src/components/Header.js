import React from 'react';
import { Grid, Text, Button } from '../elements';

const Header = (props) => {
  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text>DEVMATE</Text>
        </Grid>
        <Grid>
          <Grid is_flex>
            <Grid margin="0px 4px 0px 0px">
              <Button>로그인</Button>
            </Grid>
            <Button>회원가입</Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
