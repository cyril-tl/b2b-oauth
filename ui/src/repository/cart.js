import { instance } from '../api.config'
import { HEADERS, ENDPOINTS, API } from "../constants.js"

export default {
  async initECart(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.epanier
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  async initLCart(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.lpanier
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },
  
  async readECart(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.epanier
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  async readLCart(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.lpanier
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  async enumECart(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.epanier
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  async validateCart(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.vpanier
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  async updateECart(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.epanier
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  async updateLCart(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.lpanier
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  async deleteLCart(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.lpanier
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  async deleteCart(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.epanier
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },
  
  /**
   * get dates of holidays or closure (delivery is disabled for these dates)
   * @param {*} token 
   * @param {*} body 
   */
  async getDatesFermees(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.datesFermees
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, body, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  /**
   * get extra cost of the order
   * @param {*} token 
   * @param {*} body 
   */
  async getExtracostOrder(token, body) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.spanier
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