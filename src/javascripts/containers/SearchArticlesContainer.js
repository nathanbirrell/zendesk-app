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
      results: null,
      selectedItem: null
    }

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
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

  handleItemClick(selectedItem) {
    console.log(`clicked item ${selectedItem.subject}`, selectedItem);

    this.setState({ selectedItem })
  }

  renderSelectedItem() {
    if (!this.state.selectedItem) { return null; }
    const { title, snippet } = this.state.selectedItem;

    return (
      <div className="search-articles__selected-item c-callout">
        <p className="c-callout__paragraph u-zeta u-semibold">Selected article:</p>
        <p className="c-callout__title">{title}</p>
        <p className="c-callout__paragraph">{snippet}</p>
        <button class="c-btn c-btn--medium c-btn--pill c-btn--primary u-mt-sm">
          Post As <strong class="u-semibold">Comment</strong>
        </button>
      </div>
    )
  }

  render() {
    return (
      <form className="search-articles c-txt">
        <SearchDropdown
          id="search-articles__dropdown"
          label="Search for a KB article:"
          value={this.state.query}
          onChange={this.handleQueryChange}
          handleItemClick={this.handleItemClick}
          results={this.state.results}
          isLoading={this.state.isLoading}
        />

        {this.renderSelectedItem()}
      </form>
    );
  }
}

export default SearchArticlesContainer;