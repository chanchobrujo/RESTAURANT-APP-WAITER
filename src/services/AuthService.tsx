import axios from "axios";

const base = "https://restaurant-maintenances-admin.herokuapp.com";
const authApi = axios.create({ baseURL: base.concat("/auth") });

export default authApi;
