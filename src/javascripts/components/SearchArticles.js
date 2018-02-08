import React from 'react';
// import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import UserService from '../services/UserService';
import ArticlesService from '../services/ArticleService';

import Spinner from './Spinner';
import Label from './Label';

class SearchArticles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      results: []
    }

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.searchAsync = this.searchAsync.bind(this);
  }

  componentWillMount() {
    this.searchAsync = debounce(this.searchAsync, 250);
  }

  async searchAsync(query) {
    const results = await ArticlesService.search(query);

    this.setState({
      results,
      isLoading: false
    });
  }

  handleQueryChange(event) {
    const query = event.target.value;
    this.setState({
      query,
      results: []
    });
    this.searchAsync(query);
  }

  renderResults() {
    return this.state.results.map((result) => (
      <span>{result.subject}</span>
    ));
  }

  renderLoading() {
    if (!this.state.isLoading) { return null; }
    return <Spinner />;
  }

  render() {
    return (
      <form className="search-articles c-txt">
        <div className="u-mb-sm u-position-relative">
          <Label>Search for an article:</Label>

          <input
            className="c-txt__input c-txt__input--select"
            type="text"
            value={this.state.query}
            onChange={this.handleQueryChange}
          />

          <br />

          {this.renderResults()}

          {this.renderLoading()}
        </div>
      </form>
    );
  }
}

export default SearchArticles;