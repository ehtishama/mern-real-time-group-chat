import axios from "axios";
import { BASE_URL } from "../constants/api";

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    
});
