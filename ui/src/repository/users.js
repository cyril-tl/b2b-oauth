import { instance } from '../api.config'
import { HEADERS, ENDPOINTS, API } from "../constants.js"

const auth = {
  username: API.clientId,
  password: API.clientSecret
}

export default {
  /**
   * 
   * @param {*} createUserData 
   */
  async createAccount(createUserData) {

    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.userAccount, createUserData, { headers: HEADERS.createUser, auth })
      return res;
    } catch (e) {
      return e;
    }
  },

  /**
   * 
   * @param {*} email 
   */
  async forgotPassword(email) {
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.userAccount, email, { headers: HEADERS.forgotPassword, auth })
      return res;
    } catch (e) {
      return e;
    }
  },

  /**
   * 
   * @param {*} email 
   */
  async getUserInfo(email) {
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.userAccount, { "LOGIN": email }, { headers: HEADERS.readUser, auth })
      return res;
    } catch (e) {
      return e;
    }
  },

  /**
   * 
   * @param {*} email 
   * @param {*} infos 
   */
  async updateUserInfos(email, infos) {
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.userAccount, { "LOGIN": email, "FACTURATION": infos.facturation, "LIVRAISON": infos.livraison }, { headers: HEADERS.updateUser, auth })
      return res;
    } catch (e) {
      return e;
    }
  },

  /**
   * 
   * @param {*} token 
   * @param {*} body 
   */
  async getUserCountries(token, body) {
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
  },

  /**
   * 
   * @param {*} token
   */
  async getContacts(token) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.contacts
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, {}, config)
      return res;
    } catch (e) {
      return e;
    }
  },

  /**
   * 
   * @param {*} token
   */
  async getDeliveryAddress(token) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'API': HEADERS.deliveryAddress
      }
    }
    try {
      const res = await instance.post(API.baseUrl + ENDPOINTS.b2b, {}, config)
      return res;
    } catch (e) {
      return e;
    }
  },
}