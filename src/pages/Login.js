import React from 'react';
import { Grid, Input, Text, Button } from '../elements/Index';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/User_module';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { yellow, grey } from '@material-ui/core/colors';
import { config } from "../shared/config";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    backgroundColor: grey[100],
  },
}));

const Login = () => {
  const classes = useStyles();
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
      <Grid margin="auto" width="380px">
        <Card className={classes.root}>
          <Grid padding="30px">
            <Text size="25px" bold width="100%">
              로그인
            </Text>
            <form action={config.api + '/api/user/login'} style={{ margin: "auto" }} method="post">
              <Input
                label="아이디"
                type="text"
                name="username"
                placeholder="아이디를 입력해주세요"
              />
              <Input
                margin="15px 0px 0px 0px"
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
        </Card>
      </Grid>
    </React.Fragment >
  );
};

export default Login;
