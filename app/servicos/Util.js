//const API_URL = "http://10.0.2.2:8080/";
const API_URL = "http://ec2-56-124-45-234.sa-east-1.compute.amazonaws.com/";
import axios from 'axios-https-proxy-fix';


const api = axios.create({
    baseURL: API_URL
  });
const apiCEP = axios.create({
    baseURL: "https://viacep.com.br/ws/",
});



let token = null;

export { API_URL, api, apiCEP, token }