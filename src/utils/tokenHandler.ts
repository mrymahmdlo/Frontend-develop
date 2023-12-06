import { getCookie, setCookie } from 'cookies-next';

export type TokenType = Record<string, { access: string; refresh: string }>;
export type ListOfTokens = TokenType[] | undefined;

export const getAppToken = () => {
  return getCookie('DGB_tokens');
};

export const setAppToken = (tokens: ListOfTokens) => {
  // #TODO handle expiration
  setCookie('DGB_tokens', tokens);
};

export const setCurrentAccountCookie = (email: string) => {
  setCookie('current_account', email);
};

export const getCurrentAccountCookie = () => {
  return getCookie('current_account');
};
