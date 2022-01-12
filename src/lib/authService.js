const user_key = "user";
const token_key = "token";
const expiresAt_key = "expiresAt";
const expiresIn_key = "expiresIn";

const AuthService = {
  isLoggedIn: false,

  saveLoginData({ user, token, expiresAt, expiresIn }) {
    localStorage.setItem(user_key, JSON.stringify(user));
    localStorage.setItem(token_key, token);
    localStorage.setItem(expiresAt_key, expiresAt);
    expiresIn *= 1000;
    localStorage.setItem(expiresIn_key, expiresIn);
    this.isLoggedIn = true;

    setTimeout(this.removeLoginData, expiresIn);
  },

  removeLoginData() {
    localStorage.removeItem(user_key);
    localStorage.removeItem(token_key);
    localStorage.removeItem(expiresAt_key);
    localStorage.removeItem(expiresIn_key);
    this.isLoggedIn = false;
  },

  getAccessToken() {
    if (this.isLoggedIn) {
      const token = localStorage.getItem(token_key);
      return token;
    }
    return null;
  },

  getUserData() {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem(user_key));
      return user;
    }
    return null;
  },
};

export default AuthService;
