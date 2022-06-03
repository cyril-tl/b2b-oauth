import { instance } from '../api.config'
import { HEADERS, ENDPOINTS, API } from "../constants.js"

export default {
  async getHomeData(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.divers
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  }
}