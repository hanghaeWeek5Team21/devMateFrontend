import React from 'react';
import styled from 'styled-components';
import { Text, Grid } from './Index';

const Input = (props) => {
  const {
    multiLine,
    type,
    label,
    placeholder,
    value,
    _onChange,
    name,
    id,
    width,
    readOnly = false,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          id={id}
          rows={10}
          // value={value}
          placeholder={placeholder}
          onChange={_onChange}
          readOnly={readOnly}
        />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElInput
          id={id}
          type={type}
          // value={value}
          placeholder={placeholder}
          onChange={_onChange}
          name={name}
          readOnly={readOnly}
          width={width}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  type: 'text',
  label: false,
  placeholder: '텍스트 입력',
  value: '',
  _onChange: () => {},
  name: '',
  width: '100%',
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: ${(props) => props.width};
  padding: 12px 8px;
  box-sizing: border-box;
  border-radius: 16px;
  outline: none;
`;

export default Input;
