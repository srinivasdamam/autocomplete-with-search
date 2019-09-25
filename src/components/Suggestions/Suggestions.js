import React from 'react';
import Styled from 'styled-components';
import Suggestion from '../Suggestions/Suggestion';

const CARDS_CONTAINER_HEIGHT = '384px';

const Wrapper = Styled.div.attrs(() => ({ id: 'suggestions_wrapper' }))`
    position: absolute;
    width: 50vw;
    max-height: ${CARDS_CONTAINER_HEIGHT};
    padding: 1px;
    border: ${props => (props.showBorder ? '2px solid #dfdfdf' : 0)};
    overflow-y: scroll;  
`;

export default ({ suggestions, activeIndex, onMouseOverCallback }) => (
  <Wrapper showBorder={suggestions.length}>
    {suggestions.map((suggestion, index) => (
      <Suggestion
        key={suggestion.id}
        index={index}
        active={index === activeIndex}
        suggestion={suggestion}
        onMouseOverCallback={onMouseOverCallback}
      />
    ))}
  </Wrapper>
);
