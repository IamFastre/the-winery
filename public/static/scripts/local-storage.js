/* eslint-disable @typescript-eslint/no-unused-vars */

export class LocalStorage {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    const value = localStorage.getItem(key);

    if (value === null)
      return null;

    try { return JSON.parse(value); }
    catch { return null; }
  }

  static remove(key) {
    if (localStorage.getItem(key) !== null) {
      localStorage.removeItem(key);
      return true;
    }

    return false;
  }
}
