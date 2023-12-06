type Keys = 'password' | 'access_token' | 'refresh_token';
type Arrays = 'unique_refresh_tokens';

const LocalStorage = {
  setVariable: (key: Keys, value: unknown) => {
    if (window?.localStorage) {
      localStorage.setItem(key, String(value));
    }
  },
  getVariable: (key: Keys): string | null => {
    if (window?.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  },
  removeVariable: (key: Keys) => {
    if (window?.localStorage) {
      localStorage.removeItem(key);
    }
  },
  getArray: (key: Arrays) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  },
  setArray: (key: Arrays, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeFromArray: (key: Arrays, valueToRemove: unknown) => {
    const item = localStorage.getItem(key);
    if (item) {
      const array: unknown[] = JSON.parse(item);
      const updatedArray = array.filter((item) => item !== valueToRemove);
      localStorage.setItem(key, JSON.stringify(updatedArray));
    }
  }
};

export default LocalStorage;
