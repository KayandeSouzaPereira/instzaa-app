const API_URL = "http://10.0.2.2:3000/";

//const API_URL = "https://instzaa-api-production.up.railway.app/";
import axios from 'axios';

const api = axios.create({
    baseURL: API_URL,
  });
const apiCEP = axios.create({
    baseURL: "https://viacep.com.br/ws/",
});



let token = null;

export { API_URL, api, apiCEP, token }