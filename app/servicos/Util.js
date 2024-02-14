const API_URL = "http://10.0.2.2:8080/";
import axios from 'axios';

const api = axios.create({
    baseURL: API_URL,
  });



let token = null;

export { API_URL, api, token }