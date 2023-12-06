import {
  TokenType,
  getAppToken,
  getCurrentAccountCookie
} from './tokenHandler';

type ApiMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type IntError = {
  type: string;
  errors: {
    attr: string;
    code: string;
    detail: string;
  };
};

export type IntErrors = {
  type: string;
  errors: {
    attr: string;
    code: string;
    detail: string;
  }[];
};

const isCypressMode = process.env.NEXT_PUBLIC_CYPRESS_MODE === 'true';

export default async function apiHandler(
  uri: string,
  method: ApiMethodType = 'GET',
  body?: unknown,
  authRequired?: boolean
) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  if (authRequired && !isCypressMode) {
    // Get list of tokens
    const tokens = getAppToken() as string;

    if (tokens) {
      // Get current account email
      const currentAccount = getCurrentAccountCookie() as string;

      // Get user current account token
      const currentToken = JSON.parse(tokens).filter((item: TokenType) => {
        if (item[currentAccount]) return item;
      });

      if (currentToken[0]) {
        // Get access token
        const accessToken = currentToken[0][currentAccount].access;

        if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
        else throw 'An error occured when fetch access token';
      } else {
        throw 'An error occured when fetch token';
      }
    }
  }

  const fetchOptions: RequestInit = {
    method,
    headers
  };

  // If method not get then add body option
  if (method !== 'GET') {
    if (body) fetchOptions.body = JSON.stringify(body);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}${uri}`,
    fetchOptions
  );

  if (res.status < 400) {
    try {
      const text = await res.text();
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      return true;
    }
  }
  const error = await res.json();
  throw error;
}
