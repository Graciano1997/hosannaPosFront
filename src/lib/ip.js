import { CurrentUser } from "./CurrentUser";

export const Ip='http://192.168.43.119:3000/api';

export const printerIp='http://localhost:5000';

// export const Ip='https://hosanaposbackendapi.onrender.com';
export function getTenantPath() {
  const user = CurrentUser();
  return user?.storeId ? `/stores/${user.storeId}/` : '';
}

export function getIpTenant() {
  return Ip + getTenantPath();
}
