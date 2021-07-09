import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { src, size } = props;

  const styles = {
    src,
    size,
  };

  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  src: "https://spartacodingclub.kr/static/css/images/ogimage2.jpg",
  size: 400,
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Image;
