import {
  CALENDAR_CHIPMUNK_CLIENT_ID,
  CALENDAR_CHIPMUNK_SCOPE,
  CALENDAR_API_DISCOVERY_DOCS,
  CALENDAR_CHIPMUNK_REDIRECT_URI,
} from "../constants";

const AuthService = {
  gapi: null,
  auth: null,
  user: null,
  tokenRefreshTimer: null,

  init(callback) {
    gapi.load("client", () => {
      gapi.client
        .init({
          clientId: CALENDAR_CHIPMUNK_CLIENT_ID,
          scope: CALENDAR_CHIPMUNK_SCOPE,
          discoveryDocs: [CALENDAR_API_DISCOVERY_DOCS],
        })
        .then(() => {
          AuthService.gapi = gapi;
          AuthService.auth = gapi.auth2.getAuthInstance();
          AuthService.user = AuthService.auth.currentUser.get();
          callback(true);
        });
    });
  },

  isInit() {
    return this.gapi !== null;
  },

  isSignedIn() {
    return this.isInit() && this.auth.isSignedIn.get();
  },

  signInRedirect() {
    if (!this.isSignedIn()) {
      const options = {
        prompt: "select_account",
        ux_mode: "redirect",
        redirect_uri: CALENDAR_CHIPMUNK_REDIRECT_URI,
      };
      return this.auth.signIn(options);
    }
  },

  signOut() {
    clearTimeout(this.tokenRefreshTimer);
    return this.auth.signOut();
  },

  getUser() {
    if (this.isSignedIn()) {
      return {
        name: this.user.getBasicProfile().getName(),
        email: this.user.getBasicProfile().getEmail(),
      };
    }
    return null;
  },

  getToken() {
    return this.gapi.client.getToken().access_token;
  },

  setTokenRefresh() {
    this.tokenRefreshTimer = setTimeout(this.user.reloadAuthResponse(), this.gapi.client.getToken().expires_in);
  },
};

export { AuthService };
