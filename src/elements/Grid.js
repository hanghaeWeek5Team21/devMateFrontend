import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, padding, margin, bg, children, height, _onClick } = props;

  const styles = {
    is_flex,
    width,
    margin,
    padding,
    bg,
    height,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  children: null,
  height: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  box-sizing: border-box;
  background-color: #eae7e7;
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")};
  ${(props) =>
    props.is_flex
      ? `display: flex; 
      align-items: stretch; 
      align-content:flex-start; 
      justify-content: flex-start;`
      : ""};
`;

export default Grid;
