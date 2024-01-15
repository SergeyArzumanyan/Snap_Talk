import { environment } from "@env/environment";

export const Methods = {
  VERIFY_USER: environment.ApiUrl + 'auth/verify-user',
  REGISTER: environment.ApiUrl + 'auth/register',
  LOGIN: environment.ApiUrl + 'auth/login',
  USERS: environment.ApiUrl + 'users/',
}
