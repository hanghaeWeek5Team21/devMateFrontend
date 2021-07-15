import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, margin, _onClick, textAlign, width } =
    props;
  const styles = { bold, color, size, margin, textAlign, width };

  return (
    <React.Fragment>
      <P {...styles} onClick={_onClick}>
        {children}
      </P>
    </React.Fragment>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "222831",
  size: "16px",
  margin: false,
  textAlign: "",
  width: "fit-content",
  _onClick: () => {},
};

const P = styled.p`
  text-align: ${(props) => props.textAlign};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  width: ${(props) => props.width};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")}
`;

export default Text;
