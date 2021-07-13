import React from 'react';
import { Grid, Input, Text, Button } from '../elements/Index';

const Login = () => {
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
          >
            로그인
          </Button>
        </form>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
