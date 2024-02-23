import axios from "axios";
import { authHeader } from "../_helpers";
import { configConstants } from "../_constants";
import https from "https";

let apiUrl = process.env.REACT_APP_URL;

if (process.env.NODE_ENV === "production") {
  apiUrl = process.env.REACT_APP_URL;
}

let instance = axios.create({
  baseURL: apiUrl,
  headers: authHeader(),
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const apiConfig = instance;
