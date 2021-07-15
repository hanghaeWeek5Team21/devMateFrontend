import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import banner from "../shared/banner.png";

import { Grid, Text, Button } from "../elements/Index";

import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

const Header = (props) => {
  let is_login = getCookie("is_login");
  let user = getCookie("user");

  const logout = () => {
    deleteCookie("is_login");
    deleteCookie("user");
    window.alert("로그아웃 되었습니다.");
    document.location.href = "/";
  };

  if (is_login && user != null && user != 'null' && user != '') {
    return (
      <React.Fragment>
        <Grid is_flex padding="20px 20px">
          <Grid>
            <img
              src={banner}
              height="70px"
              onClick={() => {
                document.location.href = "/";
              }}
            />
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              margin="0px 10px 0px 0px"
              _onClick={() => {
                document.location.href = "/edit";
              }}
            >
              내 정보
            </Button>
            <Button
              _onClick={() => {
                logout();
              }}
            >
              로그아웃
            </Button>
          </div>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Grid is_flex padding="20px 20px">
        <Grid>
          <img
            src={banner}
            height="70px"
            onClick={() => {
              document.location.href = "/";
            }}
          />
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            margin="0px 10px 0px 0px"
            _onClick={() => {
              document.location.href = "/login";
            }}
          >
            로그인
          </Button>
          <Button
            _onClick={() => {
              document.location.href = "/signup";
            }}
          >
            회원가입
          </Button>
        </div>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

const imageLogo = styled.div`
  width: 30px;
  height: 30px;
  background-size: cover;
  src: "https://www.canva.com/design/DAEkQPWiyQY/wrmGhPlLL8V32mDDfVOgYA/view?utm_content=DAEkQPWiyQY&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink";
`;

export default Header;
