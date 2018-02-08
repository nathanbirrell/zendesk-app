import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

import Label from './Label';
import Spinner from './Spinner';

class SearchDropdown extends React.PureComponent {
  renderResultItems() {
    return this.props.results.map((result) => (
      <li
        key={result.id}
        id={result.id}
        className="c-menu__item"
        onClick={this.props.handleItemClick}
      >
        {result.subject}
      </li>
    ));
  }

  renderResults() {
    if (!this.props.results.length) { return null; }

    const classes = Classnames({
      'c-menu': true,
      'c-menu--down': true,
      'is-open': true // TODO: hook this up to input active/focus state
    });

    return (
      <ul className={classes}>
        {this.renderResultItems()}
      </ul>
    );
  }

  renderLoader() {
    if (!this.props.isLoading) { return null; }

    return <Spinner />
  }

  render() {
    return (
      <fieldset id={this.props.id} className="u-mb-lg u-position-relative">
        <div className="c-txt">
          <Label htmlFor={this.props.id}>{this.props.label}</Label>
          <input
            className="c-txt__input c-txt__input--select"
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </div>

        {this.renderResults()}
        {this.renderLoader()}
      </fieldset>
    );
  }
}

SearchDropdown.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

SearchDropdown.defaultProps = {
  value: ''
};

export default SearchDropdown;