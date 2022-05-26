import axios from "axios";

const base = "";
const itemsApi = axios.create({ baseURL: base });

export default itemsApi;
