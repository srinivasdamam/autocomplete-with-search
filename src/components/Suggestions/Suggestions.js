import React from 'react';
import Styled from 'styled-components';
import Suggestion from '../Suggestions/Suggestion';
import NoMatches from './NoMatches';

const CARDS_CONTAINER_HEIGHT = '384px';

const Wrapper = Styled.div.attrs(() => ({ id: 'suggestions_wrapper' }))`
    position: absolute;
    width: 50vw;
    max-height: ${CARDS_CONTAINER_HEIGHT};
    padding: 1px;
    border: ${props => (props.showBorder ? '2px solid #dfdfdf' : 0)};
    overflow-y: scroll;  
`;

const Suggestions = React.forwardRef(
  ({ suggestions, searchTerm, activeIndex, onMouseOverCallback }, ref) => (
    <div>
      <Wrapper showBorder={searchTerm}>
        {searchTerm && !suggestions.length ? (
          <NoMatches message={`No matches found`} />
        ) : null}
        {suggestions.map((suggestion, index) => (
          <div ref={index === activeIndex ? ref : null} key={suggestion.id}>
            <Suggestion
              index={index}
              active={index === activeIndex}
              suggestion={suggestion}
              onMouseOverCallback={onMouseOverCallback}
            />
          </div>
        ))}
      </Wrapper>
    </div>
  )
);

export default Suggestions;
