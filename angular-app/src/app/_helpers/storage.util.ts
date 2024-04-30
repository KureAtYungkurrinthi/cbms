export class StorageUtil {
  static setItem(key, data) {
    const now = new Date().getTime();
    const expiryTime = 30 * 60 * 1000; // 30 minutes in milliseconds

    const item = {
      value: data,
      expiry: now + expiryTime,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static getItem(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }
}
