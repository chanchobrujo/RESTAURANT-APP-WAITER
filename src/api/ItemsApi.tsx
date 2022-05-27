import axios from "axios";

import { SERVICE_ITEMS } from "../../environment/environment.prod";

const itemsApi = axios.create({ baseURL: SERVICE_ITEMS });

export default itemsApi;
