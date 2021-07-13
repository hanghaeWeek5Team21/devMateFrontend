import React from 'react';
import { Grid, Input, Text, Button, Image } from '../elements/Index';
import axios from 'axios';

import { useDispatch } from 'react-redux';

import { actionCreators as userActions } from '../redux/modules/User_module';

const SignUp = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwd_check, setPwdCheck] = React.useState('');
  const [user_name, setUserName] = React.useState('');
  const [skill, setSkill] = React.useState('');
  const [introduce, setIntroduce] = React.useState('');
  const [image_url, setImageURL] = React.useState('');

  const signup = () => {
    // if (
    //   id === '' ||
    //   pwd === '' ||
    //   user_name === '' ||
    //   skill === '' ||
    //   introduce === '' ||
    //   image_url
    // ) {
    //   window.alert('모두 입력해주세요');
    //   return;
    // }
    // if (!emailCheck(id)) {
    //   window.alert('이메일 형식이 맞지 않습니다.');
    //   return;
    // }
    if (pwd !== pwd_check) {
      window.alert('비밀번호와 일치하지 않습니다.');
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name, skill));
  };

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
                _onChange={(e) => {
                  setId(e.target.value);
                }}
              />
            </Grid>
            <Grid padding="16px 0px">
              <Input
                label="이름"
                placeholder="이름을 입력해주세요"
                _onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </Grid>
            <Grid padding="16px 0px">
              <Input
                label="비밀번호"
                placeholder="비밀번호을 입력해주세요"
                _onChange={(e) => {
                  setPwd(e.target.value);
                }}
              />
            </Grid>
            <Grid padding="16px 0px">
              <Input
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력해주세요"
                _onChange={(e) => {
                  setPwdCheck(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <div style={{ width: '100%', height: '1px', background: 'red' }}></div>
        {/* <label for="skill">주특기 선택</label> */}
        <input
          type="radio"
          name="skill"
          value="SPRING"
          onChange={(e) => {
            setSkill(e.target.value);
          }}
        />
        SPRING
        <input
          type="radio"
          name="skill"
          value="NODE"
          onChange={(e) => {
            setSkill(e.target.value);
          }}
        />
        NODE
        <input
          type="radio"
          name="skill"
          value="REACT"
          onChange={(e) => {
            setSkill(e.target.value);
          }}
        />
        REACT
        <Input
          label="자기소개"
          multiLine
          _onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <Button margin="24px 0px 0px 0px" _onClick={signup}>
          등록하기
        </Button>
        <textarea
          onChange={(e) => {
            console.log(e.target.value);
          }}
        ></textarea>
      </Grid>
    </React.Fragment>
  );
};

SignUp.defaultProps = {};

export default SignUp;
