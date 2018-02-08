import React from 'react';
import ReactDOM from 'react-dom';
import View from 'view';
import Storage from 'storage';

import SearchArticlesContainer from './containers/SearchArticlesContainer';

class TicketSidebar {
  constructor(data) {
    this._metadata = data.metadata;
    this._context = data.context;

    this.storage = new Storage(this._metadata.installationId);
    this.view = new View({ afterRender: () => {
      // do stuff
    }});

    this.view.switchTo('main');

    ReactDOM.render(
      <SearchArticlesContainer />,
      document.getElementById('app-container')
    );
  }
}

export default TicketSidebar;
