import React from 'react';
// import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import ArticlesService from '../services/ArticleService';
import TicketService from '../services/TicketService';

import SearchDropdown from '../components/SearchDropdown';

/**
 * NOTE: Of course this isn't a "container" per-se, although
 *  without Redux, it's the closest thing to a connected component
 */
class SearchArticlesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      isLoading: false,
      results: null,
      selectedArticle: null
    }

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleArticleClick = this.handleArticleClick.bind(this);
    this.handlePostArticleAsComment = this.handlePostArticleAsComment.bind(this);
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

    console.log(results);

    this.setState({
      results,
      isLoading: false
    });
  }

  async postCommentAsync(comment) {
    await TicketService.comment(comment);

    this.reset();
  }

  reset() {
    this.setState({
      results: null,
      query: '',
      selectedArticle: null
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

  handleArticleClick(selectedArticle) {
    this.setState({ selectedArticle })
  }

  handlePostArticleAsComment(e) {
    e.preventDefault();
    const comment = `${this.state.selectedArticle.title} - ${this.state.selectedArticle.url}`;
    console.log(comment);
    this.postCommentAsync(comment);
  }

  renderSelectedArticle() {
    if (!this.state.selectedArticle) { return null; }
    const { title, snippet } = this.state.selectedArticle;

    return (
      <div className="search-articles__selected-item c-callout">
        <p className="c-callout__paragraph u-zeta u-semibold">Selected article:</p>
        <p className="c-callout__title">{title}</p>
        <p className="c-callout__paragraph">{snippet}</p>

        <button
          onClick={this.handlePostArticleAsComment}
          className="c-btn c-btn--medium c-btn--pill c-btn--primary u-mt-sm"
        >
          Post As <strong className="u-semibold">Comment</strong>
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
          handleItemClick={this.handleArticleClick}
          results={this.state.results}
          isLoading={this.state.isLoading}
        />

        {this.renderSelectedArticle()}
      </form>
    );
  }
}

export default SearchArticlesContainer;