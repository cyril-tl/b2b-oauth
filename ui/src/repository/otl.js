import { instance } from '../api.config'
import { HEADERS, ENDPOINTS, API } from "../constants.js"

export default {
  async sendEmail(token, body) {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'API': HEADERS.otlEmail
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.otl, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },
}