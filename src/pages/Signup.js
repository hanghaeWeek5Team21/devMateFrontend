import React from 'react';
import { Grid, Input, Text, Button, Image } from '../elements';
import axios from 'axios';

const Signup = (props) => {
  const register = () => {
    axios.post(
      'http://13.124.12.129/api/comment',
      {
        user_id: 1,
        contents: '댓글입니다',
      },
      { withCredentials: true }
    );
  };

  // function patch_account() {
  //   axios.patch(
  //     'http://13.124.12.129/api/user',
  //     {
  //       password: '1234',
  //       name: '형도김',
  //       skill: 'SPRING',
  //       introduce: '안녕하세요 김도형입니다',
  //       image_url: 'www.url.com',
  //     },
  //     { withCredentials: true }
  //   );
  // }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Grid is_flex>
          <Grid padding="16px">
            <Image size="400" src="http://via.placeholder.com/400x300" />
            <input type="file" />
            <Button>업로드</Button>
          </Grid>
          <Grid padding="16px">
            <Text size="32px" bold>
              회원가입
            </Text>
            <Grid padding="16px 0px">
              <Input
                label="이메일"
                placeholder="이메일을 입력해주세요"
                _onChange={() => {}}
              />
            </Grid>
            <Grid padding="16px 0px">
              <Input
                label="이름"
                placeholder="이름을 입력해주세요"
                _onChange={() => {}}
              />
            </Grid>
            <Grid padding="16px 0px">
              <Input
                label="비밀번호"
                placeholder="비밀번호을 입력해주세요"
                _onChange={() => {}}
              />
            </Grid>
            <Grid padding="16px 0px">
              <Input
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력해주세요"
                _onChange={() => {}}
              />
            </Grid>
          </Grid>
        </Grid>
        <div style={{ width: '100%', height: '1px', background: 'red' }}></div>
        <Button margin="8px 0px">주특기 선택</Button>
        <Input type="" />
        <Input multiLine></Input>
        <Button margin="24px 0px 0px 0px" _onClick={() => register()}>
          등록하기
        </Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
