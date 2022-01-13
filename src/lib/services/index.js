const user_key = "user";
const token_key = "token";
const expiresAt_key = "expiresAt";
const expiresIn_key = "expiresIn";

const AuthService = {
  saveLoginData({ user, token, expiresAt, expiresIn }) {
    localStorage.setItem(user_key, JSON.stringify(user));
    localStorage.setItem(token_key, token);
    localStorage.setItem(expiresAt_key, expiresAt);
    expiresIn *= 1000;
    localStorage.setItem(expiresIn_key, expiresIn);
  },

  removeLoginData() {
    localStorage.removeItem(user_key);
    localStorage.removeItem(token_key);
    localStorage.removeItem(expiresAt_key);
    localStorage.removeItem(expiresIn_key);
  },

  getAccessToken() {
    const token = localStorage.getItem(token_key);
    return token;
  },

  getUserData() {
    const user = JSON.parse(localStorage.getItem(user_key));
    return user;
  },

  isSignedIn() {
    return this.getUserData() !== null;
  },
};

export default AuthService;
