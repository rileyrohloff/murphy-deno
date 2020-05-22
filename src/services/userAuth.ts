import ShortUniqueId from "https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts";

class SessionUser {
  username: string;
  password: string;
  cookies: string;
  Id: string;
  authentication: boolean;
  constructor(username: string | any, password: string | any) {
    this.username = username;
    this.password = password;
    this.cookies = "";
    this.Id = SessionUser.uID(7);
    this.authentication = false;
  }
  static uID = new ShortUniqueId();
  static genCookie(): string {
    return SessionUser.uID(24);
  }

  get getUsername() {
    return this.username;
  }

  get getCookie() {
    return this.cookies;
  }

  set setCookie(cookie: any) {
    this.cookies = cookie;
  }

  get isAuthenticated() {
    return this.authentication;
  }

  set setAuth(authValue: any) {
    this.authentication = authValue;
  }
}

export default SessionUser;
