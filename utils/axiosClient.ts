/* eslint-disable prettier/prettier */
import axios from 'axios';

export const baseURL = 'https://user-management-api-egtl.onrender.com/api/v1';

const BackendAPI = axios.create({ baseURL });

export default BackendAPI;
