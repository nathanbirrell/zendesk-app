import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

import Label from './Label';

class SearchDropdown extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    }

    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) { return; }
    this.hideDropdown();
  }

  showDropdown() {
    this.setState({ showDropdown: true });
  }

  hideDropdown() {
    this.setState({ showDropdown: false });
  }

  renderResultItems() {
    if (this.props.isLoading) {
      return <li className="c-menu__item">Loading...</li>;
    }
    if (!this.props.results.length) {
      return <li className="c-menu__item">No results :(</li>
    }

    return this.props.results.map((result) => (
      <li
        key={result.id}
        id={result.id}
        className="c-menu__item"
        onClick={() => this.props.handleItemClick(result)}
      >
        {result.title}
      </li>
    ));
  }

  renderResults() {
    if (!this.props.results && !this.props.isLoading) { return null; }

    const classes = Classnames({
      'c-menu': true,
      'c-menu--down': true,
      'is-open': this.state.showDropdown,
      'is-hidden': !this.state.showDropdown
    });

    return (
      <ul className={classes}>
        {this.renderResultItems()}
      </ul>
    );
  }

  render() {
    return (
      <fieldset id={this.props.id} className="u-mb-lg u-position-relative" ref={(nodeRef => { this.node = nodeRef; })}>
        <div className="c-txt">
          <Label htmlFor={this.props.id}>{this.props.label}</Label>
          <input
            className="c-txt__input c-txt__input--select"
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
            onFocus={this.showDropdown}
            onBlur={this.hideDropdown}
            placeholder="Try: 'test' or 'sample'"
          />
        </div>

        {this.renderResults()}
      </fieldset>
    );
  }
}

SearchDropdown.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  results: PropTypes.array,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

SearchDropdown.defaultProps = {
  value: '',
  results: null
};

export default SearchDropdown;