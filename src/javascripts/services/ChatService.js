import { client } from '../index';
// import { API_BASE_URL } from '../config';

export default class ChatService {
  /**
   * Posts text to the chat text area
   * @returns {Promise}
   */
  static async comment(comment) {
    try {
      return await client.invoke('chat.postToChatTextArea', comment);
    } catch (error) {
      console.error(error);
    }
  }
}