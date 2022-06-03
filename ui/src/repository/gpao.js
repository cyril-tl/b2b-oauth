import { instance } from '../api.config'
import { HEADERS, ENDPOINTS, API } from "../constants.js"

export default {
  async getEstimerDelai(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.gpaoEstimerDelai
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.gpao, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },
}