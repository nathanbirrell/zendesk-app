import React from 'react';
// import PropTypes from 'prop-types';
import UserService from '../services/UserService';

import Spinner from './Spinner';

class SearchArticles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      user: null
    }
  }

  componentDidMount() {
    this.fetchUserAsync();
  }

  async fetchUserAsync() {
    const user = await UserService.getCurrentUser();

    this.setState({
      user,
      isLoading: false
    });
  }

  renderLoading() {
    return (
      <Spinner />
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoading();
    }

    return (
      <span>Hello {this.state.user.name}</span>
    );
  }
}

export default SearchArticles;