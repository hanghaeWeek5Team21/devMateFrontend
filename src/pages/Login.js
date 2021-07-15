import React from 'react';
import { Grid, Input, Text, Button } from '../elements/Index';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/User_module';

const Login = () => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const login = () => {
    dispatch(userActions.loginDB(id, pwd));
  };

  const getRes = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.res == 'false') return false;
    return true;
  };

  const background = {
    background: 'url("/static/img/back_img_org.jpg") no- repeat center center fixed',
    webkitBackgroundSize: 'cover',
    mozBackgroundSize: 'cover',
    oBackgroundSize: 'cover',
    backgroundSize: 'cover',
  }

  const login_bg = "#dedede";

  return (
    <React.Fragment>
      <div style={{ display: "flex", alignItem: "center", justifyContent: "center", height: "calc(100vh - 61px)" }}>
        <Grid margin="auto" width="380px" bg={login_bg} padding="30px" border_radius="15px">
          <Text size="25px" bold width="100%">
            로그인
          </Text>
          <form action="http://localhost/api/user/login" style={{ margin: "auto" }} method="post">
            <Input
              bg={login_bg}
              label="아이디"
              type="text"
              name="username"
              placeholder="아이디를 입력해주세요"
            />
            <Input
              bg={login_bg}
              label="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호를 입력를 입력해주세요"
            />
            <Text size="5px" color="red">{getRes() ? '' : "로그인에 실패했습니다."}</Text>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                _onClick={() => {
                  console.log('로그인 했어!');
                  login();
                }}
              >
                로그인
              </Button>
            </div>
          </form>
        </Grid>
      </div>
    </React.Fragment >
  );
};

export default Login;
