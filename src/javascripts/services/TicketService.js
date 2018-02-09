import client from '../zafClient';
// import { API_BASE_URL } from '../config';

export default class TicketService {
  /**
   * Posts a comment to the _current_ ticket
   * @returns {Promise}
   */
  static async comment(comment) {
    try {
      return await client.invoke('ticket.comment.appendText', comment);
    } catch (error) {
      console.error(error);
    }
  }
}