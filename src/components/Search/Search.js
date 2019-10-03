import React, { Fragment } from 'react';
import { string, number } from 'prop-types';
import Input from './Input';
import Suggestions from '../Suggestions/Suggestions';
import { memoizedTransformAndFilterSuggestions } from '../../utils';

// arrow up, down event code
const ARROW_KEY_EVENT_CODES = [38, 40];

// height of container holding cards
const CARDS_CONTAINER_HEIGHT = 384;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      activeIndex: null,
      searchTerm: '',
      shouldScrollIntoView: false,
      hideCursor: false, // state of cursor when keyboard is being used
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('mousemove', this.showCursor);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.activeIndex !== prevState.activeIndex &&
      this.state.shouldScrollIntoView
    ) {
      this.scrollToActiveIndex();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('mousemove', this.showCursor);
  }

  showCursor = () => {
    this.setState({ hideCursor: false });
    document.getElementById('suggestions_wrapper').style.cursor = 'auto';
  };

  scrollToActiveIndex = () => {
    if (!this.ref || !this.ref.current) {
      return null;
    }

    this.ref.current.scrollIntoView({
      behaviour: 'smooth',
      block: 'center',
    });
  };

  handleKeyDown = event => {
    if (!ARROW_KEY_EVENT_CODES.includes(event.keyCode)) {
      return null;
    }

    const { activeIndex } = this.state;

    const isArrowUp = event.keyCode === 38;
    const nodes = document.querySelectorAll('.suggestion');

    if (activeIndex === null) {
      this.setState({ activeIndex: 0 });
    }

    // is on first card and arrow up key is pressed
    else if (activeIndex === 0 && isArrowUp) {
      this.setState({ activeIndex: 0 });
    }

    // is on last card and arrow dow key is pressed
    else if (activeIndex === nodes.length - 1 && !isArrowUp) {
      return null;
    } else {
      const next = isArrowUp ? activeIndex - 1 : activeIndex + 1;
      this.setState({ activeIndex: next });
    }

    this.setState({ hideCursor: true, shouldScrollIntoView: true });
    document.getElementById('suggestions_wrapper').style.cursor = 'none';
  };

  render() {
    const { activeIndex, searchTerm } = this.state;
    const { data } = this.props;
    const suggestions = memoizedTransformAndFilterSuggestions(data, searchTerm);

    return (
      <Fragment>
        <Input
          placeholder={this.props.placeholder}
          value={this.state.searchTerm}
          onChange={event => this.setState({ searchTerm: event.target.value })}
          onClear={() => this.setState({ searchTerm: '' })}
          hasClear
        />
        <Suggestions
          searchTerm={searchTerm}
          suggestions={suggestions}
          activeIndex={activeIndex}
          ref={this.ref}
          onMouseOverCallback={index => {
            if (!this.state.hideCursor) {
              this.setState({
                activeIndex: index,
                shouldScrollIntoView: false,
              });
            }
          }}
        />
      </Fragment>
    );
  }
}

Search.defultProps = {
  placeholder: 'Search',
};

Search.propTypes = {
  placeholder: string,
  minLength: number, // Minimum chars to be entered to trigger search. Not used now as it was not in requirement
};

export default Search;
