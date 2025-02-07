import React from 'react';
import Styled from 'styled-components';

const Wrapper = Styled.div`
    position: relative;
    color: rgb(117, 117, 117);
`;

const Input = Styled.input`
    width: 100%;
    font-size: 26px;
    height: 36px;
`;

const Clear = Styled.div`
    position: absolute;
    top: 14px;
    right: 10px;
    font-weight: bold;
    cursor: pointer;
`;

function preventArrowKeyEvents(event) {
  if (event.keyCode === 38 || event.keyCode === 40) {
    event.preventDefault();
  }
}

export default ({ hasClear, onClear, ...rest }) => (
  <Wrapper>
    <Input {...rest} onKeyDown={preventArrowKeyEvents} />
    {hasClear ? <Clear onClick={onClear}>X</Clear> : null}
  </Wrapper>
);
