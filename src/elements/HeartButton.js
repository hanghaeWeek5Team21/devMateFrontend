import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import heart_pink from "../shared/heart_pink.png";
import heart_gray from "../shared/heart_gray.png";

const HeartButton = React.memo((props) => {
  const icon_url = props.is_like ? heart_pink : heart_gray;

  return (
    <React.Fragment>
      <Heart onClick={props._onClick} icon_url={icon_url}></Heart>
    </React.Fragment>
  );
});

const Heart = styled.div`
  width: 25px;
  height: 25px;
  display: inline-flex;
  background: url(${(props) => props.icon_url});
  background-size: cover;
  cursor: pointer;
  position: relative;
  margin: 6px;
`;

export default HeartButton;
