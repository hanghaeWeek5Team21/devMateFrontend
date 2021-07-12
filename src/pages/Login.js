import React from 'react';
import { Grid, Input, Text, Button } from '../elements/Index';
import axios from 'axios';

const Login = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="16px" bold>
          로그인
        </Text>
        <Grid>
          <Input
            label="아이디"
            placeholder="아이디를 입력"
            _onChange={() => {
              console.log('id 입력함!');
            }}
          />
        </Grid>
        <Grid>
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력"
            _onChange={() => {
              console.log('pwd 입력함!');
            }}
          />
        </Grid>
        <Button margin="32px 0px 0px 0px" width="10%">
          로그인하기
        </Button>
      </Grid>
      <form action="http://13.124.12.129/api/user/login" method="post">
        <div className="input-wrapper">
          <input type="text" name="username" placeholder="username" /> <br />
          <input type="password" name="password" placeholder="password" />
        </div>
        <button type="submit">로그인</button>
      </form>
    </React.Fragment>
  );
};

export default Login;
