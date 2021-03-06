import client from '../zafClient';
import { API_BASE_URL } from '../config';

export default class ArticlesService {
  /**
   * Retrieves the search results for a given query
   * @returns {Promise}
   */
  static async search(query) {
    try {
      const response = await client.request({ url: `${API_BASE_URL}/help_center/articles/search.json?query=${query}` });
      return response.results;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Retrieves the properties of an article
   * @returns {Promise}
   */
  static async show(id) {
    try {
      const response = await client.request({ url: `${API_BASE_URL}/help_center/articles/${id}.json` });
      console.log(response);
      return response.article;
    } catch (error) {
      console.error(error);
    }
  }
}