import { User } from '../auth0/user';

class UsersCache {
  // A cache of users { uri: User }.
  private db = {};

  /**
   * Add User to cache. If it already exists replace it.
   */
  add(user: User) {
    this.db[user.uri] = user;
  }

  entries(): {} {
    return this.db;
  }
}

export default new UsersCache();
