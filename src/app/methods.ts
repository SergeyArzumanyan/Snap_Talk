import { environment } from "@env/environment";

export const Methods = {
  VERIFY_USER: 'auth/verify-user',
  REGISTER: 'auth/register',
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  USERS: 'users/',
  GET_FILTERED_USERS: 'users/getFilteredUsers',
  GET_ALL_USERS: 'users/getAllUsers',
  USERS_SETTINGS: 'user-settings/',
  SAVE_USER_APPEARANCE_SETTINGS: 'user-settings/appearance/',
  EDIT_USER_PROFILE_IMAGE: '/profileImage',
  CHATS: 'chats/',
  CREATE_GROUP_CHAT: 'chats/createGroupChat',

};

((): void => {
  for (let key of Object.keys(Methods)) {
    Methods[key] = environment.ApiUrl + Methods[key];
  }
})();
