import React from 'react';
import { Grid, Input, Text, Button } from '../elements/Index';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/User_module';

const Login = () => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const login = () => {
    // if (id === '' || pwd === '') {
    //   window.alert('아이디 혹은 비밀번호가 공란입니다.');
    //   return;
    // }

    // if (!emailCheck(id)) {
    //   window.alert('이메일 형식이 맞지 않습니다.');
    //   return;
    // }

    dispatch(userActions.loginDB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
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
    </React.Fragment>
  );
};

export default Login;
