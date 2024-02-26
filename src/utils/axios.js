//creating an instance of axios
import axios from "axios";

import { Base_URL } from "../config";

const InstanceOfAxios = axios.create({ baseURL: Base_URL });
axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Error")
);

export default InstanceOfAxios;