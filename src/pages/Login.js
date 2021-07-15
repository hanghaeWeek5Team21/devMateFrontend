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

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Grid>
          <Text size="16px" bold>
            로그인
          </Text>
          <form action="http://localhost/api/user/login" method="post">
            <Input
              label="아이디"
              type="text"
              name="username"
              placeholder="아이디를 입력해주세요"
            />
            <Input
              label="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호를 입력를 입력해주세요"
            />
            <Text size="5px" color="red">
              {getRes() ? '' : '로그인에 실패했습니다.'}
            </Text>
            <Button
              type="submit"
              margin="24px 0px 0px 0px"
              _onClick={() => {
                console.log('로그인 했어!');
                login();
              }}
            >
              로그인
            </Button>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
