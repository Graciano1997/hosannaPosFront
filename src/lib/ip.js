import { CurrentUser } from "./CurrentUser";

export const Ip='http://localhost:3000/api';
export const printerIp='http://localhost:5000';
export const tenant=`/stores/${CurrentUser.storeId}/`
export const IpTenant = Ip.concat(tenant);
// export const Ip='https://hosanaposbackendapi.onrender.com';