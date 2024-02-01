import { environment } from "@env/environment";

export const Methods = {
  VERIFY_USER: 'auth/verify-user',
  REGISTER: 'auth/register',
  LOGIN: 'auth/login',
  USERS: 'users/',
  GET_FILTERED_USERS: 'users/getFilteredUsers',
  USERS_SETTINGS: 'user-settings/',
  SAVE_USER_APPEARANCE_SETTINGS: 'user-settings/appearance/',
  EDIT_USER_PROFILE_IMAGE: '/profileImage',
  CHATS: 'chats/',

};

((): void => {
  for (let key of Object.keys(Methods)) {
    Methods[key] = environment.ApiUrl + Methods[key];
  }
})();
