import React from 'react';
import Styled from 'styled-components';

const Wrapper = Styled.div`
    position: relative;
    height: 128px;
`;

const Centered = Styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
`;

export default ({ message }) => (
  <Wrapper>
    <Centered>{message}</Centered>
  </Wrapper>
);
