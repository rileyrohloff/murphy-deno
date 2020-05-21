import ShortUniqueId from "https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts";

class SessionUser {
  username: string;
  password: string;
  cookies: Array<any>;
  constructor(username: string, password: string, cookies: Array<string>) {
    this.username = username;
    this.password = password;
    this.cookies = [...cookies];
  }
  static uID = new ShortUniqueId();
  get genCookie() {
    return SessionUser.uID(24);
  }

  get getUsername() {
    return this.username;
  }
}

export default SessionUser;
