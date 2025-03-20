//const API_URL = "http://10.0.2.2:3000/";

const API_URL = "http://ec2-56-124-45-234.sa-east-1.compute.amazonaws.com:8080/";
import axios from 'axios';

const api = axios.create({
    baseURL: API_URL,
  });
const apiCEP = axios.create({
    baseURL: "https://viacep.com.br/ws/",
});



let token = null;

export { API_URL, api, apiCEP, token }