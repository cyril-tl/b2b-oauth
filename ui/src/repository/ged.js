import { instance } from '../api.config'
import { HEADERS, ENDPOINTS, API } from "../constants.js"

export default {
  async getAllDocuments(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.gedListe
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  async downloadDocument(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.gedDocDl
      },
      responseType: 'arraybuffer',
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  }
}