import { ContactPhoneTwoTone } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const {
    is_flex,
    width,
    padding,
    margin,
    bg,
    children,
    height,
    _onClick,
    display,
    border_radius,
    shadow,
  } = props;

  const styles = {
    is_flex,
    width,
    margin,
    padding,
    bg,
    height,
    display,
    border_radius,
    shadow,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  is_flex: false,
  width: '100%',
  padding: false,
  margin: false,
  bg: false,
  children: null,
  height: false,
  border_radius: '0px',
  shadow: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  box-sizing: border-box;
  background-color: #eae7e7;
  border-radius: ${(props) => props.border_radius};
  ${(props) => (props.height ? `height: ${props.height};` : '')}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')};
  ${(props) =>
    props.is_flex
      ? `display: flex; 
      align-items: stretch; 
      align-content:flex-start; 
      justify-content: flex-start;`
      : ''};
  ${(props) =>
    props.shadow
      ? `-webkit-box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5); 
      box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);`
      : ''}
`;

export default Grid;
