import { instance } from '../api.config'
import { ENDPOINTS, API } from "../constants.js"

const config = {
  auth: {
    username: API.clientId,
    password: API.clientSecret
  },
  headers: {"Access-Control-Allow-Origin": "*"}
}

export default {
  /**
   * 
   * @param {string} username 
   * @param {string} password 
   */
  async login(username, password) {
    let credentials = 'username=' + username + '&password=' + password
    try {
      const res = await instance.get(API.baseUrl + ENDPOINTS.login + credentials, config)
      return res;
    } catch (e) {
      return e;
    }

  }
}