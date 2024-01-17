import { environment } from "@env/environment";

export const Methods = {
  VERIFY_USER: 'auth/verify-user',
  REGISTER: 'auth/register',
  LOGIN: 'auth/login',
  USERS: 'users/',
  SAVE_USER_APPEARANCE_SETTINGS: 'user-settings/appearance/'
};

(() => {
  for (let key of Object.keys(Methods)) {
    Methods[key] = environment.ApiUrl + Methods[key];
  }
})();
