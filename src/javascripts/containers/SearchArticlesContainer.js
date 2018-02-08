import React from 'react';
// import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import ArticlesService from '../services/ArticleService';

import SearchDropdown from '../components/SearchDropdown';

/**
 * NOTE: Of course this isn't a "container" per-se, although
 *  without Redux, it's the closest thing to a connected component
 */
class SearchArticlesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      results: null
    }

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.searchAsync = this.searchAsync.bind(this);
  }

  componentWillMount() {
    this.searchAsync = debounce(this.searchAsync, 250);
  }

  /**
   * TODO: move into action & action creators when redux is
   *  implemented, dispatch store updates accordingly
   */
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
      results: null,
      isLoading: true
    });
    this.searchAsync(query);
  }

  render() {
    return (
      <form className="search-articles c-txt">
        <SearchDropdown
          id="search-articles__dropdown"
          label="Search for an article:"
          value={this.state.query}
          onChange={this.handleQueryChange}
          handleItemClick={(item) => {console.log(`clicked item ${item.label}`);}}
          results={this.state.results}
          isLoading={this.state.isLoading}
        />
      </form>
    );
  }
}

export default SearchArticlesContainer;