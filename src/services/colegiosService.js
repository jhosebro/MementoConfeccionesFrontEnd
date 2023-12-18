// services/colegiosService.js
import axios from 'axios';

const baseURL = 'http://localhost:3000';

const getColegios = () => axios.get(`${baseURL}/colegios`);
const createColegio = (nuevoColegio) => axios.post(`${baseURL}/colegios`, nuevoColegio);

export { getColegios, createColegio };
