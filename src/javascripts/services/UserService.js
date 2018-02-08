// import axios from 'axios';

import { client } from '../index';
import { API_BASE_URL } from '../config';

export default class UserService {
  /**
   * Retrieves the current user's details
   * @returns {Promise}
   */
  static async getCurrentUser() {
    const response = await client.request({ url: `${API_BASE_URL}/users/me.json` });
    return response.user;
  }
}