import React from 'react';
import Styled from 'styled-components';

const Wrapper = Styled.div.attrs(() => ({
    className: 'suggestion'
}))`
    padding: 10px;
    background: ${props => props.active ? '#ffef5f33' : '#fff'}
`;

const ID = Styled.div`
    text-transform: uppercase;
    text-transform
    margin-top: 8px;
    margin-bottom: 8px;
`;

const Name = Styled.div`
    font-style: italic;
`;

const FoundInItems = Styled.div`
    font-size: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    border: 1px solid grey;
    border-left: 0;
    border-right: 0;
 `

export default ({ suggestion, index, active, onMouseOverCallback }) => (
    <Wrapper active={active}
             onMouseOver={() => onMouseOverCallback(index)}
             onFocus={() => onMouseOverCallback(index)}>
        <ID as="h5"
            dangerouslySetInnerHTML={{__html: suggestion._highlights['id']._html}}
        />
        <Name as="p" dangerouslySetInnerHTML={{__html: suggestion._highlights['name']._html}}/>
        { suggestion._meta.foundInItems ? (
            <FoundInItems>
                <span>&quot;{suggestion._meta.searchTerm}&quot;</span> found in items
            </FoundInItems>
        ) : null }
        <p dangerouslySetInnerHTML={{__html: suggestion._highlights['address']._html}}/>
    </Wrapper>
);


