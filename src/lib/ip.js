import { CurrentUser } from "./CurrentUser";

export const Ip='https://hosannex.com/salespointback/api';
// export const Ip='http://localhost:3000/api';
export const printerIp='http://localhost:5000';

export function getTenantPath() {
  const user = CurrentUser();
  return user?.companyId ?`/companies/${user.companyId}/` : '';
}

export function getIpTenant() {
  return Ip + getTenantPath();
}

 export const rootpath = "/salespoint";
   