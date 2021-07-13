import React from 'react';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Text, Button } from '../elements/Index';

import { actionCreators as userActions } from '../redux/modules/User_module';
import { getCookie, setCookie, deleteCookie } from '../shared/Cookie';

const Header = (props) => {
  let is_login = getCookie('is_login');

  const logout = () => {
    deleteCookie('is_login');
    deleteCookie('user');
    window.alert('로그아웃 되었습니다.');
    document.location.href = '/';
  };

  if (is_login) {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid>
            <Text>DEVMATE</Text>
          </Grid>
          <Grid>
            <Grid is_flex>
              <Grid margin="0px 4px 0px 0px">
                <Button _onClick={() => {
                  document.location.href = '/edit';
                }}
                >내 정보</Button>
              </Grid>
              <Button
                _onClick={() => {
                  logout();
                }}
              >
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text>DEVMATE</Text>
        </Grid>
        <Grid>
          <Grid is_flex>
            <Grid margin="0px 4px 0px 0px">
              <Button
                _onClick={() => {
                  document.location.href = '/login';
                }}
              >
                로그인
              </Button>
            </Grid>
            <Button
              _onClick={() => {
                document.location.href = '/signup';
              }}
            >
              회원가입
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
