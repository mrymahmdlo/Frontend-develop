import { getCookie, setCookie } from 'cookies-next';

export type TokenType = Record<string, { access: string; refresh: string }>;

export const getAppToken = () => {
  return getCookie('DGB_token');
};

export const setAppToken = (token: TokenType) => {
  // #TODO handle expiration
  setCookie('DGB_token', token);
};

export const setCurrentAccountCookie = (email: string) => {
  setCookie('current_account', email);
};

export const getCurrentAccountCookie = () => {
  return getCookie('current_account');
};
