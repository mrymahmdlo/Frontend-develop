import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export type TokenType = Record<string, { access: string; refresh: string }>;

export const getAppToken = () => {
  return getCookie('DGB_token');
};

export const setAppToken = (token: TokenType) => {
  setCookie('DGB_token', token);
};

export const removeAppToken = () => {
  deleteCookie('DGB_token');
};

export const setCurrentAccountCookie = (email: string) => {
  setCookie('current_account', email);
};

export const getCurrentAccountCookie = () => {
  return getCookie('current_account');
};

export const removeCurrentAccountCookie = () => {
  return deleteCookie('current_account');
};
