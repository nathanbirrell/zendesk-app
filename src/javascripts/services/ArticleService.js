import { client } from '../index';
import { API_BASE_URL } from '../config';

export default class ArticlesService {
  /**
   * Retrieves the search results for a given query
   * @returns {Promise}
   */
  static async search(query) {
    try {
      const response = await client.request({ url: `${API_BASE_URL}/search.json?query=${query}` });
      console.log(response);
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
      const response = await client.request({ url: `${API_BASE_URL}/articles/${id}.json` });
      console.log(response);
      return response.article;
    } catch (error) {
      console.error(error);
    }
  }
}