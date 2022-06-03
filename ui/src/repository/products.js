import { instance } from '../api.config'
import { HEADERS, ENDPOINTS, API } from "../constants.js"

export default {
  async getAllProducts(token) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.b2b
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, {}, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  async downloadProductsList(token, body) {
  // console.log('body: ' + body)
    //const data = body;
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.b2b
      },
      //data:data
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  async getAllFiles(token) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.ficDocListe
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, {}, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  // async searchProducts(token, body) {
  //   const config = {
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //       'API': HEADERS.searchProduct
  //     }
  //   }
  //   try {
  //     const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
  //     return res;
  //   } catch (e) {
  //     return e;
  //   }
  // },

  async downloadFile(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.ficDocDl
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