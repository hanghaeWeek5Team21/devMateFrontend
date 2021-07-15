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
<<<<<<< HEAD
  src: '',
  size: 400,
=======
  src: "",
  size: '400px',
>>>>>>> 3b35622dc23a71379cf4358ee7c1669f360d6643
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

export default Image;
