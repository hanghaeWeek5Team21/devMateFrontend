import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  const { type, label, placeholder, _onChange } = props;

  return (
    <React.Fragment>
      <p>{label}</p>
      <ElInput placeholder={placeholder} onChange={_onChange} />
    </React.Fragment>
  );
};

Input.defaultProps = {
  type: 'text',
  label: false,
  placeholder: '텍스트 입력',
  _onChange: () => {},
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
