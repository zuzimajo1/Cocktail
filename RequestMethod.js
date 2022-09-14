
import axios from "axios";

const BASE_URL = 'https://cocktailapp-backend.herokuapp.com/api/'


export const PublicRequest = axios.create({
  baseURL: BASE_URL,
})