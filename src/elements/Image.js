import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
  const { src, size, id } = props;

  const styles = {
    src,
    size,
  };

  return <ImageDefault id={id} {...styles}></ImageDefault>;
};

Image.defaultProps = {
  src: "",
  size: 400,
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

export default Image;
