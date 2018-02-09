import React from 'react';
import ReactDOM from 'react-dom';
import View from 'view';
import Storage from 'storage';

import { client } from './index';

import ChatService from './services/ChatService';
import SearchArticlesContainer from './containers/SearchArticlesContainer';

const IFRAME_HEIGHT = 420;

class ChatSidebar {
  constructor(data) {
    this._metadata = data.metadata;
    this._context = data.context;

    this.storage = new Storage(this._metadata.installationId);
    this.view = new View({ afterRender: () => {
      client.invoke('resize', { width: '100%', height: IFRAME_HEIGHT });
    }});

    this.view.switchTo('main');

    ReactDOM.render(
      <SearchArticlesContainer
        CommentService={ChatService}
      />,
      document.getElementById('app-container')
    );
  }
}

export default ChatSidebar;
