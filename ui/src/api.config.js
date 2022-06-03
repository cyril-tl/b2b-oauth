import axios from "axios"
import { API } from './constants.js'
export const instance = axios.create({
  baseUrl: API.baseUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  }
});