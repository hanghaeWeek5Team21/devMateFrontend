import React from 'react';
import { Grid, Input, Text, Button, Image } from '../elements/Index';
import axios from 'axios';
import { config } from "../shared/config";

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
  const [image_url, setImageURL] = React.useState(null);

  const uploadImage = () => {
    let file = document.getElementById("image-input").files[0];
    if (file == null) {
      window.alert("파일을 입력해주세요.");
      return;
    }
    const spinner = 'https://devmate.s3.ap-northeast-2.amazonaws.com/image/frontend/loading.gif';
    document.getElementById("image-show").src = spinner;

    const formData = new FormData();
    formData.append('file', file);
    axios.post(config.api + '/api/file/image', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(
        response => {
          if (response.data.res) {
            document.getElementById("image-show").src = response.data.result;
            window.alert(response.data.msg);
            setImageURL(response.data.result);
          } else {
            window.alert(response.data.msg);
          }
        }
      );
  };

  const signup = () => {
    if (
      id === '' ||
      pwd === '' ||
      user_name === '' ||
      skill === '' ||
      introduce === '' ||
      image_url === null
    ) {
      window.alert('모두 입력해주세요');
      return;
    }
    // if (!emailCheck(id)) {
    //   window.alert('이메일 형식이 맞지 않습니다.');
    //   return;
    // }
    if (pwd !== pwd_check) {
      window.alert('비밀번호와 일치하지 않습니다.');
      return;
    }

    dispatch(userActions.signupDB(id, pwd, user_name, skill, image_url));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Grid is_flex>
          <Grid padding="16px">
            <img size="400" id="image-show"
              style={{ display: 'flex', justifyContent: 'center', margin: 'auto', width: '400px', height: '300px' }}
              src="http://via.placeholder.com/400x300" />
            <input type="file" id="image-input" />
            <Button _onClick={uploadImage}>업로드</Button>
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
            setIntroduce(e.target.value);
          }}
        />
        <Button margin="24px 0px 0px 0px" _onClick={signup}>
          등록하기
        </Button>
      </Grid>
    </React.Fragment>
  );
};

SignUp.defaultProps = {};

export default SignUp;
